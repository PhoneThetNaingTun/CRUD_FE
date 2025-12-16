import { LogoutButton } from "@/components/logoutButton";
import { AuthProvider } from "@/components/Providers/AuthProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <div className="p-5 md:p-30">
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        {children}
      </div>
    </AuthProvider>
  );
};

export default RootLayout;
