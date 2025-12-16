import { Card } from "./ui/card";
import CircularProgress from "./CircularProgress";
import { CalendarClock, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import type { StreakType } from "@/types";
import { Link } from "react-router-dom";

const StreakCards = ({ data }: { data: StreakType }) => {
  return (
    <Card className="w-full overflow-hidden bg-secondary h-42 grid grid-cols-[30%_70%] xl:grid-cols-[20%_80%] items-center ps-2">
      <CircularProgress
        value={Math.floor((data.completedDates.length / data.totalCount) * 100)}
        size={100}
        strokeWidth={8}
      >
        <div className="text-xl font-bold ">
          <p className="text-primary">{data.completedDates.length}</p>
          <p>Days</p>
        </div>
      </CircularProgress>

      <div className="h-full">
        <p
          className="text-xl line-clamp-1 overflow-hidden"
          style={{ paddingRight: "1.5rem" }}
        >
          {data.title}
        </p>
        <p className="text-gray-300 my-2 flex gap-2 items-center">
          <Calendar className="size-5" />
          {new Date(data.startDateMs).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            // year: "numeric",
          })}
        </p>
        <p className="text-gray-300 flex gap-2 items-center">
          <CalendarClock className="size-5" />
          {data.totalCount} Days
        </p>
        <Link to={`./view/${data.id}`}>
          <Button
            size={"sm"}
            variant={"outline"}
            className="px-6 mt-4 text-primary"
          >
            View
          </Button>
        </Link>
        <Link to={`./manage/${data.id}`}>
          <Button size={"sm"} variant={"outline"} className="px-6 mt-4  ms-2">
            Manage
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default StreakCards;
