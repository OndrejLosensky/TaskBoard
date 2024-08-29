import React, { useState, useRef, useEffect } from 'react';
import { TbGridDots } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import EditContainerModal from '../menu/editContainerModal';
import EditTaskModal from '../editTaskModal';
import TaskModal from '../menu/task-modal'; 

interface Task {
    id: number;
    name: string;
    isDone: boolean;
}

interface ContainerProps {
    id: number;
    name: string;
    tasks: Task[];
    onAddTask: (containerId: number, taskName: string) => void;
    onDeleteContainer: (containerId: number) => void;
    onUpdateContainer: (containerId: number, newName: string) => void;
    onUpdateTask: (containerId: number, taskId: number, newName: string) => void;
    onDeleteTask: (containerId: number, taskId: number) => void;
    onToggleTaskCompletion: (containerId: number, taskId: number, isDone: boolean) => void;
}

const Container: React.FC<ContainerProps> = ({
    id,
    name,
    tasks,
    onAddTask,
    onDeleteContainer,
    onUpdateContainer,
    onUpdateTask,
    onDeleteTask,
    onToggleTaskCompletion
}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDelete = () => {
        onDeleteContainer(id);
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
        setDropdownOpen(false);
    };

    const openEditTaskModal = (task: Task) => {
        setSelectedTask(task);
        setIsEditTaskModalOpen(true);
    };

    const openTaskModal = () => {
        setIsTaskModalOpen(true);
    };

    const handleAddTask = (taskName: string) => {
        onAddTask(id, taskName);
        setIsTaskModalOpen(false); 
    };

    const handleDeleteTask = (taskId: number) => {
        onDeleteTask(id, taskId); 
        setSelectedTask(null); 
        setIsEditTaskModalOpen(false); 
    };

    const handleToggleTaskCompletion = (taskId: number, isDone: boolean) => {
        onToggleTaskCompletion(id, taskId, isDone); 
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className={`bg-neutral-100 rounded shadow-md border border-black/20 hover:border-black/30 duration-300 flex flex-col h-full`}>
            <div className={`flex flex-row justify-between items-center py-2 px-4`}>
                <h2 className={`text-md font-medium`}>{name}</h2>
                <div className="relative" ref={dropdownRef}>                    
                    <HiDotsVertical onClick={toggleDropdown} className='w-4 h-4 cursor-pointer opacity-90' />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-black/40 rounded-lg shadow-lg z-10">
                            <button
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-t-lg"
                                onClick={handleEdit}
                            >
                                Upravit
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                                onClick={handleDelete}
                            >
                                Smazat
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-grow mt-4 flex flex-col px-4 py-2">
                <ul className='space-y-2 overflow-y-auto flex-grow'>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="py-2 bg-white w-full px-4 shadow-sm border border-black/20 flex flex-row items-center justify-between rounded-md hover:cursor-grab"
                        >
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={() => handleToggleTaskCompletion(task.id, !task.isDone)} 
                                    className="rounded-full accent-blue-500 cursor-pointer"
                                />
                                <span className={`flex-grow ${task.isDone ? 'line-through text-gray-500' : ''}`}>
                                    {task.name}
                                </span>
                            </label>
                            <TbGridDots className='opacity-50' onClick={() => openEditTaskModal(task)} />
                        </li>
                    ))}
                </ul>
                <button
                    onClick={openTaskModal}
                    className="mt-2 duration-200 hover:bg-gray-500/30 text-neutral-700 rounded p-2"
                >
                    Přidat nový úkol
                </button>
            </div>

            {/* Edit Container Modal */}
            <EditContainerModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={onUpdateContainer}
                containerId={id}
                initialName={name}
            />

            {/* Edit Task Modal */}
            {selectedTask && (
                <EditTaskModal
                    isOpen={isEditTaskModalOpen}
                    onClose={() => setIsEditTaskModalOpen(false)}
                    onUpdate={(containerId, taskId, newName) => onUpdateTask(containerId, taskId, newName)} 
                    containerId={id}
                    initialName={selectedTask.name} 
                    taskId={selectedTask.id} 
                    onDelete={() => handleDeleteTask(selectedTask.id)} 
                    parentContainerName={name}
                />
            )}

            {/* Task Modal for adding new tasks */}
            {isTaskModalOpen && (
                <TaskModal
                    onClose={() => setIsTaskModalOpen(false)}
                    onAddTask={handleAddTask}
                />
            )}
        </div>
    );
};

export default Container;
