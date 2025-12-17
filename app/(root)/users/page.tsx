import { RoleProvider } from "@/components/Providers/RoleProvider";
import { Role } from "@/types/auth";
import { NewUserDialog } from "./_components/NewUserDialog";
import { userColumns } from "./_components/UserColumn";
import { UserDataTable } from "./_components/UserDataTable";

export default function UserPage() {
  return (
    <RoleProvider roles={[Role.DEVELOPER]}>
      <div className="p-5 md:p-30">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex justify-end">
          <NewUserDialog />
        </div>
        <UserDataTable columns={userColumns} />
      </div>
    </RoleProvider>
  );
}
