import Checkbox from "./Checkbox";
import { useState } from 'react';

export default function Task({ name, done }) {
    // const [editMode, setEditMode] = useState(false);
    return (
        <div className="task">
            <Checkbox defaultChecked={!done} />
            <span>{name}</span>
        </div>
    );
}