"use client";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { usePermission } from "@/hooks/usePermission";
import { userStatusSchema, UserStatusSchema } from "@/schema/userStatusSchema";
import { useUpdateUserStatusMutation } from "@/store/Api/userApi";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { RoleSelect } from "./role-select";
interface Props {
  data: User;
}
export const UserStatusCellAction = ({ data }: Props) => {
  const [Update, { isLoading }] = useUpdateUserStatusMutation();
  const canEdit = usePermission("user:update");

  const userStatusForm = useForm<UserStatusSchema>({
    resolver: zodResolver(userStatusSchema),
    defaultValues: {
      role_id: "",
    },
  });

  const handleUpdate = async (value: UserStatusSchema) => {
    try {
      const responseData = await Update({ id: data.id, ...value }).unwrap();
      showToast({
        title: responseData.message,
        type: "success",
      });
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
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isLoading || !canEdit}>Confirm</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to confirm this user?</DialogTitle>
        </DialogHeader>

        <Form {...userStatusForm}>
          <form onSubmit={userStatusForm.handleSubmit(handleUpdate)}>
            <FieldGroup>
              <Field>
                <FormField
                  control={userStatusForm.control}
                  name="role_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role </FormLabel>
                      <FormControl>
                        <RoleSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          isLoading={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading || !userStatusForm.formState.isDirty}
                  className="mt-2 w-full"
                >
                  {isLoading ? <Spinner /> : <IconCheck />}
                  Confirm
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
