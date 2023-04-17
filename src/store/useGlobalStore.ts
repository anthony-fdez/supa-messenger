import { RealtimePresenceState, SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Database } from "../../types/database.types";

export type IDatabaseRoom = Database["public"]["Tables"]["rooms"]["Row"];
type IDatabaseParticipantsWithoutUsers =
  Database["public"]["Tables"]["participants"]["Row"];
type IDatabaseMessagesWithoutUsers =
  Database["public"]["Tables"]["messages"]["Row"];
type IDatabaseUser = Database["public"]["Tables"]["users"]["Row"];

interface IUser {
  email: string | null;
  imageUrl: string | null;
  name: string | null;
  registerComplete: boolean | null;
  uid: string | null;
}

interface IPreferences {
  theme: string;
}

export interface IDatabaseParticipants
  extends IDatabaseParticipantsWithoutUsers {
  userData: IDatabaseUser | IDatabaseUser[] | null;
}

export interface IDatabaseMessages extends IDatabaseMessagesWithoutUsers {
  userData: IDatabaseUser | IDatabaseUser[] | null;
}

export interface IRoom extends IDatabaseRoom {
  participants: IDatabaseParticipants[];
}

interface IApp {
  isLoading: boolean;
  isMobileMenuOpen: boolean;
  mainActiveSideMenu: string | null;
  onlineUsers: RealtimePresenceState | null;
  registerUserActiveStep: number;
  secondaryActiveSideMenu: string | null;
}

export interface IUsersTyping {
  email: string;
  isTyping: boolean;
  name: string;
  uid: string;
}

export interface ICurrentRoom {
  isLoading: boolean;
  isRoomMember: boolean;
  messages: IDatabaseMessages[] | null;
  roomData: Database["public"]["Tables"]["rooms"]["Row"] | null;
  roomNotFound: boolean;
  roomParticipants: IDatabaseParticipants[] | null;
  usersTyping: IUsersTyping[];
}

interface IGlobalStateValues {
  app: IApp;
  currentRoom: ICurrentRoom;
  preferences: IPreferences;
  replyMessage: string;
  rooms: IRoom[];
  user: IUser;
}

interface IGlobalState extends IGlobalStateValues {
  addNewCurrentRoomMessage: ({
    newMessage,
    supabase,
  }: {
    newMessage: IDatabaseMessages;
    supabase: SupabaseClient<Database>;
  }) => void;
  clearState: () => void;
  setApp: (state: Partial<IApp>) => void;
  setCurrentRoom: (state: Partial<ICurrentRoom>) => void;
  setPreferences: (state: Partial<IPreferences>) => void;
  setReplyMessage: (state: string) => void;
  setRooms: (state: IRoom[]) => void;
  setState: (state: Partial<IGlobalStateValues>) => void;
  setUser: (state: Partial<IUser>) => void;
}

const initialState: IGlobalStateValues = {
  rooms: [],
  user: {
    email: null,
    name: null,
    uid: null,
    imageUrl: null,
    registerComplete: false,
  },
  currentRoom: {
    isLoading: false,
    isRoomMember: false,
    roomData: null,
    roomNotFound: false,
    roomParticipants: null,
    messages: null,
    usersTyping: [],
  },
  app: {
    isMobileMenuOpen: false,
    onlineUsers: null,
    isLoading: false,
    mainActiveSideMenu: "Messages",
    secondaryActiveSideMenu: null,
    registerUserActiveStep: 0,
  },
  preferences: {
    theme: "system",
  },
};

const useGlobalStore = create<IGlobalState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        addNewCurrentRoomMessage: async ({
          newMessage,
          supabase,
        }): Promise<void> => {
          const formattedMessage = newMessage;

          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", newMessage.user_id)
            .single();

          if (!user || error) {
            formattedMessage.userData = null;
          } else {
            formattedMessage.userData = user;
          }

          const newCurrentRoom = get().currentRoom;
          if (newCurrentRoom.roomData?.id === newMessage.room_id) {
            newCurrentRoom.messages?.push(formattedMessage);

            set((state) => ({
              currentRoom: {
                ...state.currentRoom,
                ...newCurrentRoom,
              },
            }));
          }
        },
        setPreferences: (newPreferences): void => {
          set((state) => ({
            preferences: {
              ...state.preferences,
              ...newPreferences,
            },
          }));
        },
        setRooms: (newRooms): void => {
          set(() => ({
            rooms: newRooms,
          }));
        },
        setReplyMessage: (newMessage): void => {
          set(() => ({
            replyMessage: newMessage,
          }));
        },
        setCurrentRoom: (newCurrentRoom): void => {
          set((state) => ({
            currentRoom: {
              ...state.currentRoom,
              ...newCurrentRoom,
            },
          }));
        },
        setApp: (newApp): void => {
          set((state) => ({
            app: {
              ...state.app,
              ...newApp,
            },
          }));
        },
        setUser: (newUser): void => {
          set((state) => ({
            user: {
              ...state.user,
              ...newUser,
            },
          }));
        },
        setState: (newState): void => {
          set((state) => ({ ...state, ...newState }));
        },
        clearState: (): void => {
          set({ ...initialState });
        },
      }),
      {
        name: "global-store",
      },
    ),
  ),
);

export default useGlobalStore;
