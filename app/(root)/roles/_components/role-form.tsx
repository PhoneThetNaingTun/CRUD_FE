"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RoleSchema } from "@/schema/roleSchema";
import { useGetPermissionsQuery } from "@/store/Api/permissionSlice";
import { Permission } from "@/types/auth";
import { CircleFadingPlus } from "lucide-react";
import { useForm } from "react-hook-form";

interface Prop {
  form: ReturnType<typeof useForm<RoleSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}
export function RoleForm({ form, isLoading, handleSubmit, submitLabel }: Prop) {
  const { data: Permissions, isLoading: isPermissionLoading } =
    useGetPermissionsQuery({});
  return (
    <div className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Field>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
              <Field className="max-h-[50vh] overflow-y-scroll bg-muted p-5 rounded-md">
                <FormField
                  control={form.control}
                  name="rolePermissions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permissions</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          {isPermissionLoading ? (
                            <Spinner />
                          ) : (
                            Permissions?.data.map((permission: Permission) => {
                              const isChecked = field.value?.some(
                                (rp) => rp.permission.id === permission.id
                              );

                              return (
                                <div
                                  className="flex items-center gap-3"
                                  key={permission.id}
                                >
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          {
                                            permission: {
                                              id: permission.id,
                                            },
                                          },
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (rp) =>
                                              rp.permission.id !== permission.id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  {permission.permission}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isDirty}
                  className="mt-2 w-full"
                >
                  {isLoading ? <Spinner /> : <CircleFadingPlus />}
                  {submitLabel}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </FieldGroup>
    </div>
  );
}
