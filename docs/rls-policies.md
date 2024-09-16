# Row level security policies

## Note on Row Level Security (RLS) Policies

I'm sharing the Row Level Security (RLS) policies for this project to provide full transparency and to help anyone interested in learning more about how RLS works in Supabase. This chat project was created just for fun, and it's not intended to be used as a main communication platform, so security isn’t a primary concern here. In a production setting, it's generally recommended to keep RLS policies private, as they can expose sensitive details about your data access controls. However, for this project, I'm comfortable sharing them for educational purposes.

### `friendships`

DELETE:

```sql
alter policy "Enable delete for users based on user_id"
on "public"."friendships"
to public
using (
  ((auth.uid() = user_id_1) OR (auth.uid() = user_id_2))
);
```

UPDATE:

```sql
alter policy "Enable edit for users based on user_id"
on "public"."friendships"
to public
using (
  ((auth.uid() = user_id_1) OR (auth.uid() = user_id_2))
);
with check (
  true
);
```

INSERT:

```sql
alter policy "Enable insert for authenticated users only"
on "public"."friendships"
to authenticated
with check (
  true
);
```

SELECT:

```sql
alter policy "Enable select for users based on user_id"
on "public"."friendships"
to authenticated
using (
  ((auth.uid() = user_id_1) OR (auth.uid() = user_id_2))
);
```

### `messages`

DELETE:

```sql
alter policy "delete_own_messages_policy"
on "public"."messages"
to public
using (
  (user_id = auth.uid())
);
```

INSERT:

```sql
alter policy "Enable read access for all users"
on "public"."messages"
to public
with check (
  false
);
```

INSERT:

```sql
alter policy "insert_messages_policy"
on "public"."messages"
to public
with check (
  (EXISTS ( SELECT 1
   FROM participants
  WHERE ((participants.user_id = auth.uid()) AND (participants.room_id = messages.room_id))))
);
```

SELECT:

```sql
alter policy "select_messages_policy"
on "public"."messages"
to public
using (
  ((EXISTS ( SELECT 1
  FROM participants
  WHERE ((participants.user_id = auth.uid()) AND (participants.room_id = messages.room_id)))) OR (EXISTS ( SELECT 1
  FROM rooms
  WHERE ((rooms.id = messages.room_id) AND (rooms.is_private = false)))))
);
```

```sql
alter policy "select_public_messages_policy"
on "public"."messages"
to public
using (
  (EXISTS ( SELECT 1
  FROM rooms
  WHERE ((rooms.id = messages.room_id) AND (rooms.is_private = false))))
);
```

UPDATE:

```sql
alter policy "update_own_messages_policy"
on "public"."messages"
to public
using (
  (user_id = auth.uid())
);
```

### `participants`

ALL:

```sql
alter policy "Enable all for users based on user_id"
on "public"."participants"
to public
using (
  (auth.uid() = user_id)
);
with check (
  (auth.uid() = user_id)
);
```

SELECT:

```sql
alter policy "Enable read access for all users"
on "public"."participants"
to public
with check (
  true
);
```

INSERT:

```sql
alter policy "Enable insert for authenticated users only"
on "public"."participants"
to authenticated
using (
  true
);
```

### `rooms`

ALL:

```sql
alter policy "Enable all for users based on created_by"
on "public"."rooms"
to public
using (
  (auth.uid() = created_by)
);
with check (
  (auth.uid() = created_by)
);
```

DELETE:

```sql
alter policy "Enable delete for users based on user_id"
on "public"."rooms"
to public
using (
  (auth.uid() = created_by)
);
```

```sql
alter policy "Enable delete if its a dm"
on "public"."rooms"
to public
using (
  (is_dm = true)
);
```

INSERT:

```sql
alter policy "Enable insert for authenticated users only"
on "public"."rooms"
to authenticated
with check (
  true
);
```

SELECT:

```sql
alter policy "Enable read access for all users"
on "public"."rooms"
to public
using (
  true
);
```

### `users`

ALL:

```sql
alter policy "Enable all for users based on user_id"
on "public"."users"
to public
using (
  (auth.uid() = id)
);
with check (
  (auth.uid() = id)
);

```

SELECT:

```sql
alter policy "Enable read access for all authenticated users"
on "public"."users"
to authenticated
using (
  true
);
```

### `room_passwords`

The rooms_passwords table has Row Level Security (RLS) disabled because it is only accessible through the backend using Supabase's backend-only key. Since this table contains sensitive information, passwords are hashed before being stored. The backend provides secure endpoints for hashing, decrypting, and granting users access to this data, ensuring that access is tightly controlled and only handled server-side.
