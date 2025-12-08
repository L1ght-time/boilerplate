"use client";

import { ModalProps, modalsComponents } from "~/lib/constants/modals";
import { ModalCreateProps, useModalsStore } from "~/store/client/modals-store";

export const RootModal = () => {
  const modalsMap = useModalsStore((state) => state.modals);
  const modals = Object.values(modalsMap);

  if (!modals.length) return null;

  return (
    <>
      {modals.map((modal) => {
        const ModalComponent = modalsComponents[
          modal.type
        ] as React.ComponentType<ModalProps["props"]>;
        const modalProps = modal.props || {};

        return (
          <ModalComponent
            key={modal.id}
            id={modal.id}
            {...(modalProps as unknown as ModalCreateProps["props"])}
          />
        );
      })}
    </>
  );
};
