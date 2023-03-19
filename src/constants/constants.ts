const devConstants = {
  serverURL: "https://supabase-chat.onrender.com",
};

const prodConstants = {
  serverURL: "https://supabase-chat.onrender.com",
};

const constants =
  process.env.NODE_ENV === "prod" ? prodConstants : devConstants;

export default constants;
