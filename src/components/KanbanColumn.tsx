import Link from "next/link"
import { Task, TaskStatus } from "./KanbanBoard"

interface KanbanColumnProps {
    tasks: Task[],
    cardColor: string,
    status: TaskStatus,
    children: React.ReactNode
}
export default function KanbanColumn({ tasks, cardColor, status, children }: KanbanColumnProps) {
    return (
        <div className="bg-gray rounded-2xl p-4 flex flex-col gap-4">
            <h2 className="font-bold text-[1.75rem]">
                {children}
            </h2>
            <div className="flex flex-col gap-4 h-[60vh] kanban-column-scroll">
                {tasks.filter(task => task.status === status).map((task, i) => (
                    <Link href={"/task/" + task.id} key={i} className="bg-tomato rounded-md p-6" style={{ backgroundColor: cardColor }}>
                        <h3 className="text-wrap block break-words">{task.title}</h3>
                        <p>{task.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}