# PostgreSQL Functions

In this project, several kinds of complicated queries were not achievable with just the Supabase client library. To achieve the desired result, I resorted to custom PostgreSQL functions. These functions are not visible in the code, as they are called, perform their operations, and return the data. Below are some of these functions and their descriptions:

### `get_message_count`

This function retrieves the count of unread messages a user has in each room. 

##### How does it work?

To determine how many unread messages a user has, we first need to identify the last message they read. This information can be easily stored. 

In the `participants` table, each record represents a user in a room. I added a column named `last_message_read`, which gets updated every time a new message is received or sent while the user is in the room. Knowing the last message read, we can execute an SQL query like the one below, which returns the `room_id` and the `message_count` (naming it `unread_messages_count` would have been more descriptive).

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

`is_user_participant_in_room`

This function returns a boolean is_participant, indicating if a user is a participant in a certain room.

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

Some database triggers were also necessary as I don't have a 'real' backend that I can fully customize.

### `create_dm_room`

This is a `AFTER INSERT` && `AFTER UPDATE` trigger.

This trigger creates a private room for a DM (direct message) between two users as soon as they become friends.

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