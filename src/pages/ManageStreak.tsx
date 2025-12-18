import DateSelector from "@/components/DateSelector";
import DeleteBtnDialog from "@/components/dialogs/DeleteBtnDialog";
import ResetBtnDialog from "@/components/dialogs/ResetBtnDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMyContext } from "@/providers/ContextProvider";
import type { StreakType } from "@/types";
import {
  ArrowLeft,
  PenBox,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";



const ManageStreak = () => {
  const params = useParams();
  const { streakLists, setstreakLists } = useMyContext();
  const [errorMsg, seterrorMsg] = useState("");
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

  const handleSave = () => {
    if (!formData.title.trim()) {
      seterrorMsg("Please fill the title");
      return false;
    }
    // const targetStreak = streakLists.find(
    //   (item) => item.id === Number(params.id)
    // );
    // if (targetStreak) {}
    // update with completed count to 0
    setstreakLists(
      streakLists.map((item) => {
        if (item.id === Number(params.id)) {
          return formData;
        }
        return item;
      })
    );
    toast.success("Streak Saved!");
    window.history.back();
  };

  const handleReset = () => {
    setstreakLists(
      streakLists.map((item) => {
        if (item.id === Number(params.id)) {
          return { ...item, completedDates: [] };
        }
        return item;
      })
    );
    toast.success("Streak Reset");
    window.history.back();
  };

  const handleDelete = () => {
    setstreakLists(streakLists.filter((item) => item.id !== Number(params.id)));
    toast.success("Streak Deleted");
    window.history.back();
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
          <div className="desktop-actions hidden xl:block text-black space-x-1">
            {/* <Button variant={"secondary"} onClick={handleReset}>
              <ArrowDownLeftFromCircleIcon /> Reset
            </Button> */}
            <ResetBtnDialog handleOk={handleReset}/>
            {/* <Button variant={"destructive"} onClick={handleDelete}>
              <Trash /> Delete
            </Button> */}
            <DeleteBtnDialog handleOk={handleDelete}/>
            <Button onClick={handleSave}>
              <Save /> Save
            </Button>
          </div>
        </div>
        <div className="mobile-actions xl:hidden mt-2 mb-8 text-black flex justify-evenly">
        <ResetBtnDialog handleOk={handleReset}/>
        <DeleteBtnDialog handleOk={handleDelete}/>
          <Button onClick={handleSave}>
            <Save /> Save
          </Button>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="header flex items-center gap-4">
            <PenBox />
            <h4>Edit Details</h4>
          </div>
        </div>

        <div>
          <FieldGroup className="mt-2 max-w-lg pt-4 pb-4">
            <Field>
              <FieldLabel htmlFor="small-form-name">Title</FieldLabel>
              <Input
                id="small-form-name"
                value={formData.title}
                onChange={(e) => {
                  seterrorMsg("");
                  setformData({ ...formData, title: e.target.value });
                }}
                placeholder="Streak Title"
                required
              />
              <p className="text-red-700 text-sm">{errorMsg}</p>
            </Field>
            <Field>
              <FieldLabel htmlFor="small-form-name">Duration (days)</FieldLabel>
              <Input
                id="small-form-name"
                type="number"
                min={0}
                max={365}
                value={formData.totalCount}
                onChange={(e) => {
                  // seterrorMsg("")
                  setformData({
                    ...formData,
                    totalCount: Number(e.target.value),
                  });
                }}
                placeholder="Number of Days"
                required
              />
              {/* <p className="text-red-700 text-sm">{errorMsg}</p> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="small-form-name">Why (Optional)</FieldLabel>
              <Input
                id="small-form-name"
                value={formData.reason}
                onChange={(e) => {
                  // seterrorMsg("")
                  setformData({ ...formData, reason: e.target.value });
                }}
                placeholder="Reason"
                required
              />
              {/* <p className="text-red-700 text-sm">{errorMsg}</p> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="small-form-name">Start Date</FieldLabel>
              <DateSelector
                className="w-full"
                selectedDate={new Date(formData.startDateMs)}
                setselectedDate={(date: Date) => {
                  setformData({ ...formData, startDateMs: date.getTime() });
                }}
              />
            </Field>
          </FieldGroup>
        </div>
        
      </div>
    )
  );
};

export default ManageStreak;
