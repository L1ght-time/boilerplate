import { createStore } from "zustand/vanilla";

export type ModalsState = Record<string, React.ReactNode>;

export type ModalsActions = {
  openModal: (modalType: string, content: React.ReactNode) => void;
  closeModal: (modalType: string) => void;
};

export type ModalsStore = ModalsState & ModalsActions;

const initialState: ModalsState = {};

export const createCounterStore = (initState: ModalsState = initialState) => {
  return createStore<ModalsStore>()(
    (set) =>
      ({
        ...initState,
        openModal: (modalType: string, content: React.ReactNode) => {
          set((state) => ({ ...state, [modalType]: content }));
        },
        closeModal: (modalType: string) => {
          set((state) => {
            const rest = { ...state };
            delete rest[modalType];
            return rest;
          });
        },
      } as ModalsStore)
  );
};
