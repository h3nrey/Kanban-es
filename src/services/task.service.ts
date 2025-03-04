import { Task } from "@/components/KanbanBoard";
import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export async function createTask(task: Task) {
    const newTask = await axios.post(`${baseUrl}/tarefas`, task);

    return newTask.data;
}
export async function getTasks(searchTerm: string = '') {
    const tasks = await axios.get(`${baseUrl}/tarefas?search=${searchTerm}`);

    return tasks.data
}

export async function searchTasks(searchTerm: string) {
    const tasks = await axios.get(`${baseUrl}/tarefas?search=${searchTerm}`);

    return tasks.data
}


export async function getTask(id: number) {
    const task = await axios.get(`${baseUrl}/tarefas/${id}`);

    return task.data
}

export async function updateTaskRecord(task: Task) {
    const updatedTask = await axios.put(`${baseUrl}/tarefas/${task.id}`, task);

    return updatedTask.data;
}

export async function deleteTaskRecord(id: number) {
    const deletedTask = await axios.delete(`${baseUrl}/tarefas/${id}`);

    return deletedTask.data;
}