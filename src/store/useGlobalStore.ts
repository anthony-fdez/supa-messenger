import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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

interface IApp {
  isLoading: boolean;
  mainActiveSideMenu: string | null;
  registerUserActiveStep: number;
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
    name: null,
    uid: null,
    imageUrl: null,
    registerComplete: false,
  },
  app: {
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
