import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { stepsPropsType } from "./propType";

const ResonStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };
  return (
    <div className="border border-gray-200 rounded-lg min-h-[250px] flex items-center justify-center mb-8">
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Why do you want to track?</CardTitle>
          <CardDescription className="min-h-46 ">
            {/* content */}
            <FieldGroup className="mt-2">
              <Field>
                <FieldLabel htmlFor="small-form-name">
                  Why {`(Optional)`}
                </FieldLabel>
                <Input
                  id="small-form-name"
                  placeholder="Remind Your Future Self"
                  value={formData.reason}
                  onChange={(e) => {
                    setformData({ ...formData, reason: e.target.value });
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Enter" || e.key === "Enter") {
                      handleNext();
                    }
                  }}
                />
              </Field>
            </FieldGroup>
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

export default ResonStep;
