import { Outlet } from "react-router";
import { ThemeProvider } from "~/components/theme-provider";

const RootLayout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="handover-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default RootLayout;
