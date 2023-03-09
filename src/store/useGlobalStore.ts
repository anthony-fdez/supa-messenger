import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUser {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  uid: string | null;
}

interface IPreferences {
  theme: string;
}

interface IApp {
  mainActiveSideMenu: string | null;
  secondaryActiveSideMenu: string | null;
}

interface IGlobalStateValues {
  app: IApp;
  preferences: IPreferences;
  user: IUser;
}

interface IGlobalState extends IGlobalStateValues {
  clearState: () => void;
  setApp: (state: Partial<IApp>) => void;
  setPreferences: (state: Partial<IPreferences>) => void;
  setState: (state: Partial<IGlobalStateValues>) => void;
  setUser: (state: Partial<IUser>) => void;
}

const initialState: IGlobalStateValues = {
  user: {
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    uid: null,
  },
  app: {
    mainActiveSideMenu: "Messages",
    secondaryActiveSideMenu: null,
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
