import { DataTableFiltersSheet } from "~/views/modals/sheets/data-table-filters-sheet";

export const modalTypes = {
  dataTableFilters: "dataTableFilters",
} as const;

export type ModalType = keyof typeof modalTypes;

export const modalsComponents = {
  [modalTypes.dataTableFilters]: DataTableFiltersSheet,
} as const;

export type ModalProps<T extends ModalType = ModalType> = {
  type: T;
  props: Parameters<(typeof modalsComponents)[T]>[0];
};
