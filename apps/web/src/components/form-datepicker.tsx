import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import { Calendar } from "./ui/calendar";

type FormDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  defaultValue?: Date;
};

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  required,
  defaultValue,
}: FormDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Este campo é obrigatório" : false }}
      render={({ field, fieldState }) => {
        const selectedDate = field.value || defaultValue;

        return (
          <div className="relative flex justify-center flex-col w-full">
            {label && (
              <div className="text-xs px-1 !text-zinc-950 mb-1">
                {label}
                {required && <span className="ml-1">*</span>}
                {fieldState.error && (
                  <span className="text-red-600 text-xs mt-1 ml-2">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    dayjs(selectedDate).format("DD/MM/YY")
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
}
