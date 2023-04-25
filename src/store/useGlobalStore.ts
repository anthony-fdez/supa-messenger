import { RealtimePresenceState, SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Database } from "../../types/database.types";

export type IDatabaseRoom = Database["public"]["Tables"]["rooms"]["Row"];
type IDatabaseParticipantsWithoutUsers =
  Database["public"]["Tables"]["participants"]["Row"];
type IDatabaseMessagesWithoutUsers =
  Database["public"]["Tables"]["messages"]["Row"];
export type IDatabaseUser = Database["public"]["Tables"]["users"]["Row"];
type IDatabaseFriends = Database["public"]["Tables"]["friendships"]["Row"];

export interface IUser {
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
  friendships: IFriend[];
  participants: IDatabaseParticipants[];
}

interface IApp {
  isFriendsMenuOpen: boolean;
  isLoading: boolean;
  isLoadingRooms: boolean;
  isMobileMenuOpen: boolean;
  isTldrMenuOpen: boolean;
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

export interface IFriend extends IDatabaseFriends {
  actionUserData: IDatabaseUser | IDatabaseUser[] | null;
  userData1: IDatabaseUser | IDatabaseUser[] | null;
  userData2: IDatabaseUser | IDatabaseUser[] | null;
}

export interface ICurrentRoom {
  isLoading: boolean;
  isRoomMember: boolean;
  messages: IDatabaseMessages[] | null;
  myMessage: string;
  roomData: Database["public"]["Tables"]["rooms"]["Row"] | null;
  roomNotFound: boolean;
  roomParticipants: IDatabaseParticipants[] | null;
  usersTyping: IUsersTyping[];
}

interface IFriendships {
  friends: IFriend[];
  pending: IFriend[];
  requests: IFriend[];
}

interface IUnreadMessages {
  message_count: number;
  room_id: string;
}

interface IGlobalStateValues {
  app: IApp;
  currentRoom: ICurrentRoom;
  dms: IRoom[];
  friendships: IFriendships;
  preferences: IPreferences;
  rooms: IRoom[];
  unreadMessages: IUnreadMessages[];
  user: IUser;
}

export interface IGlobalState extends IGlobalStateValues {
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
  setDms: (state: IRoom[]) => void;
  setFriendships: (state: Partial<IFriendships>) => void;
  setPreferences: (state: Partial<IPreferences>) => void;
  setRooms: (state: IRoom[]) => void;
  setState: (state: Partial<IGlobalStateValues>) => void;
  setUnreadMessages: (state: IUnreadMessages[]) => void;
  setUser: (state: Partial<IUser>) => void;
}

const initialState: IGlobalStateValues = {
  rooms: [],
  unreadMessages: [],
  dms: [],
  friendships: {
    friends: [],
    requests: [],
    pending: [],
  },
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
    myMessage: "",
    roomData: null,
    roomNotFound: false,
    roomParticipants: null,
    messages: null,
    usersTyping: [],
  },
  app: {
    isFriendsMenuOpen: false,
    isTldrMenuOpen: false,
    isMobileMenuOpen: false,
    onlineUsers: null,
    isLoadingRooms: false,
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
        setFriendships: (newFriendships): void => {
          set((state) => ({
            friendships: {
              ...state.friendships,
              ...newFriendships,
            },
          }));
        },
        setRooms: (newRooms): void => {
          set(() => ({
            rooms: newRooms,
          }));
        },
        setUnreadMessages: (newUnreadMessages): void => {
          set(() => ({
            unreadMessages: newUnreadMessages,
          }));
        },
        setDms: (newRooms): void => {
          set(() => ({
            dms: newRooms,
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
