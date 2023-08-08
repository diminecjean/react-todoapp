'use client';

import { Progress } from 'flowbite-react';

export default function WithLabels(percentage) {
    return (
        <Progress
            progress={percentage}
            size="lg"
            textLabel="Flowbite"
        />
    )
}