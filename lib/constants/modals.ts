export const modalTypes = {
  CREATE_USER: "createUser",
} as const;

export type ModalType = keyof typeof modalTypes;

export const modalsComponents = {
  //   [modalTypes.CREATE_USER]: CreateUserModal,
} as const;

// export type ModalProps<T extends ModalType = ModalType> = {
//   type: T;
//   props: Parameters<(typeof modalsComponents)[T]>[0];
// };
