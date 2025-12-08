import { DataTableFiltersModal } from "~/views/modals/data-table-filters-modal";

export const modalTypes = {
  dataTableFilters: "dataTableFilters",
} as const;

export type ModalType = keyof typeof modalTypes;

export const modalsComponents = {
  [modalTypes.dataTableFilters]: DataTableFiltersModal,
} as const;

export type ModalProps<T extends ModalType = ModalType> = {
  type: T;
  props: Parameters<(typeof modalsComponents)[T]>[0];
};
