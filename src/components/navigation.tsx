import { useState } from 'react';
import Modal from './modal';
import { Button } from "../../components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";

interface NavigationProps {
    onAddContainer: (name: string) => void;
}

export default function Navigation({ onAddContainer }: NavigationProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddNew = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateContainer = (name: string) => {
        onAddContainer(name);
        handleCloseModal();     
    };

    return (
        <div className="w-screen ">
            <div className="mx-auto w-4/5 py-6 border-b border-black/10 flex flex-row items-center justify-between">
                <h1 className="text-3xl font-semibold flex flex-row items-center gap-x-2"> <img src="/logo.svg" className='w-8 h-8'/> <span>TaskBoard</span> </h1>
                <Button onClick={handleAddNew} className='bg-rose-500 hover:bg-rose-600 flex flex-row items-center gap-x-2 active:scale-90 duration-200'>
                    <IoIosAddCircleOutline className='w-5 h-5'/>
                    <span>Přidat nový</span>
                </Button>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onCreate={handleCreateContainer}
            />
        </div>
    );
}
