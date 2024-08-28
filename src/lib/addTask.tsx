import React from 'react';

interface TaskProps {
    name: string;
}

const Task: React.FC<TaskProps> = ({ name }) => {
    return (
        <div className="bg-white p-2 mb-2 border border-gray-300 rounded">
            {name}
        </div>
    );
};

export default Task;
