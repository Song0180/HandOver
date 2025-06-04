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
        from-pink-300 
        via-purple-300 
        to-yellow-300 
        bg-clip-text 
        text-transparent 
        transition-all 
        duration-300
        hover:scale-105
        hover:tracking-wide
        text-shadow-lg
        text-shadow-pink-200/30
      "
      >
        HandOver
      </span>
    </Link>
  );
}
