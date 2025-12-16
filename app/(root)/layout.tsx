import { AuthProvider } from "@/components/Providers/AuthProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default RootLayout;
