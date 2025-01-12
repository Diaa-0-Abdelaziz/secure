// Template routes
import {
  componentsMenu,
  formsMenu,
  lockPage,
  loginPage,
  mapsMenu,
  pagesMenu,
  registerPage,
  tablesMenu
} from './template_routes';
import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Calendar
import Calendar from 'src/components/Dashboard/Views/Calendar/CalendarRoute.vue'
/**
 * Dashboard routes
 */
// Hotels
import CreateHotel from "../pages/Hotels/Create";
import EditHotel from "../pages/Hotels/Edit";
// Business
import CreateBusiness from "../pages/Business/Create";
import EditBusiness from "../pages/Business/Edit";
// Menus
import CreateMenu from "../pages/Menus/Create";
import EditMenu from "../pages/Menus/Edit";
// Branches
import CreateBranch from "../pages/Branches/Create";
import EditBranch from "../pages/Branches/Edit";


// Branches
import CreateDiaa from "../pages/Diaa/Create";
import EditDiaa from "../pages/Diaa/Edit";

// Floors
import CreateFloor from "../pages/Floors/Create";
import EditFloor from "../pages/Floors/Edit";
// Floors
import CreateTable from "@/pages/Floors/Tables/Create";
import EditTable from "@/pages/Floors/Tables/Edit";
// Services
import CreateService from "../pages/Services/Create";
import EditService from "../pages/Services/Edit";
// Categories
import CreateCategory from "../pages/Categories/Create";
import EditCategory from "../pages/Categories/Edit";
// Events
import CreateEvent from "../pages/Events/Create";
import EditEvent from "../pages/Events/Edit";
// Orders
import CreateOrder from "../pages/Orders/Create";
import EditOrder from "../pages/Orders/Edit";
import Menu from '../pages/Menu/Menu.vue';
// Users
import CreateUser from "../pages/Users/Create";
import EditUser from "../pages/Users/Edit";
import {isAuthenticated} from '@/util/authentication';
import VueRouter from 'vue-router'
import store from '@/store/index';
import SettingsTabs from "@/pages/Settings/SettingsTabs.vue";

// Dashboard pages
const Overview = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Overview.vue')
const Widgets = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard/Widgets.vue')

// Charts
const Charts = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Charts.vue')

const HotelsList = () => import(/* webpackChunkName: "hotels" */ 'src/pages/Hotels/List')
let hotelsRoutes = {
  path: '/hotels',
  component: DashboardLayout,
  redirect: '/hotels/list',
  children: [
    {
      path: 'list',
      name: 'Hotels List',
      component: HotelsList
    },
    {
      path: 'add',
      name: 'Add Hotel',
      component: CreateHotel
    },
    {
      path: 'edit/:id',
      name: 'Edit Hotel',
      component: EditHotel
    }
  ]
}

const BusinessList = () => import(/* webpackChunkName: "business" */ 'src/pages/Business/List')
let businessRoutes = {
  path: '/business',
  component: DashboardLayout,
  redirect: '/business/list',
  children: [
    {
      path: 'list',
      name: 'Business List',
      component: BusinessList
    },
    {
      path: 'add',
      name: 'Add Business',
      component: CreateBusiness
    },
    {
      path: 'edit/:id',
      name: 'Edit Business',
      component: EditBusiness
    }
  ]
}

const MenusList = () => import(/* webpackChunkName: "business" */ 'src/pages/Menus/List')
let menusRoutes = {
  path: '/menus',
  component: DashboardLayout,
  redirect: '/menus/list',
  children: [
    {
      path: 'list',
      name: 'Menus List',
      component: MenusList
    },
    {
      path: 'add',
      name: 'Add Menu',
      component: CreateMenu
    },
    {
      path: 'edit/:id',
      name: 'Edit Menu',
      component: EditMenu
    }
  ]
}

const BranchesList = () => import(/* webpackChunkName: "business" */ 'src/pages/Branches/List')
let branchesRoutes = {
  path: '/branches',
  component: DashboardLayout,
  redirect: '/branches/list',
  children: [
    {
      path: 'list',
      name: 'Branches List',
      component: BranchesList
    },
    {
      path: 'add',
      name: 'Add Branch',
      component: CreateBranch
    },
    {
      path: 'edit/:id',
      name: 'Edit Branch',
      component: EditBranch
    }
  ]
}




// // Branches
// import CreateDiaa from "../pages/Diaa/Create";
// import EditDiaa from "../pages/Diaa/Edit";

const BranchesDiaa = () => import(/* webpackChunkName: "business" */ 'src/pages/Diaa/List')
let DiaaRoutes = {
  path: '/Diaa',
  component: DashboardLayout,
  redirect: '/Diaa/list',
  children: [
    {
      path: 'list',
      name: 'Diaa List',
      component: BranchesDiaa
    },
    {
      path: 'add',
      name: 'Add Diaa',
      component: CreateDiaa
    },
    {
      path: 'edit/:id',
      name: 'Edit Diaa',
      component: EditDiaa
    }
  ]
}







const FloorsList = () => import(/* webpackChunkName: "business" */ 'src/pages/Floors/List')

const TablesList = () => import(/* webpackChunkName: "business" */ '@/pages/Floors/Tables/List')

let floorsRoutes = {
  path: '/floors',
  component: DashboardLayout,
  children: [
    {
      path: '',
      name: 'Floors List',
      component: FloorsList
    },
    {
      path: ':floorId/tables',
      name: 'Tables List',
      component: TablesList
    },
  ]
}


const ServicesList = () => import(/* webpackChunkName: "services" */ 'src/pages/Services/List')
let servicesRoutes = {
  path: '/services',
  component: DashboardLayout,
  redirect: '/services/list',
  children: [
    {
      path: 'list',
      name: 'Services List',
      component: ServicesList
    },
    {
      path: 'add',
      name: 'Add Service',
      component: CreateService
    },
    {
      path: 'edit/:id',
      name: 'Edit Service',
      component: EditService
    }
  ]
}

const CategoriesList = () => import(/* webpackChunkName: "services" */ 'src/pages/Categories/List')
let categoriesRoutes = {
  path: '/categories',
  component: DashboardLayout,
  redirect: '/categories/list',
  children: [
    {
      path: 'list',
      name: 'Categories List',
      component: CategoriesList
    },
    {
      path: 'add',
      name: 'Add Category',
      component: CreateCategory
    },
    {
      path: 'edit/:id',
      name: 'Edit Category',
      component: EditCategory
    }
  ]
}

const EventsList = () => import(/* webpackChunkName: "events" */ 'src/pages/Events/List')
let eventsRoutes = {
  path: '/events',
  component: DashboardLayout,
  redirect: '/events/list',
  children: [
    {
      path: 'list',
      name: 'Events List',
      component: EventsList
    },
    {
      path: 'add',
      name: 'Add Event',
      component: CreateEvent
    },
    {
      path: 'edit/:id',
      name: 'Edit Event',
      component: EditEvent
    }
  ]
}

const OrdersList = () => import(/* webpackChunkName: "orders" */ 'src/pages/Orders/List')
let ordersRoutes = {
  path: '/orders',
  component: DashboardLayout,
  redirect: '/orders/list',
  children: [
    {
      path: 'list',
      name: 'Orders List',
      component: OrdersList
    },
    {
      path: 'add',
      name: 'Add Order',
      component: CreateOrder
    },
    {
      path: 'edit/:id',
      name: 'Edit Order',
      component: EditOrder
    }
  ]
}


const menuRoutes = {
  path: '/menu',
  component: DashboardLayout,
  children: [
    {
      path: '/',
      component: Menu,
      name: 'Menu List',
    },
  ]
};


const UsersList = () => import(/* webpackChunkName: "users" */ 'src/pages/Users/List')
let usersRoutes = {
  path: '/users',
  component: DashboardLayout,
  redirect: '/users/list',
  children: [
    {
      path: 'list',
      name: 'Users List',
      component: UsersList
    },
    {
      path: 'add',
      name: 'Add User',
      component: CreateUser
    },
    {
      path: 'edit/:id',
      name: 'Edit User',
      component: EditUser
    }
  ]
}


const settingRoutes = {
  path: '/settings',
  component: DashboardLayout,
  children:[
    {
      path: '/settings',
      component: SettingsTabs
    }
  ]
}


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      }
    ]
  },
  componentsMenu, formsMenu, tablesMenu, mapsMenu, pagesMenu, loginPage, registerPage, lockPage,
  menuRoutes,
  hotelsRoutes,
  businessRoutes,
  menusRoutes,
  branchesRoutes,
  DiaaRoutes,
  floorsRoutes,
  servicesRoutes,
  eventsRoutes,
  ordersRoutes,
  usersRoutes,
  categoriesRoutes,
  settingRoutes,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
      }
    ]
  },
  {path: '*', component: NotFound}
];


const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history',
  scrollBehavior: to => to.hash ? {selector: to.hash} : {x: 0, y: 0}
})
router.beforeEach(async (to, from, next) => {

  const isAuth = (await isAuthenticated(store));
  if (to.name === 'Login' && isAuth || to.name === 'Register' && isAuth)
    return next({name: 'Overview'})

  if (!isAuth && (to.name === 'Login' || to.name === 'Register'))
    return next()

  return isAuth ? next() : next({name: 'Login'})
})
export default router
