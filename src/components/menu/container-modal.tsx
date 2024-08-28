import React, { useState } from 'react';

interface ContainerModalProps {
    container: { id: number; name: string };
    onClose: () => void;
    onUpdate: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
}

const ContainerModal: React.FC<ContainerModalProps> = ({
    container,
    onClose,
    onUpdate,
    onDelete,
}) => {
    const [name, setName] = useState(container.name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(container.id, name);
        onClose(); 
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold">Editovat list</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full mt-2"
                    />
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onDelete(container.id);
                                onClose(); 
                            }}
                            className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
                        >
                            Smazat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContainerModal;
