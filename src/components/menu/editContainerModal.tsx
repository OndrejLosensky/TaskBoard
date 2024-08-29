import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface EditContainerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: number, newName: string) => void;
    containerId: number;
    initialName: string;
}

const EditContainerModal: React.FC<EditContainerModalProps> = ({
    isOpen,
    onClose,
    onUpdate,
    containerId,
    initialName,
}) => {
    const [name, setName] = useState(initialName);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            setName(initialName); // Set name to initialName when the modal opens
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, initialName]); // Add initialName to dependencies

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (name.trim()) {
            onUpdate(containerId, name); // Call the onUpdate function with the new name
            onClose(); // Close the modal
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e); // Call handleSubmit when Enter is pressed
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <motion.div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg min-w-[500px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Edit název listu</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full rounded mb-4"
                        placeholder="Nový název listu"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <div className="flex justify-end gap-x-2">
                        <button
                            className="w-1/2 text-red-500 hover:text-red-600 bg-transparent border border-transparent duration-200 hover:border-red-500 rounded px-4 py-2"
                            onClick={onClose}
                        >
                            Zrušit
                        </button>
                        <button
                            type="submit" // Make this a submit button to trigger form submission
                            className="w-1/2 bg-violet-500 hover:bg-violet-600 text-white rounded px-4 py-2"
                        >
                            Upravit
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditContainerModal;
