import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TaskModalProps {
    onClose: () => void;
    onAddTask: (taskName: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName.trim()) {
            onAddTask(taskName);
            setTaskName('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
            <motion.div
                ref={modalRef}
                className="bg-white p-4 rounded shadow-md min-w-96"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-lg font-semibold mb-2">Přidat nový úkol</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="border rounded p-2 w-full"
                        placeholder="Jméno úkolu..."
                    />
                    <div className="mt-4 flex justify-between">
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 duration-200 active:scale-90 text-white rounded p-2">Přidat</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default TaskModal;
