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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ArrowDownLeftFromCircleIcon } from "lucide-react";

const ResetBtnDialog = ({ handleOk }: { handleOk: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} >
          <ArrowDownLeftFromCircleIcon /> Reset
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <ArrowDownLeftFromCircleIcon
                  />
          </AlertDialogMedia>
          <AlertDialogTitle>Reset</AlertDialogTitle>
          <AlertDialogDescription>
            Are You Sure To Reset your streak. This will make your streak count
            to 0?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOk}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetBtnDialog;
