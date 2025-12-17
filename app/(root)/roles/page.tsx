import { NewRoleDialog } from "./_components/NewRoleDialog";
import { roleColumns } from "./_components/RoleColumn";
import { RoleDataTable } from "./_components/RoleDataTable";

export default function UserPage() {
  return (
    <div className="p-5 md:p-30">
      <h1 className="text-3xl font-bold">Roles</h1>
      <div className="flex justify-end">
        <NewRoleDialog />
      </div>
      <RoleDataTable columns={roleColumns} />
    </div>
  );
}
