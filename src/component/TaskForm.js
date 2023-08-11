import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState('');
    const [color, setColor] = useState('none');

    // const [show, setShow] = useState(false)

    function handleSubmit(ev) {
        ev.preventDefault();
        onAdd(taskName, color);
        setTaskName(""); // clear input space
        setColor("none");
    }

    return (
        <form className={'taskform ' +
            (color === "red" ? "red" :
                color === "yellow" ? "yellow" :
                    color === "green" ? "green" : "none")}
            onSubmit={handleSubmit}>
            <input className="taskform" type="text"
                placeholder="Add a task 📝 "
                value={taskName}
                onChange={
                    ev => setTaskName(ev.target.value)} />
            <Dropdown>
                <Dropdown.Toggle className='dropdown-toggle'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" /></svg>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown-menu'>
                    <Dropdown.Item className='dropdown-item' onClick={() => setColor("red")}>🔴</Dropdown.Item>
                    <Dropdown.Item className='dropdown-item' onClick={() => setColor("yellow")}>🟡</Dropdown.Item>
                    <Dropdown.Item className='dropdown-item' onClick={() => setColor("green")}>🟢</Dropdown.Item>
                    <Dropdown.Item className='dropdown-item reset' onClick={() => setColor("none")}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" /></svg>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <button className='add'>+</button>
        </form >
    );
}