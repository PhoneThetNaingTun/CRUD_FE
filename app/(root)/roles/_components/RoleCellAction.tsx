import { DeleteDialog } from "@/components/delete-dialog";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { usePermission } from "@/hooks/usePermission";
import { useDeleteRoleMutation } from "@/store/Api/roleSlice";
import { Role } from "@/types/auth";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { UpdateRoleDialog } from "./UpdateRoleDialog";

interface Props {
  data: Role;
}

export const RoleCellAction = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [Delete, { isLoading }] = useDeleteRoleMutation();

  const canEdit = usePermission("role:update");
  const canDelete = usePermission("role:delete");

  const handleDelete = async () => {
    try {
      const responseData = await Delete(data.id).unwrap();
      showToast({
        title: responseData.message,
        type: "success",
      });
      setDeleteOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message,
          type: "error",
        });
      } else {
        showToast({
          title: "Something went wrong!",
          type: "error",
        });
      }
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>Actions</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem disabled={!canEdit} onClick={() => setOpen(true)}>
            <IconEdit className="w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!canDelete}
            onClick={() => setDeleteOpen(true)}
          >
            <IconTrash className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateRoleDialog initialValue={data} open={open} setOpen={setOpen} />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Role"
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </div>
  );
};
