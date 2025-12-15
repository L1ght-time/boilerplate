"use client";

import { nanoid } from "nanoid";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { ModalProps } from "~/lib/constants/modals";
import { DistributiveOmit } from "~/lib/types";

type Modal = ModalProps & {
  id: string;
};

type ModalCreateProps = Omit<ModalProps, "props"> & {
  props: DistributiveOmit<ModalProps["props"], "id">;
};

type ModalsState = {
  modals: {
    [id: string]: Modal;
  };
};

type ModalsActions = {
  showModal: (modalProps: ModalCreateProps) => Modal;
  hideModalById: (id: string) => void;
};

type ModalsStore = ModalsState & ModalsActions;

const initialState: ModalsState = {
  modals: {},
};

const createModalsStore = (initState: ModalsState = initialState) =>
  createStore<ModalsStore>()((set) => ({
    ...initState,
    showModal: ({ type, props }) => {
      const id = nanoid();
      const newModal = { id, type, props } as Modal;
      set((state) => ({
        modals: { ...state.modals, [id]: newModal },
      })); 
      return newModal;
    },
    hideModalById: (id) =>
      set((state) => {
        const modals = { ...state.modals };
        delete modals[id];
        return { modals };
      }),
  }));

type ModalsStoreAPI = ReturnType<typeof createModalsStore>;

export const ModalsStoreContext = createContext<ModalsStoreAPI | undefined>(
  undefined
);

export type ModalsStoreProviderProps = {
  children: ReactNode;
};

export const ModalsStoreProvider = ({ children }: ModalsStoreProviderProps) => {
  const storeRef = useRef<ModalsStoreAPI>(undefined);
  if (!storeRef.current) {
    storeRef.current = createModalsStore();
  }
  return (
    <ModalsStoreContext.Provider value={storeRef.current}>
      {children}
    </ModalsStoreContext.Provider>
  );
};

export const useModalsStore = <T,>(selector: (store: ModalsStore) => T) => {
  const store = useContext(ModalsStoreContext);
  if (!store) {
    throw new Error("useModalsStore must be used within a ModalsStoreProvider");
  }
  return useStore(store, selector);
};
