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
import { ProjectSchema } from "@/schema/projectSchema";
import { CircleFadingPlus } from "lucide-react";
import { useForm } from "react-hook-form";

interface Prop {
  form: ReturnType<typeof useForm<ProjectSchema>>;
  submitLabel: string;
  isLoading: boolean;
  handleSubmit: (value: any) => Promise<void>;
}
export function ProjectForm({
  form,
  isLoading,
  handleSubmit,
  submitLabel,
}: Prop) {
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
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            field.onChange(new Date(e.target.value));
                          }}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
              <Field>
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            field.onChange(new Date(e.target.value));
                          }}
                          disabled={isLoading}
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
