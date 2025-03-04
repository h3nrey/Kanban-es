'use client'
import KanbanBoard, { Task } from "@/components/KanbanBoard";
import TaskModal from "@/components/TaskModal";
import { createTask, getTasks } from "@/services/task.service";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currTasks, setCurrTasks] = useState<Task[]>([])
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  let debounceTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    loadTasks();
  }, [])

  async function loadTasks() {
    const tasksData = await getTasks();
    console.log(tasksData);

    setTasks(tasksData);
    setCurrTasks(tasksData);
  }

  async function addTask(task: Task) {
    await createTask(task);
    loadTasks();
  }

  async function searchTasks(text: string) {
    setSearchText(text);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(async () => {
      const tasksData = await getTasks(text);
      console.log(tasksData);

      setTasks(tasksData);
      setCurrTasks(tasksData);
    }, 500);
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
