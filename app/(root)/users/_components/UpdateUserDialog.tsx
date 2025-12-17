"use client";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserSchema, UserSchema } from "@/schema/userSchema";
import { useUpdateUserMutation } from "@/store/Api/userApi";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { UserForm } from "./user-form";

interface Prop {
  initialValue: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateUserDialog = ({ initialValue, open, setOpen }: Prop) => {
  const userForm = useForm<UserSchema>({
    resolver: zodResolver(getUserSchema(true)),
    defaultValues: initialValue,
  });

  const [Update, { isLoading }] = useUpdateUserMutation();
  const handleSubmit = async (value: any) => {
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
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <UserForm
          form={userForm}
          isLoading={isLoading}
          submitLabel="Update"
          handleSubmit={handleSubmit}
          update
        />
      </DialogContent>
    </Dialog>
  );
};
