import { Button } from "~/views/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/views/components/ui/dialog";

type DataTableFiltersModalProps = React.JSX.IntrinsicElements["div"] & {};

export const DataTableFiltersModal = (props: DataTableFiltersModalProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
        <DialogFooter>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
