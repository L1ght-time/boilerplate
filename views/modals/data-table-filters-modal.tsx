"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import z from "zod";
import { useModalsStore } from "~/store/client/modals-store";
import { InputField } from "~/views/components/fields/text-field";
import { Button } from "~/views/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/views/components/ui/dialog";
import { Form } from "~/views/components/ui/form";

type DataTableFiltersModalProps = DialogProps & {
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

export const DataTableFiltersModal = (props: DataTableFiltersModalProps) => {
  const { id } = props;

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
    <Dialog open>
      <DialogContent onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Filters:</DialogTitle>
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
            </DialogHeader>
            <DialogFooter>
              <Button>
                <FaPlus /> ADD FILTER
              </Button>
              <Button onClick={onClose}>
                <MdDelete /> REMOVE ALL
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
