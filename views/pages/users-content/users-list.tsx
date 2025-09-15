import { getUsers } from "~/lib/server/users";

export const UsersList = async () => {
  const users = await getUsers();

  console.log({ users });

  return <div>UsersList</div>;
};
