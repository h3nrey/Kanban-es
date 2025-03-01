import { useState } from "react";
import { Task } from "./KanbanBoard";

interface TaskModalProps {
    task: Task;
    saveTaskModal: (task: Task) => void;
    closeModal: (isOpen: boolean) => void;
}
export default function TaskModal({ task, saveTaskModal, closeModal }: TaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function saveTask() {
        saveTaskModal({ id: task.id, title, description, status: task.status });
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-600 p-4 rounded-md">
                <h2>Editar Tarefa</h2>
                <div className="flex flex-col gap-2">
                    <input type="text" placeholder="Título" onChange={(e) => setTitle(e.target.value)} />
                    <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={10}
                        placeholder="Descrição"
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>

                </div>
                <div className="flex justify-between">
                    <button onClick={() => closeModal(false)}>Cancelar</button>
                    <button className="bg-gray-900 text-white" onClick={() => saveTask()}>Salvar</button>
                </div>
            </div>
        </div>
    )
}