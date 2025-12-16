import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { stepsPropsType } from "./propType";
import { useState } from "react";

const TitleStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const [errorMsg, seterrorMsg] = useState("");
  const handleNext = () => {
    if (!formData.title.trim()) {
      seterrorMsg("Please fill the title");
      return false;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="border border-gray-200 rounded-lg min-h-[250px] flex items-center justify-center mb-8">
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>What do you want to track?</CardTitle>
          <CardDescription className="min-h-46 ">
            <FieldGroup className="mt-2">
              <Field>
                <FieldLabel htmlFor="small-form-name">Title</FieldLabel>
                <Input
                  id="small-form-name"
                  value={formData.title}
                  onChange={(e) => {
                    seterrorMsg("");
                    setformData({ ...formData, title: e.target.value });
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Enter" || e.key === "Enter") {
                      if (!formData.title.trim()) {
                        return false;
                      }
                      handleNext();
                    }
                  }}
                  placeholder="Streak Title"
                  required
                />
                <p className="text-red-700 text-sm">{errorMsg}</p>
                {/* <p className="text-zinc-500 text-xs hidden xl:block">{!errorMsg && "Press enter to continue"}</p> */}
              </Field>

              <p className="text-gray-600">Examples:</p>
              <div className="flex gap-2">
                <Badge
                  variant={"secondary"}
                  className="p-3 cursor-pointer text-slate-400"
                >
                  No Fast Food
                </Badge>
                <Badge
                  variant={"secondary"}
                  className="p-3 cursor-pointer text-slate-400"
                >
                  Read 10 Pages
                </Badge>
              </div>
            </FieldGroup>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button disabled={true} variant={"outline"}>
            Previous
          </Button>

          <Button onClick={handleNext}>Next Step</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TitleStep;
