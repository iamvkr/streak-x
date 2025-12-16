import type { StreakType } from "@/types";

export type stepsPropsType = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formData: StreakType;
  setformData: (streakList: StreakType) => void;
};
