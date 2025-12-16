import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { trophyData } from "@/constants";
import { useMyContext } from "@/providers/ContextProvider";
import type { StreakType } from "@/types";
import { normalizeDate } from "@/utils";
import { ArrowLeft, CalendarClock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import flameLogo from "@/assets/flame.png";

const ViewStreak = () => {
  const params = useParams();
  const { streakLists, setstreakLists } = useMyContext();
  const [readonlyData, setreadonlyData] = useState({
    title: "",
    completedDates: [] as number[],
  });
  const [formData, setformData] = useState({
    id: 0,
    title: "",
    reason: "",
    startDateMs: 0,
    totalCount: 0,
    completedDates: [],
  } as StreakType);

  useEffect(() => {
    const targetStreak = streakLists.find(
      (item) => item.id === Number(params.id)
    );
    if (targetStreak) {
      setformData(targetStreak);
      setreadonlyData(targetStreak);
    }
  }, []);

  /** =========== TIMESTAMP VARIABLES ============= */
  const startDateTimestamp = normalizeDate(
    new Date(formData.startDateMs)
  ).getTime();
  const todayTimeStamp = normalizeDate(new Date(Date.now())).getTime();
  const endDateTimestamp =
    startDateTimestamp + formData.totalCount * 1000 * 60 * 60 * 24;

  //   formatted from number to data to use in calender
  //   Loop through 1 to totalCount duration and map to return list of normalized date
  const baseDates = Array.from({ length: formData.totalCount }).map(
    (_, i) => new Date(startDateTimestamp + i * 1000 * 60 * 60 * 24)
  );

  const completedDates = formData.completedDates.map(
    (timestamp) => new Date(timestamp)
  );

  const completedSet = new Set(
    formData.completedDates.map((timestamp) =>
      normalizeDate(new Date(timestamp)).getTime()
    )
  );

  const missedDates = baseDates.filter(
    (date) =>
      date.getTime() < todayTimeStamp &&
      !completedSet.has(normalizeDate(date).getTime())
  );

  //   check if current day is allowed to make streak:
  const isTodayAllowed =
    startDateTimestamp <= todayTimeStamp && todayTimeStamp <= endDateTimestamp;

  const isTodayComplete = completedSet.has(todayTimeStamp);

  const toggleComplete = () => {
    // console.log({ isTodayComplete });
    // console.log({ completedSet });
    //   update streakList:
    const targetStreak = streakLists.find(
      (item) => item.id === Number(params.id)
    );
    if (targetStreak) {
      setstreakLists(
        streakLists.map((item) => {
          if (item.id === Number(params.id)) {
            if (!isTodayComplete) {
              // add today
              return {
                ...formData,
                completedDates: [...formData.completedDates, todayTimeStamp],
              };
            } //else remove today:
            return {
              ...formData,
              completedDates: formData.completedDates.filter(
                (item) => item !== todayTimeStamp
              ),
            };
          }
          return item;
        })
      );
      toast.success(isTodayComplete ? "Streak removed" : "Streak added");
      window.history.back();
    }
  };

  return (
    formData.id !== 0 && (
      <div className="pt-4">
        <div className="flex justify-between items-center">
          <div className="header flex items-center gap-4">
            <ArrowLeft
              onClick={() => {
                window.history.back();
              }}
            />
            <h4 className="text-primary">{readonlyData.title}</h4>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="header flex items-center gap-4">
            <CalendarClock />
            <h4>Streak View</h4>
          </div>

          {/* TOGGLE BTN - DESKTOP */}
          <Button
            disabled={!isTodayAllowed}
            onClick={toggleComplete}
            className=" hidden xl:block"
            variant={isTodayComplete ? "destructive" : "default"}
          >
            {!isTodayAllowed
              ? "N/F"
              : isTodayComplete
              ? "Mark Today Uncomplete"
              : "Mark today Complete"}
          </Button>
        </div>

        {/* TOGGLE BTN - MOBILE */}
        <div className="mt-4  xl:hidden flex justify-center">
          <Button
            disabled={!isTodayAllowed}
            onClick={toggleComplete}
            variant={isTodayComplete ? "destructive" : "default"}
          >
            {!isTodayAllowed
              ? "N/F"
              : isTodayComplete
              ? "Mark Today Uncomplete"
              : "Mark today Complete"}
          </Button>
        </div>

        <div className="flex justify-center">
          <Calendar
            selected={new Date()}
            className="w-84"
            modifiers={{
              // booked: formData.completedDates.map(num=> new Date(num)),
              baseDates: baseDates,
              completedDates: completedDates,
              missedDates: missedDates,
            }}
            modifiersClassNames={{
              baseDates: `baseDateStyle `,
              completedDates: `completedDateStyle`,
              missedDates: `missedDatesStyle`,
            }}
            mode="single"
            showOutsideDays={false}
          />
          <style>
            {`
    .baseDateStyle{
    background-color: var(--color-zinc-900);
    border: 1px solid #fff;
    color: white;
    }

    .completedDateStyle{
    background-color:var(--color-green-700);
    }
    .missedDatesStyle{
    border:1px dashed white;
    }
    `}
          </style>
        </div>

        {/* TROPHY SECTION */}
        <div className="flex justify-between items-center mt-4">
          <div className="header flex items-center gap-4">
            <Trophy />
            <h4>Trophy: {readonlyData.completedDates.length}</h4>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 overflow-x-auto gap-4 pb-4">
          {trophyData.map((item, i) => (
            <Card
              key={i}
              className={`w-36 h-36 flex items-center justify-center gap-0 border  shrink-0  ${
                readonlyData.completedDates.length < item.days
                  ? "opacity-50"
                  : ""
              }`}
            >
              <img
                src={flameLogo}
                alt={item.trophy}
                className="w-16 select-none"
                draggable={"false"}
              />
              <p>{item.trophy}</p>
              <p>{item.days} Days</p>
            </Card>
          ))}
        </div>
      </div>
    )
  );
};

export default ViewStreak;
