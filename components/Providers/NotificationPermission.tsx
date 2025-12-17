"use client";

import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/Slice/AuthSlice";
import { requestForToken } from "@/utils/firebase";
import { useEffect } from "react";

const NotificationPermission = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const subscribeUser = async () => {
      const token = await requestForToken();

      dispatch(setToken(token));
    };

    subscribeUser();
  }, []);

  return null;
};

export default NotificationPermission;
