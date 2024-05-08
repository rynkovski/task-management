import { Button, Flex, Stack } from "@chakra-ui/react";
import { PlusSquareIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types/types";
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

function generateId() {
  return Math.floor(Math.random() * 1000);
}

function createNewColumn(
  columns: Column[],
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) {
  const columnToAdd: Column = {
    id: generateId(),
    title: `Column ${columns.length + 1}`,
  };
  setColumns([...columns, columnToAdd]);
}

function CardsContainer() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function addTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);
    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  }

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

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;

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
        <Stack alignItems={"center"} flexDirection={"row"} gap={4}>
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <CardColumn
                key={column.id}
                column={column}
                deleteColumn={deleteColumn}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                addTask={addTask}
              />
            ))}
          </SortableContext>
        </Stack>
        <Button onClick={() => createNewColumn(columns, setColumns)}>
          <PlusSquareIcon />
        </Button>
      </Flex>
      {createPortal(
        <DragOverlay>
          {activeColumn ? (
            <CardColumn
              column={activeColumn}
              deleteColumn={deleteColumn}
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              addTask={addTask}
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
