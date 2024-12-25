
import { Bloghandlers } from "src/api/blog/blogData";
import { Chathandlers } from "src/api/chat/Chatdata";
import { Contacthandlers } from "src/api/contacts/ContactsData";
import { Ecommercehandlers } from "src/api/eCommerce/ProductsData";
import { InvoiceHandlers } from "src/api/invoice/invoceLists";
import { UserProfileHandlers } from "src/api/userprofile/PostData";
import { UserDatahandlers } from "src/api/userprofile/UsersData";


export const mockHandlers = [...Contacthandlers,...Ecommercehandlers,...Bloghandlers,...Chathandlers , ...UserProfileHandlers,...UserDatahandlers,...InvoiceHandlers];
