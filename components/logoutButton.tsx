"use client";
import { useLogoutMutation } from "@/store/Api/authApi";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { showToast } from "./toaster";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const router = useRouter();
  const [LogOut, { isLoading }] = useLogoutMutation();

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
    <Button onClick={handleLogout} disabled={isLoading}>
      <IconLogout /> Logout
    </Button>
  );
};
