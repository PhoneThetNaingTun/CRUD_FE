"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

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
import { UserSchema } from "@/schema/userSchema";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RoleSelect } from "./role-select";

interface Prop {
  form: ReturnType<typeof useForm<UserSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
  update?: boolean;
}
export function UserForm({
  form,
  isLoading,
  handleSubmit,
  submitLabel,
  update,
}: Prop) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Field>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
              <Field>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
              {!update && (
                <Field>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                                className="pr-10"
                                disabled={isLoading}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                {showPassword ? (
                                  <IconEyeOff className="h-5 w-5" />
                                ) : (
                                  <IconEye className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </Field>
              )}
              <Field>
                <FormField
                  control={form.control}
                  name="role_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Role </FormLabel>
                      <FormControl>
                        <RoleSelect
                          value={field.value ?? ""}
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
