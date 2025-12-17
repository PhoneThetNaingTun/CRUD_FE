import { PermissionProvider } from "@/components/Providers/PermissionProvider";
import { NewProjectDialog } from "./_components/NewProjectDialog";
import { projectColumns } from "./_components/ProjectColumn";
import { ProjectDataTable } from "./_components/ProjectTable";

export default function ProjectPage() {
  return (
    <PermissionProvider permissions="project:read">
      <div className="p-5 md:p-30">
        <h1 className="text-3xl font-bold">Projects</h1>

        <div className="flex justify-end">
          <NewProjectDialog />
        </div>

        <ProjectDataTable columns={projectColumns} />
      </div>
    </PermissionProvider>
  );
}
