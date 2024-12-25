
import { InvoiceList } from '../../types/apps/invoice';
import {http, HttpResponse} from "msw";


export const invoceLists: InvoiceList[] = [
    {
        id: 101,
        billFrom: 'PineappleInc.',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'Redq Inc.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date(),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Shipped',
        completed: false,
        isSelected: false,
    },
    {
        id: 102,
        billFrom: 'Pineapple.',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'ME Inc.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date(),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Delivered',
        completed: false,
        isSelected: false,
    },
    {
        id: 103,
        billFrom: 'Incorporation.',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'Redirwed.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date(),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Pending',
        completed: false,
        isSelected: false,
    },
    {
        id: 104,
        billFrom: 'PineappleTimes.',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'RFc.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date(),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Shipped',
        completed: false,
        isSelected: false,
    },
    {
        id: 105,
        billFrom: 'FortuneCreation',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'Soft solution.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date('2020-10-15'),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Delivered',
        completed: false,
        isSelected: false,
    },
    {
        id: 106,
        billFrom: 'PineappleTimes.',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'RFc.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date(),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Shipped',
        completed: false,
        isSelected: false,
    },
    {
        id: 107,
        billFrom: 'FortuneCreation',
        billFromEmail: 'first@xabz.com',
        billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
        billFromPhone: 979796786,
        billFromFax: 13,
        billTo: 'Soft solution.',
        billToEmail: 'toFirst@agth.com',
        billToAddress: 'Godrej garden city,Ahmedabad.',
        billToPhone: 757575233,
        billToFax: 76,
        orders: [
            {
                itemName: 'Courge',
                unitPrice: 10,
                units: 9,
                unitTotalPrice: 90,
            },
        ],
        orderDate: new Date('2020-10-15'),
        totalCost: 90,
        vat: 9,
        grandTotal: 99,
        status: 'Delivered',
        completed: false,
        isSelected: false,
    },
];

// Function to find the next available ID
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
    })

]

// mock.onGet('/api/data/invoicedata').reply(() => {
//     return [200, invoceLists];
// });

// mock.onDelete('/api/data/invoicedata/deleteinvoice').reply((config) => {
//     const { invoiceId } = JSON.parse(config.data);
//     const invoiceIndex = invoceLists.findIndex(invoice => invoice.id === invoiceId);
//     if (invoiceIndex !== -1) {
//         invoceLists.splice(invoiceIndex, 1);
//         return [200, invoceLists];
//     } else {
//         return [404, { message: 'invoice not found' }];
//     }
// })

// New endpoint to add an invoice
// mock.onPost('/api/data/invoicedata/addinvoice').reply((config) => {
//     const newInvoice = JSON.parse(config.data);
//     newInvoice.id = getNextId();
//     invoceLists.push(newInvoice);
//     return [201, newInvoice];
// });


// Mock API endpoint to update an invoice
// mock.onPut('/api/data/invoicedata/updateinvoice').reply((config) => {
//     const updatedInvoice = JSON.parse(config.data);
//     const invoiceIndex = invoceLists.findIndex((invoice) => invoice.id === updatedInvoice.id);

//     if (invoiceIndex !== -1) {
//         invoceLists[invoiceIndex] = { ...updatedInvoice };
//         return [200, invoceLists[invoiceIndex]];
//     } else {
//         return [404, { message: 'Invoice not found' }];
//     }
// });