import Checkbox from "./Checkbox";
import { useState } from 'react';

export default function Task({ name, done, onToggle }) {
    return (
        <div className="task">
            <Checkbox checked={done} onClick={() => onToggle(!done)} />
            <span>{name}</span>
        </div>
    );
}