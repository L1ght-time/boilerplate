"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToggle } from "react-use";
import z from "zod";
import { useModalsStore } from "~/store/client/modals-store";
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

type DataTableFiltersSheetProps = DialogProps & {
  id: string;
};

const filtersSchema = z.object({
  filters: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
});

type FiltersSchemaType = z.infer<typeof filtersSchema>;

export const DataTableFiltersSheet = (props: DataTableFiltersSheetProps) => {
  const { id } = props;

  const [open, setOpen] = useToggle(true);

  const hideModalById = useModalsStore((state) => state.hideModalById);
  const onClose = () => hideModalById(id);

  const form = useForm<FiltersSchemaType>({
    resolver: zodResolver(filtersSchema),
    mode: "onChange",
    defaultValues: {
      filters: [
        {
          name: "",
          value: "",
        },
      ],
    },
  });

  const onSubmit = (data: FiltersSchemaType) => {
    console.log(data);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Filters:</SheetTitle>
              <InputField
                control={form.control}
                name="filters.0.name"
                label="Name"
                placeholder="Enter Name"
              />
              <InputField
                control={form.control}
                name="filters.0.value"
                label="Value"
                placeholder="Enter Name"
              />
            </SheetHeader>
            <SheetFooter>
              <Button>
                <FaPlus /> ADD FILTER
              </Button>
              <Button onClick={onClose}>
                <MdDelete /> REMOVE ALL
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
