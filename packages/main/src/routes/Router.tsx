// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import  { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from '../layouts/full/shared/loadable/Loadable';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboards
const EcommerceDashboard = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const Analytics = Loadable(lazy(() => import('../views/dashboards/Analytics')));
const Crm = Loadable(lazy(() => import('../views/dashboards/Crm')));

/* ****Apps***** */
const Contact = Loadable(lazy(() => import('../views/apps/contact/Contact')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));
const EcommerceAddProduct = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceAddProduct')),
);
const EcommerceEditProduct = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceEditProduct')),
);
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceCheckout')),
);
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogDetail')));
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chats')));
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));
const InvoiceList = Loadable(lazy(() => import('../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../views/apps/invoice/Edit')));
// const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
// const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
// const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
// const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
// const CreateTickets = Loadable(lazy(() => import('../views/apps/tickets/CreateTickets')));
// const Kanban = Loadable(lazy(() => import('../views/apps/kanban/Kanban')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <EcommerceDashboard /> },
      { path: '/dashboards/analytics', exact: true, element: <Analytics /> },
      { path: '/dashboards/crm', exact: true, element: <Crm /> },
            // Apps
      { path: '/apps/contacts', element: <Contact /> },
      { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
      { path: '/apps/ecommerce/list', element: <EcomProductList /> },
      { path: '/apps/ecommerce/checkout', element: <EcomProductCheckout /> },
      { path: '/apps/ecommerce/addproduct', element: <EcommerceAddProduct /> },
      { path: '/apps/ecommerce/editproduct', element: <EcommerceEditProduct /> },
      { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },
      { path: '/apps/blog/post', element: <Blog/> },
      { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
      { path: '/apps/chats', element: <Chats /> },
      { path: '/apps/user-profile/profile', element: <UserProfile /> },
      { path: '/apps/user-profile/followers', element: <Followers /> },
      { path: '/apps/user-profile/friends', element: <Friends /> },
      { path: '/apps/user-profile/gallery', element: <Gallery /> },
      { path: '/apps/invoice/list', element: <InvoiceList /> },
      { path: '/apps/invoice/create', element: <InvoiceCreate /> },
      { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
      { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },
      // { path: '/apps/notes', element: <Notes /> },
      // { path: '/apps/calendar', element: <Calendar /> },
      // { path: '/apps/email', element: <Email /> },
      // { path: '/apps/tickets', element: <Tickets /> },
      // { path: '/apps/tickets/create', element: <CreateTickets /> },
      // { path: '/apps/kanban', element: <Kanban /> },

      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/auth1/login', element: <Login /> },
      { path: '/auth/auth1/register', element: <Register /> },
      { path: '/auth/auth1/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/auth1/two-steps', element: <TwoSteps /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
  ,
];

const router = createBrowserRouter(Router)

export default router;
