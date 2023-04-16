const shared = {
  avatarPlaceholder: (seed: string | number) => {
    return `https://api.dicebear.com/6.x/micah/svg?seed=${seed}`;
  },
};

const devConstants = {
  serverURL: "http://localhost:5001",
};

const prodConstants = {
  serverURL: "https://supabase-chat.onrender.com",
};

const constants =
  process.env.NODE_ENV === "prod" ? prodConstants : devConstants;

export default { ...shared, ...constants };
