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
import { usePermission } from "@/hooks/usePermission";
import { getUserSchema, UserSchema } from "@/schema/userSchema";
import { useCreateUserMutation } from "@/store/Api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserForm } from "./user-form";

export const NewUserDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const canCreate = usePermission("user:create");

  const userForm = useForm<UserSchema>({
    resolver: zodResolver(getUserSchema(false)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role_id: "",
    },
  });

  const [Create, { isLoading }] = useCreateUserMutation();
  const handleSubmit = async (value: any) => {
    try {
      const data = await Create(value).unwrap();
      showToast({
        title: "Success",
        description: data.message,
        type: "success",
      });
      setOpen(false);
      userForm.reset();
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
      <DialogTrigger asChild disabled={!canCreate}>
        <Button>
          <IconPlus /> New User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>{" "}
          <DialogDescription>Enter user details</DialogDescription>
        </DialogHeader>

        <UserForm
          form={userForm}
          isLoading={isLoading}
          submitLabel="Create"
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
