import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUser {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

interface IGlobalStateValues {
  uid: string | null;
  user: IUser | null;
}

interface IGlobalState extends IGlobalStateValues {
  clearState: () => void;
  setState: (state: Partial<IGlobalStateValues>) => void;
}

const initialState: IGlobalStateValues = {
  uid: null,
  user: null,
};

const useGlobalStore = create<IGlobalState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
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
