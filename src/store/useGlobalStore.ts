import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Database } from "./../types/database.types";

export type IDatabaseRoom = Database["public"]["Tables"]["rooms"]["Row"];
type IDatabaseParticipantsWithoutUsers =
  Database["public"]["Tables"]["participants"]["Row"];
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

interface IDatabaseParticipants extends IDatabaseParticipantsWithoutUsers {
  users: IDatabaseUser | IDatabaseUser[] | null;
}

export interface IRoom extends IDatabaseRoom {
  participants: IDatabaseParticipants[];
}

interface IApp {
  isLoading: boolean;
  isMobileMenuOpen: boolean;
  mainActiveSideMenu: string | null;
  registerUserActiveStep: number;
  secondaryActiveSideMenu: string | null;
}

interface IGlobalStateValues {
  app: IApp;
  preferences: IPreferences;
  rooms: IRoom[];
  user: IUser;
}

interface IGlobalState extends IGlobalStateValues {
  clearState: () => void;
  setApp: (state: Partial<IApp>) => void;
  setPreferences: (state: Partial<IPreferences>) => void;
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
  app: {
    isMobileMenuOpen: false,
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
      (set) => ({
        ...initialState,
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
