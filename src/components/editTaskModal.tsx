import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsCardHeading } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (containerId: number, taskId: number, newName: string) => void; 
    containerId: number;
    initialName: string;
    taskId: number; 
    onDelete: () => void;
    parentContainerName: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
    isOpen,
    onClose,
    onUpdate,
    containerId,
    initialName,
    taskId,
    onDelete,
    parentContainerName,
}) => {
    const [name, setName] = useState(initialName);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        if (isOpen) {
            inputRef.current?.focus();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (name.trim()) {
            onUpdate(containerId, taskId, name);
            setName(initialName); 
            onClose();
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
                <div className="flex flex-row justify-between items-start mb-4">
                    <div className="flex flex-row items-start gap-x-2">
                        <MdOutlineDashboardCustomize className="w-7 h-7" />
                        <div className="flex flex-col -mt-1">
                            <h2 className="text-lg font-semibold">Editovat úkol</h2>
                            <p> V listu: {parentContainerName} </p>
                        </div>
                    </div>
                    <Button
                        className="px-2 bg-red-500 text-white hover:bg-red-600 duration-200"
                        onClick={onDelete}
                    >
                        <FaRegTrashAlt className="w-5 h-5" />
                    </Button>
                </div>
                <p className="font-medium py-2 flex flex-row items-center gap-x-2">
                    <BsCardHeading className="w-5 h-5" /> <span>Změnit název</span>
                </p>
                <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    placeholder="Nové jméno úkolu..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef} 
                    autoFocus
                />
                <div className="flex justify-end gap-x-2">
                    <button
                        className="text-red-500 w-1/2 hover:text-red-600 bg-transparent border border-transparent duration-200 hover:border-red-500 rounded px-4 py-2"
                        onClick={onClose}
                    >
                        Zrušit
                    </button>
                    <button
                        className="bg-violet-500 w-1/2 hover:bg-violet-600 text-white rounded px-4 py-2"
                        onClick={handleSubmit}
                    >
                        Změnit
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditTaskModal;
