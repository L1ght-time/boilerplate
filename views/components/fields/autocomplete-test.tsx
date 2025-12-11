import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/views/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/views/components/ui/select";

type AutocompleteFieldProps<T extends FieldValues> = {
  options: string[];
  control: Control<any>;
  name: string;
  label: string;
};

export const AutocompleteTest = (props: any) => {
  const { control, options, name, label, placeholder } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log({ field });
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option: string) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
