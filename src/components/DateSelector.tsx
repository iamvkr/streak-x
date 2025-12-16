import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

function DateSelector({
  selectedDate,
  setselectedDate,
  className,
}: {
  selectedDate: Date;
  setselectedDate: (date: Date) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`w-48 justify-between font-normal ${className}`}
          >
            {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            endMonth={
              new Date(`${new Date(Date.now()).getFullYear() + 1}-12-01`)
            }
            onSelect={(date) => {
              if (date) {
                setselectedDate(date);
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateSelector;
