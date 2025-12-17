"use client";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { roleSchema, RoleSchema } from "@/schema/roleSchema";
import { useCreateRoleMutation } from "@/store/Api/roleSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RoleForm } from "./role-form";

export const NewRoleDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const roleForm = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: "",
      permissionIds: [],
    },
  });

  const [Create, { isLoading }] = useCreateRoleMutation();
  const handleSubmit = async (value: RoleSchema) => {
    try {
      const data = await Create(value).unwrap();
      showToast({
        title: "Success",
        description: data.message,
        type: "success",
      });
      setOpen(false);
      roleForm.reset();
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
      <DialogTrigger asChild>
        <Button>
          <IconPlus /> New Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Role</DialogTitle>{" "}
          <DialogDescription>Enter role details</DialogDescription>
        </DialogHeader>

        <RoleForm
          form={roleForm}
          isLoading={isLoading}
          submitLabel="Create"
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
