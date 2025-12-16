import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DateSelector from "@/components/DateSelector";
import type { stepsPropsType } from "./propType";

const ScheduleStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const [selectedDate, setselectedDate] = useState(new Date());
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    setformData({ ...formData, startDateMs: selectedDate.getTime() });
  }, [selectedDate]);

  return (
    <div
      className="border border-gray-200 rounded-lg min-h-[250px] flex items-center justify-center mb-8"
    >
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Start Date</CardTitle>
          <CardDescription className="min-h-46 ">
            {/* content */}
            <div className="text-center py-10">
              <h2 className="text-xl font-bold text-gray-200">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h2>
              <div className="text-gray-300 mt-2 cursor-pointer pt-2">
                <DateSelector
                  selectedDate={selectedDate}
                  setselectedDate={setselectedDate}
                />
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrev} variant={"outline"}>
            Previous
          </Button>

          <Button onClick={handleNext}>Next Step</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScheduleStep;
