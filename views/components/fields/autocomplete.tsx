import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useToggle } from "react-use";
import { cn } from "~/lib/utils";
import { Button } from "~/views/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/views/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/views/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/views/components/ui/popover";

type AutocompleteProps = {};

export const Autocomplete = (props: AutocompleteProps) => {
  const { control, options, name, label, placeholder } = props;

  const [open, setOpen] = useToggle(false);

  const { setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between"
                >
                  {field.value
                    ? options.find((option) => option === field.value)
                    : placeholder}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option}
                          value={option}
                          onSelect={(currentValue) => {
                            setValue(name, currentValue);
                            setOpen(false);
                          }}
                        >
                          {option}
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === option
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
