'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";

export enum TaskStatus {
    PENDING = 'pendente',
    DOING = 'realizando',
    DONE = 'concluída'
}

export enum TaskTags {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export interface Task {
    id: number,
    title: string,
    description?: string,
    status: TaskStatus
    tags?: TaskTags
}

interface KanbanBoardProps {
    tasks: Task[],
}

export default function KanbanBoard({ tasks }: Readonly<KanbanBoardProps>) {
    return (
        <div className="grid grid-cols-3 gap-6">
            <KanbanColumn cardColor="#ec221f" status={TaskStatus.PENDING} tasks={tasks}>
                Backlog
            </KanbanColumn>
            <KanbanColumn cardColor="#7678d1" status={TaskStatus.DOING} tasks={tasks}>
                Realizando
            </KanbanColumn>
            <KanbanColumn cardColor="#00a88b" status={TaskStatus.DONE} tasks={tasks}>
                Concluída
            </KanbanColumn>
        </div>
    )
}