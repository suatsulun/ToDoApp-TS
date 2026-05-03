import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";

interface EditableFieldProps {
  label: string;
  currentValue: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (newValue: string) => void;
}

const EditableField = ({
  label,
  currentValue,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}: EditableFieldProps) => {
  const [tempValue, setTempValue] = useState(currentValue);

  useEffect(() => {
    if (!isEditing) {
      setTempValue(currentValue);
    }
  }, [isEditing, currentValue]);

  return (
    <div className="flex flex-col justify-between gap-3 border-b border-border/60 py-4 last:border-0 md:flex-row md:items-center md:gap-4">
      <div className="md:w-1/3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>

      <div className="flex-1">
        {isEditing ? (
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="max-w-md"
            autoFocus
          />
        ) : (
          <p className="font-medium">{currentValue}</p>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={() => onSave(tempValue)}>
              <Check className="mr-1 h-4 w-4" />
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditableField;
