import { getUsers } from "~/lib/server/users";
import { TableSection } from "~/views/pages/users-content/table-section";

export const UsersList = async () => {
  const users = await getUsers();

  return <TableSection users={users} />;
};
