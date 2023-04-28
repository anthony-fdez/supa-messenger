export const isProd = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return false;
  }

  return true;
};

const shared = {
  avatarPlaceholder: (seed: string | number) => {
    return `https://api.dicebear.com/6.x/micah/svg?seed=${seed}`;
  },
  supabaseUrl: "https://jnpimfbtbogiuqydflkh.supabase.co",
  // This is a public key, DON'T FREAK OUT, its all good
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucGltZmJ0Ym9naXVxeWRmbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzMDcwNzYsImV4cCI6MTk5Mzg4MzA3Nn0.1KPiCOFnYb4IDjW5XKG-_Nz2JGhe1lW129cOtxUvGf8",
};

const devConstants = {
  serverURL: "http://localhost:5001",
};

const prodConstants = {
  serverURL: "https://supabase-chat.onrender.com",
};

const constants = isProd() ? prodConstants : devConstants;

export default { ...shared, ...constants };
