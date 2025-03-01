'use client'
import KanbanBoard, { TaskStatus } from "@/components/KanbanBoard";
import Image from "next/image";

export default function Home() {
  function addTask() {
    const tasks = window.localStorage.getItem('tasks');

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title: 'Nova Atividade',
      status: TaskStatus.PENDING
    }

    if (tasks) {
      window.localStorage.setItem('tasks', JSON.stringify([...JSON.parse(tasks), newTask]));
    } else {
      window.localStorage.setItem('tasks', JSON.stringify([newTask]));
    }

    window.dispatchEvent(new Event('tasksUpdated'));
  }
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Kanban</h1>
        <div className="flex gap-2">
          <input type="text" placeholder="Buscar..." />
          <button onClick={addTask}>Nova Atividade</button>
        </div>
      </div>

      <KanbanBoard />
    </div>
  );
}
