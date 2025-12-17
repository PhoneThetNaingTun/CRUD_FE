"use client";

import { useLazyGetMeQuery } from "@/store/Api/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeUser, setUser } from "@/store/Slice/AuthSlice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [getMe, { isLoading }] = useLazyGetMeQuery();
  const { user } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await getMe("");
        if (!data) throw new Error("Unauthenticated");
        dispatch(setUser(data.data));
      } catch {
        dispatch(removeUser(null));
        router.replace("/login");
      }
    };
    init();
  }, [dispatch, getMe, router]);

  if (isLoading || !user) return null;

  return <>{children}</>;
};
