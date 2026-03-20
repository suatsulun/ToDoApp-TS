import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b last:border-0 gap-4">
      <div className="w-1/3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
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
          <p className="font-medium text-gray-900">{currentValue}</p>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => onSave(tempValue)}>
              Save
            </Button>
          </>
        ) : (
          <Button size="sm" variant="secondary" onClick={onEdit}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditableField;
