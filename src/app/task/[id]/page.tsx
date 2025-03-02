'use client'
import Button from "@/components/Button";
import { Task, TaskStatus } from "@/components/KanbanBoard";
import TaskModal from "@/components/TaskModal";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function TaskDetails() {
    const id = useParams().id;
    const [task, SetTask] = useState<Task | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currStatus, setCurrStatus] = useState(TaskStatus.PENDING);
    const router = useRouter();

    useEffect(() => {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData) {
            const tasks = JSON.parse(tasksData);
            const task = tasks.find((task: Task) => task.id === Number(id));
            setCurrStatus(task.status);
            SetTask(task);
        }
    }, [])


    function editTask(editedTask: Task) {
        const tasksData = window.localStorage.getItem('tasks');
        if (tasksData && task) {
            const tasks = JSON.parse(tasksData);

            const treatedTask = {
                ...task,
                title: editedTask.title != '' ? editedTask.title : task.title,
                description: editedTask.description != '' ? editedTask.description : task.description
            }

            const newTasks = tasks.map((t: Task) => {
                if (t.id === Number(id)) return treatedTask;
                return t;
            })

            window.localStorage.setItem('tasks', JSON.stringify(newTasks));
            SetTask(treatedTask);
            setModalOpen(false);
        }
    }

    function updateTaskStatus(status: TaskStatus) {
        setCurrStatus(status);
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
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <Button color="#262626" clickCallback={() => router.back()}>Voltar</Button>
                    <h1 className="font-bold text-4xl">{task?.title}</h1>

                </div>
                <div className="flex gap-4">
                    <select name="" id="" value={currStatus} onChange={(e) => updateTaskStatus(e.target.value as TaskStatus)} className="rounded-sm outline-2 px-2 outline-gray w-3xs cursor-pointer">
                        <option className="bg-gray cursor-pointer" value={TaskStatus.PENDING}>Pendente</option>
                        <option className="bg-gray cursor-pointer" value={TaskStatus.DOING}>Realilzando</option>
                        <option className="bg-gray cursor-pointer" value={TaskStatus.DONE}>Concluída</option>
                    </select>
                    <Button color="#ec221f" textColor="#ec221f" clickCallback={deleteTask} >Deletar</Button>
                    <Button color="#262626" clickCallback={() => setModalOpen(true)} >Editar</Button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2>Descrição</h2>
                <p className="outline-2 outline-gray-500 p-2 rounded-md">{task?.description || 'Adicione uma descrição para sua tarefa...'}</p>
            </div>

            {modalOpen && task && (
                <TaskModal sendTaskData={editTask} closeModal={setModalOpen} />
            )}
        </div>
    )
}