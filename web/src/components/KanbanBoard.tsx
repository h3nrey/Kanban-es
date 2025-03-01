'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export enum TaskStatus {
    PENDING = 'pendente',
    DOING = 'fazendo',
    DONE = 'feito'
}
export interface Task {
    id: number,
    title: string,
    description?: string,
    status: 'pendente' | 'fazendo' | 'feito'
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        window.addEventListener('tasksUpdated', loadTasks);
        loadTasks();
    }, [])

    function loadTasks() {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData) {
            setTasks(JSON.parse(tasksData));
        }
        console.log("loading tasks");
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            <div>
                <h2>Pendente</h2>
                <div className="flex flex-col gap-4">
                    {tasks.filter(task => task.status === TaskStatus.PENDING).map((task, i) => (
                        <Link href={"/task/" + task.id} key={i}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <h2>Pendente</h2>
                <div className="flex flex-col gap-4">
                    {tasks.filter(task => task.status === TaskStatus.DOING).map((task, i) => (
                        <Link href={"/task/" + task.id} key={i}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <h2>Pendente</h2>
                <div className="flex flex-col gap-4">
                    {tasks.filter(task => task.status === TaskStatus.DONE).map((task, i) => (
                        <Link href={"/task/" + task.id} key={i}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}