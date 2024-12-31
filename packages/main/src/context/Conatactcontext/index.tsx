import  { createContext, useState, useEffect, ReactNode } from 'react';
import { ContactType } from '../../types/apps/contact';
import React from "react";
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr';
import { http, HttpResponse } from 'msw';
import ContactList, { fakeRequest } from 'src/api/contacts/ContactsData';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'src/api/globalFetcher';

// All Mocked Apis
export const Contacthandlers =[

  // Mock API endpoint to add a get contacts
  http.get('/api/data/contacts/contactsData',() => {
    return HttpResponse.json(ContactList)
  }),
  
// Mock API endpoint to add a new contact
  http.post('/api/data/contacts/addContact', async ({request}) => {
    try{
      await fakeRequest(1000);
      let newContact = await request.json() as ContactType ;
        newContact.id = ContactList.length + 1;
        ContactList.push(newContact);
         return HttpResponse.json([200, newContact])
    }catch(error){
      console.log(error);
      return HttpResponse.json([500, { message: 'Internal server error' }])
    }
  }),

  // Mock API endpoint to delete a contact
  http.delete("/api/data/contacts/deleteContact" , async ({request}) => {
    try{
      let {data} = await request.json() as {data:any} ;
      const contactIndex = ContactList.findIndex(contact => contact.id === data.contactId);
      if (contactIndex !== -1) {
        return HttpResponse.json([200, ContactList[contactIndex]]);
      } else {
        return HttpResponse.json([404, { message: 'Contact not found' }]);
      }
    }catch(error){
      console.log(error);
      return HttpResponse.json([500, { message: 'Internal server error' }])
    }
  }),

  // Mock API endpoint to update a contact

  http.put("/api/data/contacts/updateContact" , async ({request}) => {
    try{
      let updatedContactData = await request.json() as ContactType ;
      const updatedContactIndex = ContactList.findIndex(contact => contact.id === updatedContactData.id);
      if (updatedContactIndex !== -1) {
        ContactList[updatedContactIndex] = { ...ContactList[updatedContactIndex], ...updatedContactData };
        return HttpResponse.json([200, ContactList[updatedContactIndex]]);
      } else {
        return HttpResponse.json([404, { message: 'Contact not found' }]);
      }
    }catch(error){
      console.log(error);
      return HttpResponse.json([500, { message: 'Internal server error' }])
    }
  })

]

// Define the shape of the context
export interface ContactContextType {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  contacts: ContactType[];
  setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
  starredContacts: number[];
   loading:boolean;
  error:any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<any>>
  setStarredContacts: React.Dispatch<React.SetStateAction<number[]>>;
  selectedContact: ContactType | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactType | null>>;
  addContact: (newContact: ContactType) => void;
  deleteContact: (contactId: number) => void;
  updateContact: (updatedContact: ContactType) => void;
  selectContact: (contact: ContactType) => void;
  toggleStarred: (contactId: number) => void;
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  openModal: boolean;
  setOpenModal: (collapse: boolean) => void;

}

export const ContactContext = createContext<ContactContextType | any>(undefined);
export const ContactContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [starredContacts, setStarredContacts] = useState<number[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);


  

  // Function to get contactss
  const { data: contactData , isLoading:isContactsLoading , error:contactsError } = useSWR('/api/data/contacts/contactsData', getFetcher);
  useEffect(() => {
     if(contactData){
      setLoading(isContactsLoading)
      setContacts(contactData);
      const initialStarredContacts = contactData.filter((contact: { starred: any; }) => contact.starred).map((contact: { id: any; }) => contact.id);
      setStarredContacts(initialStarredContacts);
      if (contactData.length > 0) {
        setSelectedContact(contactData[0]);
      }
     }
     if(contactsError){
      setError(contactsError);
     }
  }, [contactData]);


  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

// Function to add a contact
const { trigger: addContactTrigger } = useSWRMutation('/api/data/contacts/addContact', postFetcher);

const addContact = async (newContact: ContactType) => {
     try{
       const data = await addContactTrigger({ ...newContact });
       mutate('/api/data/contacts/contactsData');
       let addedContact = data[1];
      setContacts([addedContact, ...contacts]);
     }catch(error){
      console.log(error)
     }
  };


  // Function to delete a contact
  const { trigger: deleteContactTrigger } = useSWRMutation('/api/data/contacts/deleteContact', deleteFetcher);

  const deleteContact = async (contactId: string | number) => {
    try {
      const data = await deleteContactTrigger({ data: { contactId } });
      let remainingContacts = contacts.filter((item) => {
          return item.id !== data[1].id
      });
      setContacts(remainingContacts);

      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact(null);
      }
      mutate('/api/data/contacts/contactsData');
    } catch (error) {
      setError(contactsError);
      console.error('Failed to delete contact:', error);
    }
  };

  // Function to update a contact
  const { trigger: updateContactTrigger } = useSWRMutation('/api/data/contacts/updateContact', putFetcher);

  const updateContact = async (updatedContact: React.SetStateAction<ContactType | null>) => {
    try {
      const data = await updateContactTrigger({ ...updatedContact });
      mutate('/api/data/contacts/contactsData');
      const updatedContactData = data;
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === updatedContactData.id ? updatedContactData : contact
        )
      );
      setSelectedContact(updatedContact);
    } catch (error) {
      setError(contactsError);
      console.error('Failed to update contact:', error);
    }
  };
  // Function to select a contact
  const selectContact = (contact: ContactType) => {
    setSelectedContact(contact);
  };

  // Function to toggle the starred status of a contact
  const toggleStarred = (contactId: number) => {
    if (starredContacts.includes(contactId)) {
      setStarredContacts(prevStarred => prevStarred.filter(id => id !== contactId));
    } else {
      setStarredContacts(prevStarred => [...prevStarred, contactId]);
    }
  };

  // Value provided by the context provider
  const contextValue: ContactContextType = {
    selectedDepartment,
    setSelectedDepartment,
    contacts,
    setContacts,
    starredContacts,
    setStarredContacts,
    selectedContact,
    setSelectedContact,
    addContact,
    deleteContact,
    updateContact,
    selectContact,
    setError,
    error,
    loading,
    setLoading,
    toggleStarred,
    searchTerm,
    updateSearchTerm,
    openModal, setOpenModal
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
