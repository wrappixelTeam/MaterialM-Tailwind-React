
import  { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NotesType } from '../../types/apps/notes';
import React from "react";
import useSWR, { mutate } from 'swr';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'src/api/globalFetcher';
import useSWRMutation from 'swr/mutation';
import { http, HttpResponse } from 'msw';
import { NotesData } from 'src/api/notes/NotesData';


//  All Mocked Api
export const NotesHandlers = [

    // Mock GET request to retrieve Notes data
    http.get('/api/data/notes/NotesData',() => {
      return HttpResponse.json([200, NotesData])
    }),
  
    // Mock GET request to retrieve Notes data
    http.delete('/api/notes/delete', async ({request}) => {
        try{
          const {id} = await request.json() as {id : any};
          const note = NotesData.filter((note) => note.id !== parseInt(id));
          return HttpResponse.json([200, note]);
        }catch(error){
          return HttpResponse.json([500 , 'Internal server error',error])
        }
  
    }),
  
    // Mock POST endpoint for adding a new note
    http.post('/api/notes/add', async ({request}) => {
      const currentDate = new Date();
       try{
        const { title, color } = await request.json() as {title:string , color:string};
        const newNote = {
          id: NotesData.length + 1,
          title,
          color,
          deleted: false,
          datef: currentDate.toISOString(),
        };
        return HttpResponse.json([200, newNote]);
       }catch(error){
        return HttpResponse.json([500 , 'Internal server error',error])
       }
    }),
  
    http.put('/api/notes/update', async ({request}) => {
       try{
        const { id, title, color } = await request.json() as {id:any , title:string , color:string};
        const index = NotesData.findIndex((note) => note.id === id);
      
        if (index !== -1) {
          NotesData[index] = { ...NotesData[index], title, color };
          return HttpResponse.json([200, NotesData[index]]);
        } else {
          return HttpResponse.json([404, { error: 'Note not found' }]);
        }
       }catch(error){
        return HttpResponse.json([500 , 'Internal server error',error])
       }
    })
  ]

// Define context type
interface NotesContextType {
    notes: NotesType[];
    loading: boolean;
    error: string;
    selectedNoteId: number;
    selectNote: (id: number) => void;
    addNote: (newNote: NotesType) => Promise<void>;
    updateNote: (id: number, title: string, color: string) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    setError: Dispatch<SetStateAction<string>>;
}

// Initial context values
const initialContext: NotesContextType = {
    notes: [],
    loading: true,
    error: '',
    selectedNoteId: 1,
    selectNote: () => { },
    addNote: async () => { },
    updateNote: async (_id: number, _title: string) => { },
    deleteNote: async () => { },
    setError: () => { },
};

// Create context
export const NotesContext = createContext<NotesContextType>(initialContext);

// Provider component
export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<NotesType[]>(initialContext.notes);
    const [loading, setLoading] = useState<boolean>(initialContext.loading);
    const [error , setError] = useState<string>(initialContext.error);
    const [selectedNoteId, setSelectedNoteId] = useState<number>(initialContext.selectedNoteId);

    // Fetch notes from the server
    const {data:notesData , error:notesError , isLoading:isNotesLoading ,} = useSWR('/api/data/notes/NotesData',getFetcher)
    useEffect(() => {
        if(notesData){
            setNotes(notesData[1]);
            setLoading(isNotesLoading);
        }if(notesError){
            setError(notesError)
        }
    }, [notesData,notesError]);

    // Select a note by its ID
    const selectNote = (id: number) => {
        setSelectedNoteId(id);
    };

    // Add a new note
    const {trigger:addNoteTrigger} = useSWRMutation('/api/notes/add', postFetcher);

    const addNote = async (newNote: NotesType) => {
        try {
            const response = await addNoteTrigger(newNote);
            setNotes((prevNotes) => [...prevNotes, response[1]]);
            mutate('/api/data/notes/NotesData');
        } catch (error:any) {
            setError(error);
            console.error('Error adding note:', error);
            // Handle error as needed
        }
    };

    // Update a note by its ID
    const {trigger:updateNoteTrigger} = useSWRMutation('/api/notes/update' , putFetcher);

    const updateNote = async (id: number, title: string, color: string) => {
        try {
            const response = await updateNoteTrigger({ id, title, color });
            const updatedNote = response[1];

            // Update notes state with the updated note
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
            );

            // Optionally update selectedNoteId if needed
            if (selectedNoteId === updatedNote.id) {
                setSelectedNoteId(updatedNote.id);
            }
            mutate('/api/data/notes/NotesData');
        } catch (error:any) {
            setError(error);
            console.error('Error updating note:', error);
            // Handle error as needed
        }
    };

    // Delete a note by its ID
    const {trigger:deleteNoteTrigger} = useSWRMutation('/api/notes/delete', deleteFetcher);

    const deleteNote = async (id: number) => {
        try {
            await deleteNoteTrigger({ params: { id } })
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            mutate('/api/data/notes/NotesData');
        } catch (error:any) {
            setError(error);
            console.error('Error deleting note:', error);
            // Handle error as needed
        }
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                loading,
                error,
                selectedNoteId,
                selectNote,
                addNote,
                updateNote,
                deleteNote,
                setError
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};


