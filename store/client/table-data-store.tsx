"use client";

import { ReactNode, createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

type TableDataState = {
  columns: string[];
};

type TableDataActions = {
  setAllColumns: (columns: string[]) => void;
};

type TableDataStore = TableDataState & TableDataActions;

export const initialState: TableDataState = {
  columns: [],
};

export const createTableDataStore = (
  initState: TableDataState = initialState
) => {
  return createStore<TableDataStore>()((set) => ({
    ...initState,
    setAllColumns: (columns) => {
      set(() => ({
        columns: columns,
      }));
    },
  }));
};

type TableDataStoreAPI = ReturnType<typeof createTableDataStore>;

export const TableDataStoreContext = createContext<
  TableDataStoreAPI | undefined
>(undefined);

export type TableDataProviderProps = {
  children: ReactNode;
};

export const TableDataProvider = ({ children }: TableDataProviderProps) => {
  const storeRef = useRef<TableDataStoreAPI>(undefined);
  if (!storeRef.current) {
    storeRef.current = createTableDataStore();
  }
  return (
    <TableDataStoreContext.Provider value={storeRef.current}>
      {children}
    </TableDataStoreContext.Provider>
  );
};

export const useTableDataStore = <T,>(
  selector: (store: TableDataStore) => T
) => {
  const store = useContext(TableDataStoreContext);
  if (!store) {
    throw new Error(
      "useTableDataStore must be used within a TableDataStoreProvider"
    );
  }
  return useStore(store, selector);
};
