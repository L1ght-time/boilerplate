"use client";

import { ModalProps, modalsComponents } from "~/lib/constants/modals";
import { useModalsStore } from "~/store/client/modals-store";

export const RootModal = () => {
  const modalsMap = useModalsStore((state) => state.modals);
  const modals = Object.values(modalsMap);

  if (!modals.length) return null;

  return (
    <>
      {modals.map((modal) => {
        const ModalComponent = modalsComponents[modal.type] as React.FC<
          ModalProps["props"]
        >;

        const modalProps = modal.props || {};

        return (
          <ModalComponent
            {...(modalProps as ModalProps["props"])}
            key={modal.id}
            id={modal.id}
          />
        );
      })}
    </>
  );
};
