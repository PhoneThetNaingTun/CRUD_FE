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
import { projectSchema, ProjectSchema } from "@/schema/projectSchema";
import { useCreateProjectMutation } from "@/store/Api/projectApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectForm } from "./project-form";

export const NewProjectDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const canCreate = usePermission("project:create");

  const projectForm = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      start_date: new Date(),
      end_date: undefined,
    },
  });

  const [Create, { isLoading }] = useCreateProjectMutation();
  const handleSubmit = async (value: ProjectSchema) => {
    try {
      const data = await Create(value).unwrap();
      showToast({
        title: "Success",
        description: data.message,
        type: "success",
      });
      setOpen(false);
      projectForm.reset();
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
          <IconPlus /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>{" "}
          <DialogDescription>Enter project details</DialogDescription>
        </DialogHeader>

        <ProjectForm
          form={projectForm}
          isLoading={isLoading}
          submitLabel="Create"
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
