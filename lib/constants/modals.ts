import { DataTableFiltersSheet } from "~/views/modals/sheets/data-table-filters-sheet";

export const modalTypes = {
  dataTableFiltersSheet: "dataTableFiltersSheet",
  test: "test",
} as const;

export type ModalType = keyof typeof modalTypes;

export const modalsComponents = {
  [modalTypes.dataTableFiltersSheet]: DataTableFiltersSheet,
  [modalTypes.test]: DataTableFiltersSheet,
} as const;

export type ModalProps<TModalType extends ModalType = ModalType> = {
  type: TModalType;
  props: Parameters<(typeof modalsComponents)[TModalType]>[0];
};
