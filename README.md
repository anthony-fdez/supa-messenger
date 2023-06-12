# Supa Messenger

Live demo: [https://supamessenger.com](https://supamessenger.com)

Supa Messenger is a real-time messaging application that provides a robust
platform for users to interact, connect, and share. The application
supports a variety of features including direct messages, group chats,
and the creation of friendships, making it a versatile tool for online communication
(although it won't replace any other communication tool, this is just a hobbie project, made for fun)

Built primarily with ReactJS, the application
combines the cutting-edge technology of Supabase as its backend. Supabase
adds capabilities like real-time subscriptions and user authentication to
the app, making it highly functional and secure.

To run Supa Messenger locally, you'll need Node.js installed on your machine.
Simply clone the repository, navigate to the project directory, and run the following commands:

```bash
npm i
npm run dev
```

## Technologies Used

### Front End / App:

- ReactJS
- Typescript
- Zustand
- React Router
- Vite
- Mantine UI

### Back End:

The backend of this app was built with a combination of
Supabase, and a custom NodeJS server. Supabase was used for basically every CRUD
oparation, using its ORM like api on the front end. A custom server was necesary to
handle things that needed full control, and security, like generationg a hashed passwrod
for private rooms.

## Source Code

- [https://github.com/anthony-fdez/supa-messenger](https://github.com/anthony-fdez/supa-messenger)

This project is open for contributions and encourages participation from other developers who are interested in real-time applications, ReactJS, Supabase, or TypeScript.
