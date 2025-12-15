"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToggle } from "react-use";
import z from "zod";
import { useModalsStore } from "~/store/client/modals-store";
import { useTableDataStore } from "~/store/client/table-data-store";
import { Autocomplete } from "~/views/components/fields/autocomplete";
import { InputField } from "~/views/components/fields/text-field";
import { Button } from "~/views/components/ui/button";
import { Form } from "~/views/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/views/components/ui/sheet";

const filtersSchema = z.object({
  filters: z.array(
    z.object({
      column: z.string(),
      value: z.string(),
    })
  ),
});

type FiltersSchemaType = z.infer<typeof filtersSchema>;

type DataTableFiltersSheetProps = DialogProps & {
  id: string;
};

export const DataTableFiltersSheet = (props: DataTableFiltersSheetProps) => {
  const { id } = props;

  const modals = useModalsStore((state) => state.modals);

  const [open, toggleOpen] = useToggle(!!modals[id]);

  const columns = useTableDataStore((state) => state.columns);

  const form = useForm<FiltersSchemaType>({
    resolver: zodResolver(filtersSchema),
    mode: "onChange",
    defaultValues: {
      filters: [
        {
          column: "",
          value: "",
        },
      ],
    },
  });

  const { fields, append, replace } = useFieldArray({
    control: form.control,
    name: "filters",
  });

  const onSubmit = (data: FiltersSchemaType) => {
    console.log(data);
  };

  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Filters:</SheetTitle>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <Autocomplete
                    control={form.control}
                    options={columns}
                    name={`filters.${index}.column`}
                    label="Column"
                    placeholder="Select Column"
                  />
                  <InputField
                    control={form.control}
                    name={`filters.${index}.value`}
                    label="Value"
                    placeholder="Enter Value"
                  />
                </div>
              ))}
            </SheetHeader>
            <SheetFooter>
              <Button
                onClick={() => {
                  append({
                    column: "",
                    value: "",
                  });
                }}
              >
                <FaPlus /> ADD FILTER
              </Button>
              <Button
                onClick={() => {
                  replace({
                    column: "",
                    value: "",
                  });
                }}
              >
                <MdDelete /> REMOVE ALL
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
