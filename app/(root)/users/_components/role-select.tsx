"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetRoleQuery } from "@/store/Api/roleSlice";
import { Role } from "@/types/auth";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useGetRoles } from "../hooks/use-getUsers";

interface Prop {
  value?: string | null;
  onValueChange: (value: any) => void;
  isLoading?: boolean;
}

export const RoleSelect = ({ value, onValueChange, isLoading }: Prop) => {
  const {
    roles,
    isLoading: isLoadingRole,
    totalPages: roleTotalPages,
    handleNext: handleNextRole,
    handlePrevious: handlePrevRole,
    page: rolePage,
  } = useGetRoles(1, 10);

  console.log(value);
  const { data, isLoading: isLoadingOne } = useGetRoleQuery(
    { id: value! },
    { skip: !value }
  );

  const isSelectedMissing =
    data?.data && !roles.some((s: Role) => s.id === data?.data?.id);

  return (
    <Select
      onValueChange={onValueChange}
      value={value || ""}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Role " />
      </SelectTrigger>

      <SelectContent className="max-h-50">
        {isLoadingRole ? (
          <SelectItem
            disabled
            value="-"
            className="flex items-center justify-center"
          >
            <Spinner />
          </SelectItem>
        ) : (
          <>
            <div className="w-full flex items-center gap-2 justify-between">
              <Button
                disabled={rolePage === 1 || isLoadingRole}
                onClick={handlePrevRole}
                variant={"ghost"}
              >
                <IconArrowLeft />
              </Button>
              <span>
                {rolePage}/{roleTotalPages}
              </span>
              <Button
                disabled={
                  rolePage === roleTotalPages ||
                  isLoadingRole ||
                  roleTotalPages === 0
                }
                variant={"ghost"}
                onClick={handleNextRole}
              >
                <IconArrowRight />
              </Button>
            </div>
            {roles.length > 0 ? (
              <>
                {isSelectedMissing && !isLoadingOne && (
                  <SelectItem
                    value={data?.data?.id}
                    className="flex items-center justify-center"
                  >
                    {data?.data.role}
                  </SelectItem>
                )}
                {roles.map((role: Role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.role}
                  </SelectItem>
                ))}
              </>
            ) : (
              <SelectItem
                disabled
                value="-"
                className="flex items-center justify-center"
              >
                Is Empty
              </SelectItem>
            )}
          </>
        )}
      </SelectContent>
    </Select>
  );
};
