export type StreakType = {
  id: number;
  title: string;
  reason?:string;
  startDateMs:number;
  totalCount:number;
  completedDates:number[]
};
export type TrophyType = "Spark" | "Pro" | "Expert" | "Master";
