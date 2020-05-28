export interface INavAttributes {
  [propName: string]: any;
}
export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}
export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}
export interface INavLabel {
  class?: string;
  variant: string;
}
export interface INavLinkProps {
  queryParams?: {
      [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: 'merge' | 'preserve' | '';
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
      [k: string]: any;
  };
  routerLinkActiveOptions?: {
      exact: boolean;
  };
  routerLinkActive?: string | string[];
}
export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  permission?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
}

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Main Menu',
    permission: '',
  },

  {
    name: 'Clerk Menu',
    url: '/clerk-view/clerk-dashboard',
    icon: 'fa fa-users',
    permission: 'DATA_CLERK'
  },
  {
    name: 'Validator Menu',
    url: '/validator-view/analytics',
    icon: 'fa fa-users',
    permission: 'DATA_ANALYST'
  },
  {
    name: 'ADMIN',
    url: '/administration/staff-registration',
    icon: 'fa fa-users',
    permission: 'DATA_DEPARTMENT_HEAD',
  },
  {
    name: 'ANALYTICS',
    url: '/analyst-view/data-clerk-analytics',
    icon: 'fa fa-users',
    permission: 'BUSINESS_ANALYST',
  },
  {
    name: 'CLEANER',
    url: '/cleaner-view/capture-data',
    icon: 'fa fa-credit-card-alt',
    // permission: '',
     permission: 'DATA_CLEANER',
  },



  {
    name: 'Profile',
    url: '/profile',
    icon: 'fa fa-street-view',
    permission: '',
  }







  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
