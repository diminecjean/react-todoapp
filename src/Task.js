import Checkbox from "./Checkbox";
import { useState } from "react";

export default function Task({ name, done, onToggle, onTrash, onRename }) {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className={'task ' + (done ? 'done' : '')}>
            <Checkbox checked={done} onClick={() => onToggle(!done)} />
            {!editMode && (
                <div className="task-name" onClick={() => setEditMode(prev => !prev)}>
                    <span>{name}</span>
                </div>
            )}
            {editMode && (
                <form onSubmit={ev => { ev.preventDefault(); setEditMode(false); }}>
                    <input type="text" value={name}
                        onChange={ev => onRename(ev.target.value)} />
                </form>
            )}
            <button className="trash" onClick={onTrash}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
            </button>

        </div>
    );
}