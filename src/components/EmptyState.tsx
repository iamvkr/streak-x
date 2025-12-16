import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/streak-x.png"

const EmptyState = () => {
  return (
    <div className="w-full h-[calc(100vh_-_6rem)] flex flex-col items-center justify-center">
      <img src={logo} className="h-24" alt="streak" />
      <div className="flex flex-col items-center">
        <p className="my-4">Start Your First Streak Now</p>
        <Link to={"/add"}>
          <Button className="text-black cursor-pointer">
            <Plus /> Create New Streak
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
