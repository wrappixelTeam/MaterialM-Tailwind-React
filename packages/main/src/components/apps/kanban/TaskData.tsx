
import { useContext, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { Icon } from "@iconify/react";
import EditTaskModal from "./TaskModal/EditTaskModal";
import React from 'react';
import { Badge, Dropdown } from "flowbite-react";

import { Draggable } from "@hello-pangea/dnd";
import { KanbanDataContext } from "src/context/kanbancontext";
import useSWRMutation from "swr/mutation";
import { putFetcher } from "src/api/globalFetcher";
interface TaskDataProps {
  task: { id: any };
  onDeleteTask: () => void;
  index: number;
}
const TaskData: React.FC<TaskDataProps> = ({
  task,
  onDeleteTask,
  index,
}: any) => {
  const { setError } = useContext(KanbanDataContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  // const [anchorEl, setAnchorEl] = useState(false);

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  // const handleMenuClick = (event: any) => setAnchorEl(!anchorEl);

  const handleDeleteClick = () => onDeleteTask(task.id);
  
  const {trigger:saveEditedTaskTrigger} = useSWRMutation("/api/TodoData/editTask", putFetcher);

  const handleSaveEditedTask = async (editedTaskData: { id: any }) => {
    try {
      const response = await saveEditedTaskTrigger({
        taskId: editedTaskData.id,
        newData: editedTaskData,
      })
      if (response[0] === 200) {
        setEditedTask(editedTaskData);
      } else {
        throw new Error("Failed to edit task");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const formatDate = (selectedDate: string | number | Date) => {
    const dateObj = new Date(selectedDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  const backgroundColor =
    editedTask.taskProperty === "Design"
      ? "success"
      : editedTask.taskProperty === "Development"
        ? "warning"
        : editedTask.taskProperty === "Mobile"
          ? "primary"
          : editedTask.taskProperty === "UX Stage"
            ? "warning"
            : editedTask.taskProperty === "Research"
              ? "secondary"
              : editedTask.taskProperty === "Data Science"
                ? "error"
                : editedTask.taskProperty === "Branding"
                  ? "primary"
                  : "#fff";

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white dark:bg-darkgray rounded-md dark:shadow-dark-md shadow-md"
        >
          <div className="flex gap-2 justify-between items-center p-3">
            <h5 className="text-sm line-clamp-2">{editedTask.task}</h5>

            <div>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="btn-circle-hover cursor-pointer p-0 h-6 w-6 ">
                    <TbDotsVertical size={14} />
                  </span>
                )}
              >
                <Dropdown.Item
                  onClick={handleShowEditModal}
                  className="flex gap-2 items-center"
                >
                  <Icon icon="solar:pen-new-square-broken" height={15} />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleDeleteClick}
                  className="flex gap-2 items-center"
                >
                  <Icon
                    icon="solar:trash-bin-minimalistic-outline"
                    height={15}
                  />
                  Delete
                </Dropdown.Item>
              </Dropdown>
              <EditTaskModal
                show={showEditModal}
                onHide={handleCloseEditModal}
                task={task}
                editedTask={editedTask}
                onSave={handleSaveEditedTask}
              />
            </div>
          </div>
          <div>
            {editedTask.taskImage && (
              <img
                src={editedTask.taskImage}
                alt="Task Image"
                className="w-full"
              />
            )}
          </div>
          {editedTask.taskText && (
            <p className="text-darklink dark:text-bodytext text-sm px-3 line-clamp-3">
              {editedTask.taskText}
            </p>
          )}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2 ">
              <Icon icon="solar:calendar-linear" height={15} />
              <span className="text-xs text-darklink dark:text-bodytext leading-[normal]">
                {formatDate(editedTask.date)}
              </span>
            </div>
            <div>
              <Badge size={"xs"} color={`${backgroundColor}`}>
                {editedTask.taskProperty}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default TaskData;