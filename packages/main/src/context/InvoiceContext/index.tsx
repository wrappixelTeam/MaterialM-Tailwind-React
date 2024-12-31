
import  { createContext, useEffect, useState } from 'react';
import { InvoiceList } from '../../types/apps/invoice';
import React from "react";
import { invoceLists } from 'src/api/invoice/invoceLists';
import { http, HttpResponse } from 'msw';
import useSWR, { mutate } from 'swr';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from 'src/api/globalFetcher';
import useSWRMutation from 'swr/mutation';



// All Mocked Api

const getNextId = () => {
    const maxId = Math.max(...invoceLists.map(invoice => invoice.id));
    return maxId + 1;
};



export const InvoiceHandlers = [

    // Mock Api to get invoices
    http.get("/api/data/invoicedata", () => {
        return HttpResponse.json([200, invoceLists])
    }),
    // Mock Api to delete invoice
    http.delete('/api/data/invoicedata/deleteinvoice', async ({request}) => {
         try{
            const { invoiceId } = await request.json() as {invoiceId:number};
            const invoiceIndex = invoceLists.findIndex(invoice => invoice.id === invoiceId);
            if (invoiceIndex !== -1) {
                invoceLists.splice(invoiceIndex, 1);
                return HttpResponse.json([200, invoceLists]);
            } else {
                return HttpResponse.json([404, { message: 'invoice not found' }]);
            }
         }catch(error){
             return HttpResponse.json([500 , {message:"Internal server error"}])
         }
    }),
    // New endpoint to add an invoice
    http.post('/api/data/invoicedata/addinvoice' , async ({request}) => {
        try{
            const newInvoice = await request.json() as InvoiceList;
            newInvoice.id = getNextId();
            invoceLists.push(newInvoice);
            return HttpResponse.json([201, newInvoice]);
        }catch(error){
            return HttpResponse.json([500 , {message:"Internal server error"}])
        }
    }),
    // Mock API endpoint to update an invoice
    http.put('/api/data/invoicedata/updateinvoice', async ({request}) => {
         try{
            const updatedInvoice = await request.json() as InvoiceList;
            const invoiceIndex = invoceLists.findIndex((invoice) => invoice.id === updatedInvoice.id);
        
            if (invoiceIndex !== -1) {
                invoceLists[invoiceIndex] = { ...updatedInvoice };
                return HttpResponse.json([200, invoceLists[invoiceIndex]]);
            } else {
                return HttpResponse.json([404, { message: 'Invoice not found' }]);
            }
         }catch(error){
            return HttpResponse.json([500 , {message:"Internal server error"}])
         }
    }),


]

interface InvoiceContextType {
    invoices: InvoiceList[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addInvoice: (newInvoice: InvoiceList) => void;
    updateInvoice: (updatedInvoice: InvoiceList) => void;
}

export const InvoiceContext = createContext<InvoiceContextType | any>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [invoices, setInvoices] = useState<InvoiceList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<any>(null);

    // Api request to get all invoices
    const {data:invoiceData, isLoading:isInvoicesLoading ,error:dataError} = useSWR('/api/data/invoicedata',getFetcher)

    useEffect(() => {
        if(dataError){
            console.log(dataError);
        }
        if(invoiceData){
            console.log(invoiceData);
            setInvoices(invoiceData[1]);
            setLoading(isInvoicesLoading);
        }else{
            console.log(invoiceData);
            console.log(dataError,"my");
            setLoading(isInvoicesLoading);
        }
    }, [invoiceData]);

    // Function to delete an invoice
    const {trigger:deleteInvoiceTrigger} = useSWRMutation('/api/data/invoicedata/deleteinvoice',deleteFetcher);

    const deleteInvoice = async (id: number) => {
        try {
            await deleteInvoiceTrigger({ data: { invoiceId: id } });
            setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id));
            mutate('/api/data/invoicedata');
        } catch (error) {
            console.error('Error deleting invoice:', error);
            setError(error);
        }
    };

    // Function to add an invoice
    const {trigger:addInvoiceTrigger} = useSWRMutation('/api/data/invoicedata/addinvoice', postFetcher);

    const addInvoice = async (newInvoice: InvoiceList) => {
        try {
            const response = await addInvoiceTrigger(newInvoice);
            console.log(response);
            const addedInvoice = response[1];
            setInvoices((prevInvoices) => [...prevInvoices, addedInvoice]);
            mutate('/api/data/invoicedata');
        } catch (error) {
            console.error('Error adding invoice:', error);
            setError(error);
        }
    };

    //  Function to update an invoice
    const {trigger:updateInvoiceTrigger} = useSWRMutation('/api/data/invoicedata/updateinvoice',putFetcher);

    const updateInvoice = async (updatedInvoice: InvoiceList) => {
        try {
            const response = await updateInvoiceTrigger(updatedInvoice);
            const updated = response[1];
            setInvoices((prevInvoices) =>
                prevInvoices.map((invoice) => (invoice.id === updated.id ? updated : invoice))
            );
            mutate('/api/data/invoicedata');
        } catch (error) {
            console.error('Error updating invoice:', error);
            setError(error);
        }
    };

    return (
        <InvoiceContext.Provider value={{ invoices, loading, error, deleteInvoice, addInvoice, updateInvoice }}>
            {children}
        </InvoiceContext.Provider>
    );
};
