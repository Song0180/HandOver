import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <span
        className="
        p-2 
        font-bold 
        text-3xl 
        tracking-tight 
        bg-gradient-to-r 
        from-violet-300 
        via-red-300
        to-orange-300 
        dark:from-violet-500 
        dark:via-red-500 
        dark:to-orange-500 
        bg-clip-text 
        text-transparent 
        transition-all 
        duration-300
        hover:scale-105
        text-shadow-lg
        text-shadow-red-200/20
        dark:text-shadow-red-100/10
      "
      >
        HandOver
      </span>
    </Link>
  );
}
