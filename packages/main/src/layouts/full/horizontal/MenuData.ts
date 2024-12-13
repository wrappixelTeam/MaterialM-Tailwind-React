import {
  IconPoint,
  IconAlertCircle,
  IconSettings,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: "solar:layers-line-duotone",
    href: '',
    children: [
      {
        id: uniqueId(),
        title: "Sample Page",
        icon: 'solar:widget-add-line-duotone',
        href: "/",
      },
      {
        id: uniqueId(),
        title: "Analytics",
        icon: 'solar:chart-line-duotone',
        href: "/dashboards/analytics",
      },
      {
        id: uniqueId(),
        title: "CRM",
        icon: 'solar:layers-line-duotone',
        href: "/dashboards/crm",
      },
      {
        id: uniqueId(),
        title: "Front Pages",
        icon: "solar:home-angle-linear",
        href: "",
        children: [
          {
            title: "Homepage",
            id: uniqueId(),
            href: "/frontend-pages/homepage",
          },
          {
            title: "About Us",
            id: uniqueId(),
            href: "/frontend-pages/aboutus",
          },
          {
            title: "Blog",
            id: uniqueId(),
            href: "/frontend-pages/blog",
          },
          {
            title: "Blog Details",
            id: uniqueId(),
            href: "/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
          },
          {
            title: "Contact Us",
            id: uniqueId(),
            href: "/frontend-pages/contact",
          },
          {
            title: "Portfolio",
            id: uniqueId(),
            href: "/frontend-pages/portfolio",
          },
          {
            title: "Pricing",
            id: uniqueId(),
            href: "/frontend-pages/pricing",
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Apps',
    icon: 'solar:widget-line-duotone',
    href: '',
    children: [
      {
        id: uniqueId(),
        title: "Contacts",
        icon: 'solar:phone-line-duotone',
        href: "/apps/contacts",
      },
      {
        id: uniqueId(),
        title: "Chats",
        icon: 'solar:chat-round-line-line-duotone',
        href: "/apps/chats",
      },
      {
        id: uniqueId(),
        title: "Notes",
        icon: 'solar:document-text-line-duotone',
        href: "/apps/notes",
      },
      {
        id: uniqueId(),
        title: "Calendar",
        icon: 'solar:calendar-mark-line-duotone',
        href: "/apps/calendar",
      },
      {
        id: uniqueId(),
        title: "Email",
        icon: 'solar:letter-line-duotone',
        href: "/apps/email",
      },
      {
        id: uniqueId(),
        title: "Tickets",
        icon: 'solar:ticker-star-outline',
        href: "/apps/tickets",
      },
      {
        id: uniqueId(),
        title: "Kanban",
        icon: 'solar:notebook-linear',
        href: "/apps/kanban",
      },
      {
        id: uniqueId(),
        title: 'User Profile',
        icon: 'solar:shield-user-outline',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Profile',
            icon: IconPoint,
            href: '/apps/user-profile/profile',
          },
          {
            id: uniqueId(),
            title: 'Followers',
            icon: IconPoint,
            href: '/apps/user-profile/followers',
          },
          {
            id: uniqueId(),
            title: 'Friends',
            icon: IconPoint,
            href: '/apps/user-profile/friends',
          },
          {
            id: uniqueId(),
            title: 'Gallery',
            icon: IconPoint,
            href: '/apps/user-profile/gallery',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Ecommerce',
        icon: 'solar:document-text-line-duotone',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Shop',
            icon: IconPoint,
            href: '/apps/ecommerce/shop',
          },
          {
            id: uniqueId(),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/ecommerce/detail/1',
          },
          {
            id: uniqueId(),
            title: 'List',
            icon: IconPoint,
            href: '/apps/ecommerce/list',
          },
          {
            id: uniqueId(),
            title: 'Checkout',
            icon: IconPoint,
            href: '/apps/ecommerce/checkout',
          },
          {
            id: uniqueId(),
            title: 'Add Product',
            icon: IconPoint,
            href: '/apps/ecommerce/addproduct',
          },
          {
            id: uniqueId(),
            title: 'Edit Product',
            icon: IconPoint,
            href: '/apps/ecommerce/editproduct',
          },
        ],
      },
      {
        title: "Invoice",
        id: uniqueId(),
        icon: "solar:bill-check-outline",
        href: '',
        children: [
          {
            id: uniqueId(),
            title: "List",
            icon: IconPoint,
            href:"/apps/invoice/list",
          },
          {
            id: uniqueId(),
            title: "Details",
            icon: IconPoint,
            href:"/apps/invoice/detail/PineappleInc",
          },
          {
            id: uniqueId(),
            title: "Create",
            icon: IconPoint,
            href:"/apps/invoice/create",
          },
          {
            id: uniqueId(),
            title: "Edit",
            icon: IconPoint,
            href:"/apps/invoice/edit/PineappleInc",
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Blog',
        icon: 'solar:widget-add-line-duotone',
        href: '/apps/blog/',
        children: [
          {
            id: uniqueId(),
            title: 'Posts',
            icon: IconPoint,
            href: '/apps/blog/post',
          },
          {
            id: uniqueId(),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
        ],
      },
    ],
  },


  {
    id: uniqueId(),
    title: 'Ui Elements',
    icon: 'solar:palette-round-line-duotone',
    column:4,
    href: '',
    children: [
      {
        id: uniqueId(),
        title: "Accordian",
        icon: "solar:waterdrops-line-duotone",
        href: "/ui-components/accrodian",
      },
      {
        id: uniqueId(),
        title: "Badge",
        icon: "solar:tag-horizontal-line-duotone",
        href: "/ui-components/badge",
      },
      {
        id: uniqueId(),
        title: "Button",
        icon: "solar:airbuds-case-minimalistic-line-duotone",
        href: "/ui-components/buttons",
      },
      {
        id: uniqueId(),
        title: "Dropdowns",
        icon: "solar:airbuds-case-line-duotone",
        href: "/ui-components/dropdown",
      },
      {
        id: uniqueId(),
        title: "Modals",
        icon: "solar:bolt-line-duotone",
        href: "/ui-components/modals",
      },
      {
        id: uniqueId(),
        title: "Tab",
        icon: "solar:box-minimalistic-line-duotone",
        href: "/ui-components/tab",
      },
      {
        id: uniqueId(),
        title: "Tooltip",
        icon: "solar:feed-line-duotone",
        href: "/ui-components/tooltip",
      },
      {
        id: uniqueId(),
        title: "Alert",
        icon: "solar:flag-line-duotone",
        href: "/ui-components/alert",
      },
      {
        id: uniqueId(),
        title: "Progressbar",
        icon: "solar:programming-line-duotone",
        href: "/ui-components/progressbar",
      },
      {
        id: uniqueId(),
        title: "Pagination",
        icon: "solar:waterdrops-line-duotone",
        href: "/ui-components/pagination",
      },
      {
        id: uniqueId(),
        title: "Breadcrumps",
        icon: "solar:slider-minimalistic-horizontal-line-duotone",
        href: "/ui-components/breadcrumb",
      },
      {
        id: uniqueId(),
        title: "Drawer",
        icon: "solar:laptop-minimalistic-line-duotone",
        href: "/ui-components/drawer",
      },
      {
        id: uniqueId(),
        title: "Lists",
        icon: "solar:checklist-bold-duotone",
        href: "/ui-components/listgroup",
      },
      {
        id: uniqueId(),
        title: "Carousel",
        icon: "solar:align-horizonta-spacing-line-duotone",
        href: "/ui-components/carousel",
      },
      {
        id: uniqueId(),
        title: "Spinner",
        icon: "solar:soundwave-bold-duotone",
        href: "/ui-components/spinner",
      },
      {
        id: uniqueId(),
        title: "Avatar",
        icon: "solar:user-line-duotone",
        href: "/ui-components/avatar",
      },
      {
        id: uniqueId(),
        title: "Banner",
        icon: "solar:banknote-linear",
        href: "/ui-components/banner",
      },
      {
        id: uniqueId(),
        title: "Button Group",
        icon: "solar:users-group-two-rounded-outline",
        href: "/ui-components/button-group",
      },
      {
        id: uniqueId(),
        title: "Card",
        icon: "solar:card-line-duotone",
        href: "/ui-components/card",
      },
      {
        id: uniqueId(),
        title: "Datepicker",
        icon: "solar:calendar-search-linear",
        href: "/ui-components/datepicker",
      },
      {
        id: uniqueId(),
        title: "Footer",
        icon: "solar:wad-of-money-outline",
        href: "/ui-components/footer",
      },
      {
        id: uniqueId(),
        title: "KBD",
        icon: "solar:keyboard-line-duotone",
        href: "/ui-components/kbd",
      },
      {
        id: uniqueId(),
        title: "Mega Menu",
        icon: "solar:clipboard-list-linear",
        href: "/ui-components/megamenu",
      },
      {
        id: uniqueId(),
        title: "Navbar",
        icon: "solar:slider-minimalistic-horizontal-linear",
        href: "/ui-components/navbar",
      },
      {
        id: uniqueId(),
        title: "Popover",
        icon: "solar:chat-line-line-duotone",
        href: "/ui-components/popover",
      },
      {
        id: uniqueId(),
        title: "Rating",
        icon: "solar:stars-linear",
        href: "/ui-components/rating",
      },
      {
        id: uniqueId(),
        title: "Sidebar",
        icon: "solar:siderbar-broken",
        href: "/ui-components/sidebar",
      },
      {
        id: uniqueId(),
        title: "Tables",
        icon: "solar:bedside-table-linear",
        href: "/ui-components/tables",
      },
      {
        id: uniqueId(),
        title: "Timeline",
        icon: "solar:align-horizontal-center-outline",
        href: "/ui-components/timeline",
      },
      {
        id: uniqueId(),
        title: "Toast",
        icon: "solar:check-square-linear",
        href: "/ui-components/toast",
      },
      {
        id: uniqueId(),
        title: "Typography",
        icon: "solar:text-bold-duotone",
        href: "/ui-components/typography",
      },
      
    ],
  },

  {
    id: uniqueId(),
    title: 'Pages',
    icon: 'solar:book-outline',
    href: '',
    children: [
      {
        title: "Account Setting",
        icon: "solar:settings-minimalistic-line-duotone",
        id: uniqueId(),
        href: "/theme-pages/account-settings",
      },
      {
        title: "FAQ",
        icon: "solar:question-circle-line-duotone",
        id: uniqueId(),
        href: "/theme-pages/faq",
      },
      {
        title: "Pricing",
        icon: "solar:dollar-minimalistic-linear",
        id: uniqueId(),
        href: "/theme-pages/pricing",
      },
      {
        title: "Landingpage",
        icon: "solar:bill-list-line-duotone",
        id: uniqueId(),
        href: "/landingpage",
      },
      {
        title: "Roll Base Access",
        icon: "solar:accessibility-broken",
        id: uniqueId(),
        href: "/theme-pages/casl",
      },
      {
        id: uniqueId(),
        title: 'Widgets',
        icon: 'solar:adhesive-plaster-outline',
        href: '/widgets/cards',
        children: [
          {
            id: uniqueId(),
            title: 'Cards',
            icon: IconPoint,
            href: '/widgets/cards',
          },
          {
            id: uniqueId(),
            title: 'Banners',
            icon: IconPoint,
            href: '/widgets/banners',
          },
          {
            id: uniqueId(),
            title: 'Charts',
            icon: IconPoint,
            href: '/widgets/charts',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Auth',
        icon: 'solar:lock-password-linear',
        href: '/400',
        children: [
          {
            id: uniqueId(),
            title: 'Error',
            icon: IconAlertCircle,
            href: '/400',
          },
          {
            id: uniqueId(),
            title: 'Maintenance',
            icon: IconSettings,
            href: '/auth/maintenance',
          },
          {
            id: uniqueId(),
            title: 'Login',
            icon: 'solar:key-square-line-duotone',
            href: '/auth/auth1/login',
            children: [
              {
                id: uniqueId(),
                title: 'Side Login',
                icon: IconPoint,
                href: '/auth/auth1/login',
              },
              {
                id: uniqueId(),
                title: 'Boxed Login',
                icon: IconPoint,
                href: '/auth/auth2/login',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Register',
            icon: 'solar:user-check-rounded-broken',
            href: '/auth/auth1/register',
            children: [
              {
                id: uniqueId(),
                title: 'Side Register',
                icon: IconPoint,
                href: '/auth/auth1/register',
              },
              {
                id: uniqueId(),
                title: 'Boxed Register',
                icon: IconPoint,
                href: '/auth/auth2/register',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Forgot Password',
            icon: 'solar:shield-cross-broken',
            href: '/auth/auth1/forgot-password',
            children: [
              {
                id: uniqueId(),
                title: 'Side Forgot Password',
                icon: IconPoint,
                href: '/auth/auth1/forgot-password',
              },
              {
                id: uniqueId(),
                title: 'Boxed Forgot Password',
                icon: IconPoint,
                href: '/auth/auth2/forgot-password',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Two Steps',
            icon: 'solar:password-minimalistic-input-outline',
            href: '/auth/auth1/two-steps',
            children: [
              {
                id: uniqueId(),
                title: 'Side Two Steps',
                icon: IconPoint,
                href: '/auth/auth1/two-steps',
              },
              {
                id: uniqueId(),
                title: 'Boxed Two Steps',
                icon: IconPoint,
                href: '/auth/auth2/two-steps',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Forms',
    icon: 'solar:file-text-linear',
    href: '',
    children: [
     
      {
        id: uniqueId(),
        title: "Forms Elements",
        icon: "solar:text-selection-line-duotone",
        href: "/forms/form-elements",
      },
      {
        id: uniqueId(),
        title: "Forms Layouts",
        icon: "solar:document-text-outline",
        href: "/forms/form-layouts",
      },
      {
        id: uniqueId(),
        title: "Forms Horizontal",
        icon: "solar:slider-horizontal-line-duotone",
        href: "/forms/form-horizontal",
      },
      {
        id: uniqueId(),
        title: "Forms Vertical",
        icon: "solar:slider-vertical-line-duotone",
        href: "/forms/form-vertical",
      },
      {
        id: uniqueId(),
        title: "Forms Custom",
        icon: "solar:document-text-outline",
        href: "/forms/form-custom",
      },
      {
        id: uniqueId(),
        title: "Form Validation",
        icon: "solar:bill-check-linear",
        href: "/forms/form-validation",
      },
    ],
  },


  {
    id: uniqueId(),
    title: 'Charts',
    icon: 'solar:chart-2-outline',
    href: '/charts/',
    children: [
      {
        title: "Line Chart",
        icon: "solar:chart-square-line-duotone",
        id: uniqueId(),
        href: "/charts/line",
      },
      {
        title: "Area Chart",
        icon: "solar:graph-new-broken",
        id: uniqueId(),
        href: "/charts/area",
      },
      {
        title: "Gradient Chart",
        icon: "solar:round-graph-outline",
        id: uniqueId(),
        href: "/charts/gradient",
      },
      {
        title: "Candlestick",
        icon: "solar:chandelier-outline",
        id: uniqueId(),
        href: "/charts/candlestick",
      },
      {
        title: "Column",
        icon: "solar:chart-2-bold-duotone",
        id: uniqueId(),
        href: "/charts/column",
      },
      {
        title: "Doughnut & Pie",
        icon: "solar:pie-chart-2-linear",
        id: uniqueId(),
        href: "/charts/doughnut",
      },
      {
        title: "Radialbar & Radar",
        icon: "solar:graph-line-duotone",
        id: uniqueId(),
        href: "/charts/radialbar",
      },
    ],
  },


  {
    id: uniqueId(),
    title: 'Tables',
    icon: 'solar:tuning-square-2-line-duotone',
    href: '',
    children: [
      {
        title: "Basic Tables",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/basic",
      },
      {
        title: "Striped Rows Table",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/striped-row",
      },
      {
        title: "Hover Table",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/hover-table",
      },
      {
        title: "Checkbox Table",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/checkbox-table",
      },
      {
        id: uniqueId(),
        title: "React Tables",
        icon: "solar:calendar-add-broken",
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "Basic",
            href: "/react-tables/basic",
          },
          {
            id: uniqueId(),
            title: "Dense",
            href: "/react-tables/dense",
          },
          {
            id: uniqueId(),
            title: "Sorting",
            href: "/react-tables/sorting",
          },
          {
            id: uniqueId(),
            title: "Filtering",
            href: "/react-tables/filtering",
          },
          {
            id: uniqueId(),
            title: "Pagination",
            href: "/react-tables/pagination",
          },
          {
            id: uniqueId(),
            title: "Row Selection",
            href: "/react-tables/row-selection",
          },
          {
            id: uniqueId(),
            title: "Column Visibility",
            href: "/react-tables/columnvisibility",
          },
          {
            id: uniqueId(),
            title: "Editable",
            href: "/react-tables/editable",
          },
          {
            id: uniqueId(),
            title: "Sticky",
            href: "/react-tables/sticky",
          },
          {
            id: uniqueId(),
            title: "Drag & Drop",
            href: "/react-tables/drag-drop",
          },
          {
            id: uniqueId(),
            title: "Empty",
            href: "/react-tables/empty",
          },
          {
            id: uniqueId(),
            title: "Expanding",
            href: "/react-tables/expanding",
          },
          
        ],
      },
    ],
  },
];
export default Menuitems;