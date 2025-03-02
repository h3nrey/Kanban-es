import { useState } from "react";
import { Task, TaskStatus } from "./KanbanBoard";
import Button from "./Button";

interface TaskModalProps {
    taskId?: number;
    sendTaskData: (task: Task) => void;
    canChangeStatus?: boolean;
    closeModal: (isOpen: boolean) => void;
}
export default function TaskModal({ taskId, sendTaskData, closeModal, canChangeStatus }: TaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(TaskStatus.PENDING);

    function saveTask() {
        sendTaskData({
            id: taskId ?? Math.floor(Math.random() * 1000),
            title: title,
            status: status,
            description: description,
        })
        closeModal(false);
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray p-4 rounded-md flex flex-col gap-6">
                <h2 className="font-semibold text-2xl">Editar Tarefa</h2>
                <div className="flex flex-col gap-4">
                    <input
                        className="p-2 outline-2 outline-gray-400 rounded-sm"
                        type="text"
                        placeholder="Título" onChange={(e) => setTitle(e.target.value)} />

                    {canChangeStatus && (
                        <select name="" id="" className="bg-gray p-2 rounded-sm" onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                            <option value={TaskStatus.PENDING} className="p-2">{TaskStatus.PENDING}</option>
                            <option value={TaskStatus.DOING} className="p-2">{TaskStatus.DOING}</option>
                            <option value={TaskStatus.DONE} className="p-2">{TaskStatus.DONE}</option>
                        </select>
                    )}

                    <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={10}
                        placeholder="Descrição"
                        onChange={(e) => setDescription(e.target.value)}
                        className="max-h-48 p-2 pt-1 outline-2 outline-gray-400 rounded-sm min-h-20"
                    >
                    </textarea>

                </div>
                <div className="flex justify-between">
                    <Button color="#000" clickCallback={() => closeModal(false)}>Cancelar</Button>
                    <Button color="#000" clickCallback={() => saveTask()}>Salvar</Button>
                </div>
            </div>
        </div>
    )
}