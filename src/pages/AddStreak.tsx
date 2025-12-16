import { useState } from "react";
import type { StreakType } from "@/types";
import TitleStep from "@/components/AddStreakSteps/TitleStep";
import ResonStep from "@/components/AddStreakSteps/ResonStep";
import ScheduleStep from "@/components/AddStreakSteps/ScheduleStep";
import DurationStep from "@/components/AddStreakSteps/DurationStep";
import { useMyContext } from "@/providers/ContextProvider";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PartyPopper } from "lucide-react";

const AddStreak = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCongratsOpen, setisCongratsOpen] = useState(false);
  const [formData, setformData] = useState({
    id: 0,
    title: "",
    reason: "",
    startDateMs: 0,
    totalCount: 0,
    completedDates: [],
  } as StreakType);
  const { streakLists, setstreakLists } = useMyContext();

  const steps = [
    {
      id: 1,
      name: "Title",
    },
    {
      id: 2,
      name: "Reason",
    },
    {
      id: 3,
      name: "Schedule",
    },
    {
      id: 4,
      name: "Duration",
    },
  ];

  const handleAddStreak = () => {
    setstreakLists([...streakLists, { ...formData, id: Date.now() }]);
    toast.success("New Streak Added!");
    if (streakLists.length <= 0) {
      // open congrats dialog
      setisCongratsOpen(true);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      {/* --- Top Horizontal Stepper --- */}
      <div className="flex items-center justify-between mb-8 relative">
        {/* Background Line (Gray) */}
        <div className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded"></div>

        {/* Dynamic Progress Line */}
        <div
          className="absolute left-0  top-0 h-1 bg-primary  transition-all duration-300 ease-in-out rounded"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center mt-4">
            {/* Step Label */}
            <span
              className={`mt-2 text-sm font-medium transition-colors duration-300 
              ${currentStep >= step.id ? "text-gray-200" : "text-gray-400"}`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* --- Step Content --- */}

      {currentStep === 1 && (
        <TitleStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
        />
      )}
      {currentStep === 2 && (
        <ResonStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
        />
      )}
      {currentStep === 3 && (
        <ScheduleStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
        />
      )}
      {currentStep === 4 && (
        <DurationStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
          handleAddStreak={handleAddStreak}
        />
      )}

      {/* CONGRATS DIALOG WHEN NEW STREAK CREATED SUCCESSFULLY */}
      <AlertDialog open={isCongratsOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <PartyPopper className="text-primary" />
            </AlertDialogMedia>
            <AlertDialogTitle>Congrats!</AlertDialogTitle>
            <AlertDialogDescription>
              Congratulations on your first streak! Consider adding this site to
              your Home Screen to maintain your streak daily — easy and
              hassle-free.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setisCongratsOpen(false);
                window.history.back();
              }}
            >
              May be Later
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setisCongratsOpen(false);
                window.history.back();
              }}
            >
              Sure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddStreak;
