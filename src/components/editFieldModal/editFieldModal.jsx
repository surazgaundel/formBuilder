import { useState, useEffect } from "react";

export default function EditFieldModal({ isOpen, onClose, field, onSave }) {
const [editedField, setEditedField] = useState(null);

useEffect(() => {
setEditedField(field);
}, [field]);

const handleSave = () => {
if (editedField) {
    onSave(editedField);
    onClose();
}
};

if (!isOpen || !editedField) return null;

return (
<div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
>
    <div className="bg-black rounded-lg shadow-lg w-full max-w-lg">
    <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 id="modal-title" className="text-xl font-semibold">
        Edit {field?.item} Field
        </h2>
        <button
        onClick={onClose}
        className="text-gray-500 hover:text-red-800 focus:outline-none rounded-full px-2 py-1"
        >
        X
        </button>
    </div>
    <div className="px-4 py-6 space-y-4">
        <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700">
            Label
        </label>
        <input
            id="label"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={editedField.label || ""}
            onChange={(e) =>
            setEditedField({ ...editedField, label: e.target.value })
            }
        />
        </div>
        <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
        </label>
        <input
            id="description"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={editedField.description || ""}
            onChange={(e) =>
            setEditedField({ ...editedField, description: e.target.value })
            }
        />
        </div>
        <div>
        <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700">
            Placeholder
        </label>
        <input
            id="placeholder"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={editedField.placeholder || ""}
            onChange={(e) =>
            setEditedField({ ...editedField, placeholder: e.target.value })
            }
        />
        </div>
        <div>
        <label htmlFor="className" className="block text-sm font-medium text-gray-700">
            Class Name
        </label>
        <input
            id="className"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={editedField.className || ""}
            onChange={(e) =>
            setEditedField({ ...editedField, className: e.target.value })
            }
        />
        </div>
        <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
        </label>
        <input
            id="name"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type={field?.type || "text"}
            value={editedField.name || ""}
            onChange={(e) =>
            setEditedField({ ...editedField, name: e.target.value })
            }
        />
        </div>
    </div>

    <div className="flex justify-end px-4 py-3 bg-gray-700">
        <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-black border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Cancel
        </button>
        <button
        onClick={handleSave}
        className="ml-3 px-4 py-2 text-sm font-medium text-black bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Save Changes
        </button>
    </div>
    </div>
</div>
);
}
