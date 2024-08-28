import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSubmit = () => {
        if (name.trim()) {
            onCreate(name);
            setName('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Vytvořit nový blok</h2>
                <input 
                    type="text" 
                    className="border border-gray-300 p-2 w-full rounded mb-4" 
                    placeholder="Jméno listu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex justify-end gap-x-2">
                    <button 
                        className="text-red-500 hover:text-red-600 bg-transparent border border-transparent hover:border-red-500 rounded px-4 py-2"
                        onClick={onClose}
                    >
                        Zrušit
                    </button>
                    <button 
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2"
                        onClick={handleSubmit}
                    >
                        Vytvořit
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
