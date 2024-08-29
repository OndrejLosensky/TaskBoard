import { useState, useEffect } from 'react';
import Navigation from './components/navigation';
import ContainerModal from './components/menu/container-modal';
import Container from './components/container/container'; 
import './index.css';
import { Helmet } from 'react-helmet';

interface Task {
    id: number;
    name: string;
    isDone: boolean; 
}

interface ContainerData {
    id: number;
    name: string;
    tasks: Task[]; 
}

function App() {
    const [containers, setContainers] = useState<ContainerData[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContainer] = useState<ContainerData | null>(null);

    useEffect(() => {
        const storedContainers = localStorage.getItem('containers');
        if (storedContainers) {
            try {
                const parsedContainers = JSON.parse(storedContainers);
                console.log("Loaded containers from local storage:", parsedContainers);
                setContainers(parsedContainers);
            } catch (error) {
                console.error('Failed to parse stored containers:', error);
                setContainers([]); 
            }
        } else {
            console.log("No containers found in local storage.");
        }
    }, []);
   
    useEffect(() => {
        localStorage.setItem('containers', JSON.stringify(containers));
        console.log("Saved containers to local storage:", containers);
    }, [containers]);

    const handleAddContainer = (name: string) => {
        const newContainer: ContainerData = { id: Date.now(), name, tasks: [] }; 
        setContainers(prev => [...prev, newContainer]); 
    };

    const handleAddTask = (containerId: number, taskName: string) => {
        const newTask: Task = { id: Date.now(), name: taskName, isDone: false }; // Set isDone to false
        setContainers((prev) =>
            prev.map(container =>
                container.id === containerId
                    ? { ...container, tasks: [...container.tasks, newTask] }
                    : container
            )
        );
    };

    const handleUpdateContainer = (id: number, newName: string) => {
        setContainers((prev) =>
            prev.map(container =>
                container.id === id ? { ...container, name: newName } : container
            )
        );
    };

    const handleDeleteContainer = (id: number) => {
        setContainers((prev) => prev.filter(container => container.id !== id));
    };

    const handleDeleteTask = (containerId: number, taskId: number) => {
        setContainers((prev) =>
            prev.map(container => {
                if (container.id === containerId) {
                    const updatedTasks = container.tasks.filter(task => task.id !== taskId);
                    return { ...container, tasks: updatedTasks };
                }
                return container;
            })
        );
    };

    const handleToggleTaskCompletion = (containerId: number, taskId: number, isDone: boolean) => {
        setContainers(prev =>
            prev.map(container => {
                if (container.id === containerId) {
                    const updatedTasks = container.tasks.map(task =>
                        task.id === taskId ? { ...task, isDone } : task
                    );
                    return { ...container, tasks: updatedTasks };
                }
                return container;
            })
        );
    };

    return (
        <main className="w-screen h-screen bg-neutral-100">
            <Helmet>
                <meta charSet="utf-8" />
                <title>TaskBoard</title>
                <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
            </Helmet>

            <Navigation onAddContainer={handleAddContainer} />

            {isModalOpen && (
                <ContainerModal
                    container={modalContainer || { id: 0, name: '', tasks: [] }}
                    onClose={() => setModalOpen(false)}
                    onUpdate={handleUpdateContainer}
                    onDelete={handleDeleteContainer}
                />
            )}

            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 mx-auto">
                    {containers.map(container => (
                        <Container
                            key={container.id}
                            id={container.id}
                            name={container.name}
                            tasks={container.tasks}
                            onAddTask={handleAddTask}
                            onDeleteContainer={handleDeleteContainer}
                            onUpdateContainer={handleUpdateContainer}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={(containerId, taskId, newName) => {
                                setContainers(prev => 
                                    prev.map(container => {
                                        if (container.id === containerId) {
                                            const updatedTasks = container.tasks.map(task => 
                                                task.id === taskId ? { ...task, name: newName } : task
                                            );
                                            return { ...container, tasks: updatedTasks };
                                        }
                                        return container;
                                    })
                                );
                            }}
                            onToggleTaskCompletion={handleToggleTaskCompletion} 
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default App;
