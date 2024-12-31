
import { SetStateAction, useContext, useEffect, useState } from "react";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
import TaskData from "./TaskData";
import EditCategoryModal from "./TaskModal/EditCategoryModal";
import AddNewTaskModal from "./TaskModal/AddNewTaskModal";
import { Dropdown, Tooltip } from "flowbite-react";
import { KanbanDataContext } from "src/context/kanbancontext";
import useSWRMutation from "swr/mutation";
import { postFetcher } from "src/api/globalFetcher";


function CategoryTaskList({ id }: { id: string }) {
  const { todoCategories, deleteCategory, clearAllTasks, deleteTodo,setTodoCategories } =
    useContext(KanbanDataContext);

  const category = todoCategories.find((cat) => cat.id === id) as any;


  const [allTasks, setAllTasks] = useState(category?category.child : []);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category.name);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showContainer, setShowContainer] = useState(true);
  // const [anchorEl, setAnchorEl] = useState(false);


  // Find the category and update tasks
  useEffect(() => {
    const category = todoCategories.find((cat) => cat.id === id);
    if (category) {
      setAllTasks(category.child);
    }
  }, [todoCategories, id]);

  const [newTaskData, setNewTaskData]: any = useState({
    task: "",
    taskText: "",
    taskProperty: "",
    date: "",
    imageURL: null,
  });

  //Shows the modal for adding a new task.
  const handleShowModal = () => {
    setShowModal(true);
  };
  // Closes the modal
  const handleCloseModal = (): any => {
    setShowModal(false);
  };
  //  Shows the modal for editing a category.
  const handleShowEditCategoryModal = () => setShowEditCategoryModal(true);
  //Closes the modal for editing a category.
  const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);

  //Updates the category name
  const {trigger:updateCategoryTrigger} = useSWRMutation("/api/TodoData/updateCategory", postFetcher);

  const handleUpdateCategory = async (
    updatedName: SetStateAction<string | any>
  ) => {
    try {
      const response = await updateCategoryTrigger({
        categoryId: id,
        categoryName: updatedName,
      })
      if (response[0] === 200) {
        setNewCategoryName(updatedName);
      } else {
        throw new Error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  //Adds a new task to the category.
  const {trigger:addTaskTrigger} = useSWRMutation("/api/TodoData/addTask" , postFetcher);

  const handleAddTask = async () => {
    let counter = 0;
    function generateUniqueNumber() {
        const timestamp = Date.now(); // Current timestamp in milliseconds
        counter = (counter + 1) % 1000; // Ensures counter resets after 1000
        return `${timestamp}${counter.toString().padStart(3, '0')}`; // Example: 1694081234567001
    }
    try {
      const response = await addTaskTrigger({
        categoryId: id,
        newTaskData: {
          ...newTaskData,
          id: generateUniqueNumber(),
        },
      })
      if (response[0] === 200) {
        handleCloseModal();
        let newUpdatedValue = todoCategories.map((item) => {
          if(item.id === id){
            return {...item, child:[...item.child,{
              ...newTaskData,
              id: generateUniqueNumber(),
  
            }]}
          }else{
            return item
          }
        });
        setTodoCategories(newUpdatedValue);
        
      } else {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  // Clears all tasks from the current category.
  const handleClearAll = () => {
    clearAllTasks(id);
    setAllTasks([]);
  };
  // Deletes a specific task.
  const handleDeleteTask = (taskId: number | any) => {
    deleteTodo(taskId);
    setAllTasks((prevTasks: any[]) =>
      prevTasks.filter((task: { id: number }) => task.id !== taskId)
    );
  };
  //Handles the deletion of the current category.
  const handleDeleteClick = () => {
    setShowContainer(false);
    deleteCategory(id);
  };

  const backgroundColor = category
    ? category.name === "Todo"
      ? "bg-muted dark:bg-darkmuted"
      : category.name === "Progress"
        ? "bg-lightsecondary dark:bg-lightsecondary"
        : category.name === "Pending"
          ? "bg-lightinfo dark:bg-lightinfo"
          : category.name === "Done"
            ? "bg-lightsuccess dark:bg-lightsuccess"
            : "bg-lightprimary dark:bg-lightprimary"
    : "bg-lightprimary dark:bg-lightprimary";

  return (
    <>
      {showContainer && category && (
        <div
          className={`rounded-lg w-[255px] p-5 ${backgroundColor}`}
        >
          <div className="flex justify-between items-center">
            <h6 className="text-base">{newCategoryName}</h6>
            <div className="flex items-center gap-2">
              <div>
                {category.name === "Todo" && (
                  <>
                    <Tooltip content="Add Task">
                      <div
                        className="btn-circle-hover cursor-pointer p-0 h-7 w-7"
                        onClick={handleShowModal}
                      >
                        <TbPlus size={15} />
                      </div>
                    </Tooltip>
                    <AddNewTaskModal
                      show={showModal}
                      onHide={handleCloseModal}
                      onSave={handleAddTask}
                      newTaskData={newTaskData}
                      setNewTaskData={setNewTaskData}
                      updateTasks={() =>
                        setAllTasks([...allTasks, newTaskData])
                      }
                    />
                  </>
                )}
                <EditCategoryModal
                  showModal={showEditCategoryModal}
                  handleCloseModal={handleCloseEditCategoryModal}
                  initialCategoryName={newCategoryName}
                  handleUpdateCategory={handleUpdateCategory}
                />
              </div>

              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="btn-circle-hover cursor-pointer p-0 h-7 w-7 bg-white dark:bg-darkgray">
                    <TbDotsVertical size={15} />
                  </span>
                )}
              >
                <Dropdown.Item onClick={handleShowEditCategoryModal}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteClick}>
                  Delete
                </Dropdown.Item>
                <Dropdown.Item onClick={handleClearAll}>
                  Clear All
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            {allTasks.map((task: { id: any }, index: number) => (
              <div key={index} >
              <TaskData
                key={task.id}
                task={task}
                onDeleteTask={() => handleDeleteTask(task.id)}
                index={index}
              />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default CategoryTaskList;


