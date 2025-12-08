import { DialogProps } from "@radix-ui/react-dialog";
import { useModalsStore } from "~/store/client/modals-store";
import { Button } from "~/views/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/views/components/ui/dialog";

type DataTableFiltersModalProps = DialogProps & {
  id: string;
};

export const DataTableFiltersModal = (props: DataTableFiltersModalProps) => {
  const { id } = props;

  const hideModalById = useModalsStore((state) => state.hideModalById);
  const onClose = () => hideModalById(id);

  return (
    <Dialog open>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>ffwefwef</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
