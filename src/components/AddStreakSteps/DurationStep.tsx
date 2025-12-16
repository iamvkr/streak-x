import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { stepsPropsType } from "./propType";
import { trophyData } from "@/constants";

const DurationStep = ({
  setCurrentStep,
  formData,
  setformData,
  handleAddStreak,
}: stepsPropsType & { handleAddStreak: () => void }) => {
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };


  return (
    <div className="border border-gray-200 rounded-lg min-h-[250px] flex items-center justify-center mb-8">
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Select Your Goal</CardTitle>
          <CardDescription className="min-h-46 ">
            {/* content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {trophyData.map((item, i) => (
                <Card
                  className={`w-full overflow-hidden bg-secondary border-1 cursor-pointer ${
                    formData.totalCount === item.days ? "border-white" : ""
                  }`}
                  key={i}
                  onClick={() => {
                    setformData({ ...formData, totalCount: item.days });
                  }}
                >
                  <CardHeader>
                    <CardTitle>Commit for {item.days} Days</CardTitle>
                    <div className=" text-gray-500 flex items-center gap-2 mt-3">
                      <Trophy className="size-5" />
                      <span>{item.trophy} Trophy</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrev} variant={"outline"}>
            Previous
          </Button>

          <Button onClick={handleAddStreak} disabled={!formData.totalCount}>
            Finish
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DurationStep;
