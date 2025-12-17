"use client";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { roleSchema, RoleSchema } from "@/schema/roleSchema";
import { useUpdateRoleMutation } from "@/store/Api/roleSlice";
import { Role } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { RoleForm } from "./role-form";

interface Prop {
  initialValue: Role;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateRoleDialog = ({ initialValue, open, setOpen }: Prop) => {
  const roleForm = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: initialValue,
  });

  const [Update, { isLoading }] = useUpdateRoleMutation();
  const handleSubmit = async (value: RoleSchema) => {
    try {
      const data = await Update({ id: initialValue.id, ...value }).unwrap();
      showToast({
        title: "Success",
        description: data.message,
        type: "success",
      });
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: "Error",
          description: error?.data?.message,
          type: "error",
        });
        return;
      }
      showToast({
        title: "Error",
        description: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <RoleForm
          form={roleForm}
          isLoading={isLoading}
          submitLabel="Update"
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
