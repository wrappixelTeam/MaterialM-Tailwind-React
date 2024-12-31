



import { Bloghandlers } from "src/context/BlogContext";
import { Chathandlers } from "src/context/ChatContext";
import { Contacthandlers } from "src/context/Conatactcontext";
import { Ecommercehandlers } from "src/context/Ecommercecontext";
import { Emailhandlers } from "src/context/EmailContext";
import { InvoiceHandlers } from "src/context/InvoiceContext";
import { Kanbanhandlers } from "src/context/kanbancontext";
import { NotesHandlers } from "src/context/NotesContext";
import { TicketHandlers } from "src/context/TicketContext";
import { UserProfileHandlers } from "src/context/UserDataContext";


export const mockHandlers = [...Contacthandlers,...Ecommercehandlers,...Bloghandlers,...Chathandlers , ...UserProfileHandlers,...InvoiceHandlers,...NotesHandlers,...Emailhandlers,...TicketHandlers,...Kanbanhandlers];
