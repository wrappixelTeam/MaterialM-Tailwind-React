import  { createContext, useState, useEffect, ReactNode } from 'react';
import { ContactType } from '../../types/apps/contact';
import React from "react";
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr';

// Define the shape of the context
export interface ContactContextType {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  contacts: ContactType[];
  setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
  starredContacts: number[];
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

  // SWR Fetcher functions

  const getFetcher = (url:string) => fetch(url).then((res) => {
    if(!res.ok){
      throw new Error("Failed to fetch data")
    }else{
      return res.json();
    }
  })
  const postFetcher = (url: string, { arg }: { arg: any }) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    }).then((res) => {
      if (!res.ok) throw new Error('Something went wrong');
      return res.json();
    });

    const deleteFetcher = (url: string, { arg }: { arg: any }) =>
      fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete contact');
        }
        return res.json();
      });
  
    const putFetcher = (url: string, { arg }: { arg: any }) =>
      fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update contact');
        }
        return res.json();
      });
  

  // Api requests
  const { data: contactData } = useSWR('/api/data/contacts/contactsData', getFetcher);
  const { trigger: addContactTrigger } = useSWRMutation('/api/data/contacts/addContact', postFetcher);
  const { trigger: deleteContactTrigger } = useSWRMutation('/api/data/contacts/deleteContact', deleteFetcher);
  const { trigger: updateContactTrigger } = useSWRMutation('/api/data/contacts/updateContact', putFetcher);

  useEffect(() => {
     if(contactData){
      setContacts(contactData);
      const initialStarredContacts = contactData.filter((contact: { starred: any; }) => contact.starred).map((contact: { id: any; }) => contact.id);
      setStarredContacts(initialStarredContacts);
      if (contactData.length > 0) {
        setSelectedContact(contactData[0]);
      }
     }
  }, [contactData]);


  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

// Function to add a contact
  const addContact = async (newContact: ContactType) => {
     try{
       const data = await addContactTrigger({ ...newContact });
       let addedContact = data[1];
      setContacts([addedContact, ...contacts]);
     }catch(error){
      console.log(error)
     }
  };


  // Function to delete a contact
  const deleteContact = async (contactId: string | number) => {
    try {
      const data = await deleteContactTrigger({ data: { contactId } });
      let remainingContacts = data[1];
      setContacts(remainingContacts);

      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };
  // Function to update a contact
  const updateContact = async (updatedContact: React.SetStateAction<ContactType | null>) => {
    try {
      const data = await updateContactTrigger({ ...updatedContact });
      const updatedContactData = data;
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === updatedContactData.id ? updatedContactData : contact
        )
      );
      setSelectedContact(updatedContact);
    } catch (error) {
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
