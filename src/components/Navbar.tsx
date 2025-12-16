import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Github, Plus } from "lucide-react";
import { useMyContext } from "@/providers/ContextProvider";
import logo from "@/assets/streak-x.png"

const Navbar = () => {
  const { pathname } = useLocation();
  const { streakLists } = useMyContext();
  return (
    <nav className="">
      <div className="brand flex items-center gap-2">
        <span className="">
          {/* 🔥 */}
          <img src={logo} className="h-16" alt="streak" />
        </span>
        <div className="title">
          <h3 className="text-xl xl:text-3xl">Streak-X</h3>
          <h6 className="subtitle text-sm">Your Daily Streaks Manager</h6>
        </div>
        <div className="flex-1"></div>
        {pathname === "/" && streakLists.length > 0 && (
          <Link to={"./add"} className="hidden xl:block ">
            <Button className="text-black cursor-pointer">
              <Plus /> New
            </Button>
          </Link>
        )}
        <Button
          variant={"secondary"}
          className="rounded-[100%] h-10 w-10 cursor-pointer"
          onClick={() => {
            window.open("https://github.com/iamvkr/streakx", "_blank");
          }}
        >
          <Github />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
