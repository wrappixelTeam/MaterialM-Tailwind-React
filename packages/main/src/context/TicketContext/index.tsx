

import  { createContext, useState, useEffect } from 'react';
import { TicketType } from '../../types/apps/ticket';
import React from "react";
import useSWR from 'swr';
import { deleteFetcher, getFetcher, postFetcher } from 'src/api/globalFetcher';
import useSWRMutation from 'swr/mutation';
import { http, HttpResponse } from 'msw';
import { TicketData } from 'src/api/ticket/TicketData';

export const TicketHandlers = [
  
    // Mock GET request to retrieve Ticket data
    http.get('/api/data/ticket/TicketData' , () => {
      return HttpResponse.json([200, TicketData])
    }),
  
    // Mock create endpoint for create a ticket
    http.post('/api/data/ticket/create', async ({request}) => {
       try{
        let newTicket = await request.json() as TicketType;
        TicketData.push(newTicket);
        return HttpResponse.json([200, newTicket]);
       }catch(error){
        return HttpResponse.json([500,"Internal Server Error"])
       }
    }),
  
    // Mock DELETE endpoint for deleting a ticket
    http.delete('/api/data/ticket/delete' , async ({request}) => {
      try{
        const { id } = await request.json() as {id : number};
        const ticket = TicketData.map(ticket =>
        ticket.Id === id ? { ...ticket, deleted: true } : ticket);
        return HttpResponse.json([200, ticket]);
      }catch(error){
        return HttpResponse.json([500, "Internal server error"])
      }
    })
  
  ]

export interface TicketContextType {
    tickets: TicketType[];
    deleteTicket: (id: number) => void;
    setTicketSearch: (searchTerm: string) => void;
    searchTickets: (searchTerm: string) => void;
    ticketSearch: string;
    filter: string;
    loading: boolean;
    error: string;
    setFilter: (filter: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (loading: string) => void;
    addTicket: (newTicket: any) => void

}

// Create Context
export const TicketContext = createContext<TicketContextType>({} as TicketContextType);

// Provider Component
export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [ticketSearch, setTicketSearch] = useState<string>('');
    const [filter, setFilter] = useState<string>('total_tickets');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Fetch tickets from the API when the component mounts using useEffect
    const {data:TicketsData , isLoading , error:fetchTicketsError} = useSWR('/api/data/ticket/TicketData' , getFetcher);
    useEffect(() => {
        if(TicketsData){
            setLoading(isLoading);
            setTickets(TicketsData[1]);
        }else{
           setLoading(isLoading);
        }
        if(fetchTicketsError){
            setError(fetchTicketsError);
        }
    }, [TicketsData]);

    // Delete a ticket with the specified ID from the server and update the tickets state
    const {trigger:deleteTicketTrigger} = useSWRMutation('/api/data/ticket/delete' , deleteFetcher);

    const deleteTicket = async (id: number) => {
        try {
            await deleteTicketTrigger({ data: { id } })
            setTickets((prevTickets) =>
                prevTickets.map((ticket) => (ticket.Id === id ? { ...ticket, deleted: true } : ticket))
            );
        } catch (err) {
            console.error('Error deleting ticket:', err);
        }
    };

    // Add a new ticket
    const {trigger:addTicketTrigger} = useSWRMutation('/api/data/ticket/create' , postFetcher);

    const addTicket = async (newTicket: TicketType) => {
        try {
            let response = await addTicketTrigger(newTicket);
            setTickets((prevTickets) => [...prevTickets, response[1]]);
        } catch (err) {
            console.error('Error adding ticket:', err);
        }
    };


    // Update the ticket search term state based on the provided search term value.
    const searchTickets = (searchTerm: string) => {
        setTicketSearch(searchTerm);
    };

    return (
        <TicketContext.Provider
            value={{ tickets, deleteTicket, setTicketSearch, searchTickets, addTicket, ticketSearch, filter, setFilter,setLoading ,setError,loading , error }}
        >
            {children}
        </TicketContext.Provider>
    );
};


