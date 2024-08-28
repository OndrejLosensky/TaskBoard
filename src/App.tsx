import { useState, useEffect } from 'react';
import Navigation from './components/navigation';
import ContainerModal from './components/menu/container-modal';
import Container from './components/container/container'; 
import './index.css';
import { Helmet } from 'react-helmet';

interface Task {
    id: number;
    name: string;
}

interface ContainerData {
    id: number;
    name: string;
    tasks: Task[]; 
}

function App() {
    const [containers, setContainers] = useState<ContainerData[]>([]);
    const [selectedContainer] = useState<ContainerData | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const storedContainers = localStorage.getItem('containers');
        if (storedContainers) {
            setContainers(JSON.parse(storedContainers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('containers', JSON.stringify(containers));
    }, [containers]);

    const handleAddContainer = (name: string) => {
        const newContainer = { id: Date.now(), name, tasks: [] }; 
        setContainers([...containers, newContainer]);
    };

    const handleAddTask = (containerId: number, taskName: string) => {
        const updatedContainers = containers.map(container => {
            if (container.id === containerId) {
                const newTask = { id: Date.now(), name: taskName };
                return { ...container, tasks: [...container.tasks, newTask] }; 
            }
            return container;
        });
        setContainers(updatedContainers); 
    };

    const handleUpdateContainer = (id: number, newName: string) => {
        const updatedContainers = containers.map(container =>
            container.id === id ? { ...container, name: newName } : container
        );
        setContainers(updatedContainers);
    };

    const handleDeleteContainer = (id: number) => {
        const updatedContainers = containers.filter(container => container.id !== id);
        setContainers(updatedContainers);
    };

    return (
        <main className="w-screen h-screen bg-neutral-100">
            <Helmet>
                <meta charSet="utf-8" />
                <title>TaskBoard</title>
            </Helmet>

            <Navigation onAddContainer={handleAddContainer} />

            {isModalOpen && selectedContainer && (
                <ContainerModal
                    container={selectedContainer}
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
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default App;
