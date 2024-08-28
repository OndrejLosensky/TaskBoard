import React, { useState } from 'react';
import TaskModal from '../menu/task-modal'; 

import { TbGridDots } from "react-icons/tb";
import EditTaskModal from '../editTaskModal';

interface Task {
    id: number;
    name: string;
}

interface ContainerProps {
    id: number;
    name: string;
    tasks: Task[];
    onAddTask: (containerId: number, taskName: string) => void; 
}

const Container: React.FC<ContainerProps> = ({ id, name, tasks, onAddTask }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)


    const handleAddTask = (taskName: string) => {
        onAddTask(id, taskName); 
        setModalOpen(false); 
        setIsEditTaskModalOpen(false);
    };

    return (
        <div className="bg-gray-200 px-4 py-2 rounded shadow flex flex-col">
            <h2 className="text-md font-medium text-blue-950">{name}</h2>             

            <div className="mt-4">                
                    <ul className='space-y-2'>
                        {tasks.map((task) => (
                            <li  onClick={() => setIsEditTaskModalOpen(true)}  key={task.id} className="py-2 space-y-2 bg-white w-full px-4 flex flex-row items-center justify-between rounded-md hover:cursor-grab">
                                <span>{task.name}</span>
                                <TbGridDots/>
                            </li>
                        ))}
                    </ul>                
            </div>

            <button
                onClick={() => setModalOpen(true)}
                className="mt-6 duration-200 hover:bg-gray-500/30 text-neutral-700 rounded p-2"
            >
                Přidat nový úkol
            </button>     

            {isModalOpen && (
                <TaskModal onClose={() => setModalOpen(false)} onAddTask={handleAddTask} />
            )}

            {isEditTaskModalOpen && (
                <EditTaskModal />
            )}


        </div>
    );
};

export default Container;
