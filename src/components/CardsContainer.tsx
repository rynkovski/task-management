import { Flex, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Column, Task } from "../types/types";
import CardColumn from "./CardColumn";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskBox from "./TaskBox";
import { useGetColumns } from "../actions/get-columns";
import { useBoardIdContext } from "../hooks/context";
import { useGetTasks } from "../actions/get-tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../actions/update-task";
// import { updateColumns } from "../actions/update-columns";

function CardsContainer() {
  const boardId = useBoardIdContext();

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const queryClient = useQueryClient();

  const { data: columnsData } = useGetColumns(boardId);
  const { data: tasksData } = useGetTasks(boardId);

  useEffect(() => {
    setColumns(columnsData as Column[]);
    setTasks(tasksData as Task[]);
  }, [columnsData, tasksData]);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const { mutateAsync: updateTaskMutation } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // const { mutateAsync: updateColumnsMutation } = useMutation({
  //   mutationFn: updateColumns,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["columns"] });
  //   },
  // });

  useEffect(() => {
    tasks.filter((task) => {
      const newColumnId = task.data.columnId;
      const taskId = task.id;
      updateTaskMutation({ boardId, newColumnId, taskId });
    });
  }, [tasks]);

  // useEffect(() => {
  //   const newColumns = columns;
  //   updateColumnsMutation({ boardId, newColumns });
  // }, [columns]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].data.columnId = tasks[overIndex].data.columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].data.columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <Flex mt={6} display={"flex"} gap={4} overflowX={"auto"}>
        <Stack flexDirection={"row"} gap={4}>
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <CardColumn
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.data.columnId === column.id)}
              />
            ))}
          </SortableContext>
        </Stack>
      </Flex>
      {createPortal(
        <DragOverlay>
          {activeColumn ? (
            <CardColumn
              column={activeColumn}
              tasks={tasks.filter(
                (task) => task.data.columnId === activeColumn.id
              )}
            />
          ) : null}
          {activeTask ? <TaskBox task={activeTask} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export default CardsContainer;
