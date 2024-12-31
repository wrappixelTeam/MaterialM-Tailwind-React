


import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { TodoCategory } from '../../types/apps/kanban';
import useSWRMutation from 'swr/mutation';
import { deleteFetcher, getFetcher, postFetcher } from 'src/api/globalFetcher';
import useSWR from 'swr';
import { http, HttpResponse } from 'msw';
import KanbanData from 'src/api/kanban/KanbanData';


export const Kanbanhandlers = [

    // Mock API endpoint to fetch TodoData
    http.get('/api/TodoData', () => {
      return HttpResponse.json([200,KanbanData])
    }),
  
    // Mock API endpoint to delete a category
    http.delete('/api/TodoData',async ({request}) => {
      try{
        const { id } = await request.json() as {id:number};
        const updatedTodoData = KanbanData.filter((category) => category.id !== id);
        return HttpResponse.json([200, updatedTodoData]);
      }catch(error){
        return HttpResponse.json([500, "Internal server error"])
      }
    }),
  
   // Mock API endpoint to clear all tasks from a category
   http.delete('/api/TodoData/clearTasks',async ({request}) => {
    try{
      const { categoryId } = await request.json() as {categoryId:number};
      const updatedTodoData = KanbanData.map((category) => {
        if (category.id === categoryId) {
          return { ...category, child: [] };
        }
        return category;
      });
      return HttpResponse.json([200, updatedTodoData]);
    }catch(error){
      return HttpResponse.json([500, "Internal server error"])
    }
  }),
  
  // Mock API endpoint to add a new task
   http.post('/api/TodoData/addTask', async ({request}) => {
    try{
      const { categoryId, newTaskData } = await request.json() as {categoryId : number, newTaskData : any};
      const updatedTodoData = KanbanData.map((category) => {
        if (category.id === categoryId) {
          return { ...category, child: [...category.child, newTaskData] };
        }
        return category;
      });
      return HttpResponse.json([200, updatedTodoData]);
    }catch(error){
      return HttpResponse.json([500, "Internal server error"])
    }
   }),
  
   // Mock API endpoint to add a new category
   http.post('/api/TodoData/addCategory', async ({request}) => {
    try{
      const { categoryName } = await request.json() as { categoryName:string};
      const newCategory = {
        id: Math.random(),
        name: categoryName,
        child: [],
      };
      KanbanData.push(newCategory);
      return HttpResponse.json([200, newCategory]);
    }catch(error){
      return HttpResponse.json([500, "Internal server error"])
    }
   }),
  
   // Mock API endpoint to update the name of a category
   http.post('/api/TodoData/updateCategory', async ({request}) => {
     try{
      const { categoryId, categoryName } = await request.json() as { categoryId : number, categoryName: string };
      const updatedTodoData = KanbanData.map((category) => {
        if (category.id === categoryId) {
          return { ...category, name: categoryName };
        }
        return category;
      });
      return HttpResponse.json([200, updatedTodoData]);
     }catch(error){
      return HttpResponse.json([500, "Internal server error"])
     }
   }),
  
   // Mock API endpoint to edit a task
   http.put('/api/TodoData/editTask' , async ({request}) => {
    try{
      const { taskId, newData } = await request.json() as { taskId :number, newData:any };
      KanbanData.forEach((category) => {
        category.child.forEach((task) => {
          if (task.id === taskId) {
            Object.assign(task, newData);
          }
        });
      });
      return HttpResponse.json([200, KanbanData]);
    }catch(error){
      return HttpResponse.json([500, "Internal server error"])
    }
   }),
  // Mock API endpoint to delete a task
  http.delete('/api/TodoData/deleteTask' , async ({request}) => {
    try{
      const { taskId } = await request.json() as { taskId : number};
      console.log(taskId,typeof taskId);
      const updatedTodoData = KanbanData.filter((task) => task.id !== taskId);
      return HttpResponse.json([200, updatedTodoData]);
    }catch(error){
      return HttpResponse.json([500, "Internal server error"])
    }
  })
  
  ]

interface KanbanDataContextProps {
    children: ReactNode;
}

interface KanbanContextType {
    todoCategories: TodoCategory[];
    addCategory: (categoryName: string) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
    clearAllTasks: (categoryId: string) => Promise<void>;
    deleteTodo: (taskId: number) => Promise<void>;
    setError: (errorMessage: string | null) => void;
    error:string | null;
    setLoading: (errorMessage: boolean) => void;
    loading:boolean;
    setTodoCategories: (id: TodoCategory[]) => void;
    moveTask: (
        taskId: number,
        sourceCategoryId: string,
        destinationCategoryId: string,
        sourceIndex: number,
        destinationIndex: number
    ) => void;
}

export const KanbanDataContext = createContext<KanbanContextType>({} as KanbanContextType);

export const KanbanDataContextProvider: React.FC<KanbanDataContextProps> = ({ children }) => {
    const [todoCategories, setTodoCategories] = useState<TodoCategory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch todo data from the API
    const {data:TodosData,isLoading , error:todosFetchError} = useSWR('/api/TodoData' , getFetcher)
    useEffect(() => {
        if(TodosData){
            setLoading(isLoading);
            setTodoCategories(TodosData[1]);
        }else{
            setLoading(isLoading);
            setError(todosFetchError);
        }
    }, [TodosData,]);

    



    const moveTask = (_taskId: any, sourceCategoryId: any, destinationCategoryId: any, sourceIndex: number, destinationIndex: number) => {

        setTodoCategories((prevCategories) => {
            // Find the source and destination categories
            const sourceCategoryIndex = prevCategories.findIndex(cat => cat.id.toString() === sourceCategoryId);
            const destinationCategoryIndex = prevCategories.findIndex(cat => cat.id.toString() === destinationCategoryId);

            if (sourceCategoryIndex === -1 || destinationCategoryIndex === -1) {
                return prevCategories; // Return previous state if categories are not found
            }
            // Clone the source and destination categories
            const updatedCategories = [...prevCategories];
            const sourceCategory = { ...updatedCategories[sourceCategoryIndex] };
            const destinationCategory = { ...updatedCategories[destinationCategoryIndex] };

            // Remove the task from the source category
            const taskToMove = sourceCategory.child.splice(sourceIndex, 1)[0];

            // Insert the task into the destination category at the specified index
            destinationCategory.child.splice(destinationIndex, 0, taskToMove);

            // Update the categories in the state
            updatedCategories[sourceCategoryIndex] = sourceCategory;
            updatedCategories[destinationCategoryIndex] = destinationCategory;

            return updatedCategories;
        });
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
    };

    // Api Request to delete category
    const {trigger:deleteCategoryTrigger} = useSWRMutation('/api/TodoData' , deleteFetcher);

    const deleteCategory = async (categoryId: string) => {
        try {
            const response = await deleteCategoryTrigger({categoryId});
            setTodoCategories(response[1]);
        } catch (error: any) {
            handleError(error.message);
        }
    };

    // Api Request to clear all tasks
    const {trigger:clearAllTasksTrigger} = useSWRMutation('/api/TodoData/clearTasks', deleteFetcher);

    const clearAllTasks = async (categoryId: string) => {
        try {
          await clearAllTasksTrigger({categoryId});
        } catch (error: any) {
            handleError(error.message);
        }
    };

    // Api Request to add category
    const {trigger:addCategoryTrigger} = useSWRMutation('/api/TodoData/addCategory' , postFetcher);

    const addCategory = async (categoryName: string) => {
        try {
            const response = await addCategoryTrigger({ categoryName });
            console.log(response[1]);
            setTodoCategories((prevCategories) => [...prevCategories, response[1]]);
        } catch (error: any) {
            handleError(error.message);
        }
    };

    // Api request to delete a todo
    const {trigger:deleteTodoTrigger} = useSWRMutation(`/api/TodoData/deleteTask` , deleteFetcher);

    const deleteTodo = async (taskId: number) => {
        try {
         await deleteTodoTrigger({taskId});
        } catch (error: any) {
            handleError(error.message);
        }
    };

    return (
        <KanbanDataContext.Provider value={{ todoCategories, addCategory, deleteCategory, clearAllTasks, deleteTodo, setError, moveTask,setTodoCategories,error,loading , setLoading }}>
            {children}
        </KanbanDataContext.Provider>
    );
};

