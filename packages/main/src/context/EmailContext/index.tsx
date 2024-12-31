
import  { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { EmailType } from '../../types/apps/email';
import React from "react";
import useSWR, { mutate } from 'swr';
import { deleteFetcher, getFetcher } from 'src/api/globalFetcher';
import useSWRMutation from 'swr/mutation';
import { http, HttpResponse } from 'msw';
import EmailData from 'src/api/email/EmailData';

//  All Mocked Api
export const Emailhandlers = [

  // Mock api to get emails
  http.get('/api/data/email/EmailData' , () => {
    return HttpResponse.json([200, EmailData])
  }),

  // Mock api to delete email
  http.delete('/api/data/email/delete' , async ({request}) => {
    try{
      const { emailId } = await request.json() as {emailId : number}; 
      const index = EmailData.findIndex((email) => email.id === emailId); 
      if (index !== -1) {
        EmailData.splice(index, 1); 
        return HttpResponse.json([200, { success: true }]); 
      } else {
        return HttpResponse.json([404, { error: 'Email not found' }]); 
      }
    }catch(error){
      return HttpResponse.json([500,"Internal server error"])
    }
  })
]

interface EmailContextType {
  emails: EmailType[];
  selectedEmail: EmailType | null;
  setSelectedEmail: (email: EmailType | null) => void;
  deleteEmail: (emailId: number) => void;
  toggleStar: (emailId: number) => void;
  toggleImportant: (emailId: number) => void;
  setFilter: Dispatch<SetStateAction<string>>;
  loading: boolean;
  error:string;
  filter: string,
  searchQuery: string,
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

const initialEmailContext: EmailContextType = {
  emails: [],
  selectedEmail: null,
  filter: 'inbox',
  searchQuery: '',
  loading: true,
  error:'',
  setSelectedEmail: () => { },
  deleteEmail: () => { },
  toggleStar: () => { },
  toggleImportant: () => { },
  setFilter: () => { },
  setSearchQuery: () => { },
  setLoading: () => { },
  setError: () => { },
};

export const EmailContext = createContext<EmailContextType>(initialEmailContext);

export const EmailContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [filter, setFilter] = useState<string>('inbox');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

   
  // Api request to fetch all emails
  const {data:emailsData , isLoading , error:getEmailError} = useSWR('/api/data/email/EmailData' , getFetcher)

  useEffect(() => {
    if(emailsData){
      setLoading(isLoading);
      setEmails(emailsData[1]);
        // Set the default selected email to the first email in the list
        if (emailsData[1].length > 0) {
          let emails = emailsData[1]
          setSelectedEmail(emails[0]);
        }
    }else{
      setLoading(isLoading)
    }
    if(getEmailError){
      setError(getEmailError);
    }

  }, [emailsData]);


  // Api request to delete a specific email
  const {trigger:deleteEmailTrigger} = useSWRMutation('/api/data/email/delete' , deleteFetcher)

  const deleteEmail = async (emailId: number) => {
    try {
      await deleteEmailTrigger({ data: { emailId } });
      // Remove deleted email from state
      setEmails(emails.filter(email => email.id !== emailId));
      // If the deleted email was selected, clear selectedEmail
      if (selectedEmail && selectedEmail.id === emailId) {
        setSelectedEmail(null);
      }
      mutate('/api/data/email/EmailData');
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const toggleStar = (emailId: number) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );

    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prevEmail: any) => ({
        ...(prevEmail as EmailType),
        starred: !(prevEmail as EmailType).starred
      }));
    }
  };

  const toggleImportant = (emailId: number) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, important: !email.important } : email
      )
    );

    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prevEmail: any) => ({
        ...(prevEmail as EmailType),
        important: !(prevEmail as EmailType).important
      }));
    }
  };

  return (
    <EmailContext.Provider value={{ emails, selectedEmail, setSelectedEmail, deleteEmail, toggleStar, loading , setLoading, error , setError, toggleImportant, setFilter, filter, searchQuery, setSearchQuery }}>
      {children}
    </EmailContext.Provider>
  );
};
