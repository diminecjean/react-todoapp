import { useState } from 'react';

export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState('');
    function handleSubmit(ev) {
        ev.preventDefault();
        onAdd(taskName);
        setTaskName(""); // clear input space
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Add a task"
                value={taskName}
                onChange={ev => setTaskName(ev.target.value)} />
            <button>+</button>
        </form>
    );
}