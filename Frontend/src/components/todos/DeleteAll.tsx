import type { DeleteAllProps } from "@/types/todos";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash, Trash2Icon } from "lucide-react";

const DeleteAll = ({ handleDeleteAll }: DeleteAllProps): React.JSX.Element => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex-initial border-1 border-red-600 rounded-full ml-2"
          variant="destructive"
        >
          <Trash />
          Delete All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete All Todos?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete all your
            Todos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex-initial border-1 border-red-600 rounded-full ml-2"
            variant="destructive"
            onClick={handleDeleteAll}
          >
            Delete All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteAll;
