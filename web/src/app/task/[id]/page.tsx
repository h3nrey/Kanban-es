'use client'
import { Task, TaskStatus } from "@/components/KanbanBoard";
import TaskModal from "@/components/TaskModal";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function TaskDetails() {
    const id = useParams().id;
    const [task, SetTask] = useState<Task | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTask, setNewTask] = useState<Task | null>(null);
    const router = useRouter();

    useEffect(() => {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData) {
            const tasks = JSON.parse(tasksData);
            const task = tasks.find((task: Task) => task.id === Number(id));
            SetTask(task);
        }
    }, [])

    function editTask(editedTask: Task) {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData) {
            const tasks = JSON.parse(tasksData);
            const newTasks = tasks.map((task: Task) => {
                if (task.id === Number(id)) {
                    return editedTask;
                }
                return task;
            })
            window.localStorage.setItem('tasks', JSON.stringify(newTasks));
            // SetTask(newTasks.find((task: Task) => task.id === Number(id)));
            SetTask(editedTask);
            setModalOpen(false);
        }
    }

    function updateTaskStatus(status: TaskStatus) {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData) {
            const tasks = JSON.parse(tasksData);
            const newTasks = tasks.map((task: Task) => {
                if (task.id === Number(id)) {
                    return { ...task, status }
                }
                return task;
            })
            window.localStorage.setItem('tasks', JSON.stringify(newTasks));
            SetTask(newTasks.find((task: Task) => task.id === Number(id)));
        }
    }

    function deleteTask() {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData) {
            const tasks = JSON.parse(tasksData);
            const newTasks = tasks.filter((task: Task) => task.id !== Number(id));
            window.localStorage.setItem('tasks', JSON.stringify(newTasks));
            router.replace("/");
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1>{task?.title}</h1>
                <div className="flex gap-4">
                    <select name="" id="" onChange={(e) => updateTaskStatus(e.target.value as TaskStatus)}>
                        <option value="pendente">Pendente</option>
                        <option value="fazendo">Fazendo</option>
                        <option value="feito">Feito</option>
                    </select>
                    <button onClick={deleteTask} className="bg-red-500 rounded-sm">Deletar</button>
                    <button onClick={() => setModalOpen(true)}>Editar</button>
                </div>
            </div>
            <div>
                <h2>Descrição</h2>
                <p className="outline-2 outline-gray-500 p-2 rounded-md">{task?.description || 'Adicione uma descrição para sua tarefa...'}</p>
            </div>

            {modalOpen && task && (
                <TaskModal task={task} saveTaskModal={editTask} closeModal={setModalOpen} />
            )}
        </div>
    )
}