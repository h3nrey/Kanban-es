'use client'
import Button from "@/components/Button";
import { Task, TaskStatus } from "@/components/KanbanBoard";
import TaskModal from "@/components/TaskModal";
import { deleteTaskRecord, getTask, updateTaskRecord } from "@/services/task.service";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function TaskDetails() {
    const id = useParams().id;
    const [task, SetTask] = useState<Task | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currStatus, setCurrStatus] = useState(TaskStatus.PENDING);
    const router = useRouter();

    useEffect(() => {
        const taskData = getTask(Number(id));

        taskData.then((task) => {
            SetTask(task);
            setCurrStatus(task.status);
        })
    }, [id])


    async function editTask(editedTask: Task) {
        console.log(editedTask);
        const taskData = await updateTaskRecord(editedTask);

        SetTask(taskData);
        setModalOpen(false);
    }

    async function updateTaskStatus(status: TaskStatus) {
        if (!task) return;
        setCurrStatus(status);
        await updateTaskRecord({ ...task, status });
    }

    async function deleteTask() {
        await deleteTaskRecord(Number(id));
        router.replace("/");
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
                <TaskModal taskId={Number(id)} sendTaskData={editTask} closeModal={setModalOpen} />
            )}
        </div>
    )
}