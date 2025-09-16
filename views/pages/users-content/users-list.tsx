import { getUsers } from "~/lib/server/users";
import { UsersTableSection } from "~/views/pages/users-content/users-table-section";

export const UsersList = async () => {
  const users = await getUsers();

  return <UsersTableSection users={users} />;
};
