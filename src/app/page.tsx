'use client'
import KanbanBoard, { Task } from "@/components/KanbanBoard";
import TaskModal from "@/components/TaskModal";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currTasks, setCurrTasks] = useState<Task[]>([])
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [])

  function loadTasks() {
    const tasksData = window.localStorage.getItem('tasks');
    if (tasksData) {
      const parsedTasks = JSON.parse(tasksData);
      setTasks(parsedTasks);
      setCurrTasks(parsedTasks);
    }
    console.log("loading tasks");
  }

  function addTask(task: Task) {
    const tasks = window.localStorage.getItem('tasks');

    console.log(task);
    if (tasks) {
      window.localStorage.setItem('tasks', JSON.stringify([...JSON.parse(tasks), task]));
    } else {
      window.localStorage.setItem('tasks', JSON.stringify([task]));
    }

    loadTasks();
  }

  function searchTasks(text: string) {
    setSearchText(text);

    if (text) {
      setCurrTasks(tasks.filter(task => task.title.toLowerCase().includes(text.toLowerCase())));
    } else {
      setCurrTasks(tasks);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Kanban</h1>
        <div className="flex gap-4">
          <input type="text" placeholder="Buscar..." value={searchText} onChange={(e) => searchTasks(e.target.value)} className="outline-2 outline-gray p-2 rounded-sm" />
          <button
            onClick={() => setModalOpen(true)}
            className="p-2 bg-transparent rounded-sm outline-gray outline-2 hover:bg-gray cursor-pointer"
          >
            Nova Atividade
          </button>
        </div>
      </div>

      <KanbanBoard tasks={currTasks} />

      {modalOpen && (
        <TaskModal sendTaskData={addTask} canChangeStatus={true} closeModal={setModalOpen} />
      )}
    </div>
  );
}
