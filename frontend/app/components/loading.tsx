import { Loader } from "lucide-react";
import { Logo } from "./ui/logo";

export function Loading() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-svh">
      <Logo />
      <Loader className="animate-spin" />
    </div>
  );
}
