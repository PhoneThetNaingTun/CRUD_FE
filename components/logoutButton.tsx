"use client";
import { useLogoutMutation } from "@/store/Api/authApi";
import { useAppSelector } from "@/store/hooks";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { showToast } from "./toaster";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const router = useRouter();
  const [LogOut, { isLoading }] = useLogoutMutation();
  const { user } = useAppSelector((state) => state.Auth);

  const handleLogout = async () => {
    try {
      const data = await LogOut("").unwrap();

      showToast({
        title: data.message,
        type: "success",
      });
      router.replace("/login");
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message,
          type: "error",
        });
      } else {
        showToast({
          title: "An unexpected error occurred",
          type: "error",
        });
      }
    }
  };
  return (
    <div className="flex items-center flex-col sm:flex-row gap-3">
      <div className="px-3 py-1 shadow-md rounded-md">
        <p>{user?.name}</p>
        <Badge className="mr-2" variant={"outline"}>
          {user?.role}
        </Badge>
      </div>
      <Button onClick={handleLogout} disabled={isLoading}>
        <IconLogout /> Logout
      </Button>
    </div>
  );
};
