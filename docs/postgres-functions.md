# PostgreSQL Functions

In this project there are several kind of complicated queries that were not possible with just the Supabase client library. To achieve the result I wanted, I resorted to custom postgreSQL fucntions. This functions are not something you can see in the code, as they just get called, do their thing and return the data. Below are some of these functions and what they do:

### `get_message_count`

This function is to get the unread messages the user has on each room. 

##### How does it work?

To be able to how many unread messages a user has, we first need to know what was the last message they read, thats something that can be easily stored. 

On the participants table, each record represents a user that belongs to a room. I added a column: `last_message_read`, this field gets updated every time a new messages is recieved or sent while the user is currently in the room. Knowing what was the last message read, we can run something like this SQL query that will return the `room_id` and the `message_count` (`unread_messages_count` would've been a better name, oh well)

```sql
DECLARE
  result_record RECORD;
BEGIN
  FOR result_record IN
    SELECT p.room_id, COALESCE(COUNT(m.id), 0) as message_count
    FROM participants p
    LEFT JOIN messages m ON p.room_id = m.room_id AND m.id > p.last_message_read
    WHERE p.user_id = p_user_id
    GROUP BY p.room_id
  LOOP
    room_id := result_record.room_id;
    message_count := result_record.message_count;
    RETURN NEXT;
  END LOOP;
  RETURN;
END; 
```


### `is_user_participant_in_room`

This function will return a boolean `is_participant`, if a user is a participant of a certain room.

```sql
DECLARE
  is_participant BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM participants
    WHERE participants.user_id = p_user_id AND participants.room_id = p_room_id
  ) INTO is_participant;

  RETURN is_participant;
END;

```

## Database triggers:

Some database triggeres were also necesary since I don't have a 'real' backend I can fully customize.

### `create_dm_room`

This is a `AFTER INSERT` && `AFTER UPDATE` trigger.

This trigger will create a private room for a DM (direct message) room between two users as soon as they become friends.

```sql

DECLARE
  new_room_id uuid;
BEGIN
  IF NEW.status = 'FRIENDS' and NEW.room_id IS NULL THEN
    INSERT INTO rooms (created_by, name, is_private, is_dm)
    VALUES (null, 'Direct Message', true, true)
    RETURNING id INTO new_room_id;

    UPDATE friendships
    SET room_id = new_room_id
    WHERE id = NEW.id;

    INSERT INTO participants (user_id, room_id)
    VALUES (NEW.user_id_1, new_room_id);

    INSERT INTO participants (user_id, room_id)
    VALUES (NEW.user_id_2, new_room_id);
  END if;

  RETURN NEW;
END;
```

### `delete_room_and_participants_on_friendship_delete`

This is a `AFTER DELETE` trigger.

In the app, either of the users in a friendship can end such friendship. Whenever either of them ends the friendship, their private conversation and all the messages in it will be deleted with a pretty simple query.

```sql
BEGIN
  DELETE FROM rooms
  WHERE id = OLD.room_id;

  RETURN OLD;
END;
```