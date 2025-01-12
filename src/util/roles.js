import {sidebarLinks} from "./sidebarLinks";
import * as _ from 'lodash';

// Business owner
const userClaims = [
  'Dashboard',
  'Menu',
  'Branches',
  'Diaa',
  'Menus',
  'Categories',
  'Orders',
  'Services',
  'Floors',
  'Tables',
  'Settings',
  'Users'
]



export const userSidebarLinks = (userData) => {
  return _.filter(sidebarLinks, l =>  userClaims.indexOf(l.key) !== -1);
}
