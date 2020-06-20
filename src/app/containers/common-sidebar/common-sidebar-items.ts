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
  permission?: any[];
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
    permission: [''],
  },

  {
    name: 'Clerk Menu',
    url: '/clerk-view/clerk-dashboard',
    icon: 'fa fa-user-plus',
    permission: ['DATA_CLERK'],
    children: [
      {
        name: 'Analytics',
        url: '/clerk-view/clerk-dashboard',
        icon: 'fa fa-line-chart',
        permission: ['DATA_CLERK']
      },
      {
        name: 'Upload Document',
        url: '/clerk-view/upload-file',
        icon: 'fa fa-cloud-upload',
        permission: ['DATA_CLERK']
      },
      {
        name: 'My Documents',
        url: '/clerk-view/my-document',
        icon: 'fa fa-hand-lizard-o',
        permission: ['DATA_CLERK']
      },
      {
        name: 'Pending Documents',
        url: '/clerk-view/pending-validation',
        icon: 'fa fa-exchange',
        permission: ['DATA_CLERK']
      },
      {
        name: 'Approved',
        url: '/clerk-view/approved-documents',
        icon: 'fa fa-check-square',
        permission: ['DATA_CLERK']
      },

      {
        name: 'Rejected',
        url: '/clerk-view/rejected-documents',
        icon: 'fa fa-times',
        permission: ['DATA_CLERK']
      },
      {
        name: 'Resubmitted',
        url: '/clerk-view/resubmitted-documents',
        icon: 'fa fa-times',
        permission: ['DATA_CLERK']
      }
    ]

  },
  {
    name: 'Validator Menu',
    url: '/validator-view/analytics',
    icon: 'fa fa-check',
    permission: ['DATA_ANALYST'],
    children: [
      {
        name: 'Analytics',
        url: '/validator-view/analytics',
        icon: 'fa fa-line-chart',
        permission: ['DATA_ANALYST']
      },
      {
        name: 'Validate Document',
        url: '/validator-view/pending-documents',
        icon: 'fa fa-gavel',
        permission: ['DATA_ANALYST']
      },
      {
        name: 'Approved Docs',
        url: '/validator-view/approved-documents',
        icon: 'fa fa-check-square',
        permission: ['DATA_ANALYST']
      },
      {
        name: 'Rejected Docs',
        url: '/validator-view/rejected-documents',
        icon: 'fa fa-times',
        permission: ['DATA_ANALYST']
      },
      // {
      //   name: 'Resubmitted Docs',
      //   url: '/validator-view/rejected-documents',
      //   icon: 'fa fa-reply',
      //   permission: 'DATA_ANALYST'
      // }
    ]

  },
  {
    name: 'Pre Validator Menu',
    url: '/validator-view/analytics',
    icon: 'fa fa-users',
    permission: ['DATA_PREVALIDATOR']
  },
  {
    name: 'Document Manager',
    url: '/administration/staff-registration',
    icon: 'fa fa-book',
    permission: ['DOCUMENT_MANAGER'],
    children: [

      {
        name: 'Department Listing',
        url: '/administration/department-listing',
        icon: 'fa fa-microchip',
        permission: ['DOCUMENT_MANAGER']
      },
    ]

  },
  {
    name: 'User Management',
    url: '/administration/staff-registration',
    icon: 'fa fa-users',
    permission: ['USER_MANAGER', 'TEAM_LEADER'],
    children: [
      {
        name: 'Staff Listing',
        url: '/administration/staff-listing',
        icon: 'fa fa-users',
        permission: ['USER_MANAGER', 'TEAM_LEADER']
      },
      {
        name: 'New Staff',
        url: '/administration/staff-registration',
        icon: 'fa fa-user-plus',
        permission: ['USER_MANAGER']
      }
    ]



  },
  {
    name: 'ANALYTICS',
    url: '/analyst-view/data-clerk-analytics',
    icon: 'fa fa-bar-chart',
    permission: ['BUSINESS_ANALYST'],
    children: [
      {
        name: 'Clerk Analytics',
        url: '/analyst-view/data-clerk-analytics',
        icon: 'fa fa-users',
        permission: ['BUSINESS_ANALYST']
      },
      {
        name: 'Validator Analytics',
        url: '/analyst-view/data-validator-analytics',
        icon: 'fa fa-address-book',
        permission: ['BUSINESS_ANALYST']
      },
      {
        name: 'Document Analytics',
        url: '/analyst-view/data-document-analytics',
        icon: 'fa fa-envelope-o',
        permission: ['BUSINESS_ANALYST']
      },
      {
        name: 'Department Analytics',
        url: '/analyst-view/data-department-analytics',
        icon: 'fa fa-cubes',
        permission: ['BUSINESS_ANALYST']
      }
    ]
  },
  {
    name: 'CLEANER',
    url: '/cleaner-view/capture-data',
    icon: 'fa fa-paint-brush',
    // permission: '',
    permission: ['DATA_CLEANER'],
     children: [
      {
        name: 'Check List',
        url: '/cleaner-view/capture-data',
        icon: 'fa fa-credit-card-alt',
        // permission: 'DATA_CLEANER'
        permission: ['DATA_CLEANER']
      },

     ]
  },
  {
    name: 'AUDITOR',
    url: '/auditor-view/validate-document',
    icon: 'fa fa-certificate',
    permission: ['DATA_AUDITOR', ]

    //  permission: 'DATA_AUDITOR',
  },




  {
    name: 'Profile',
    url: '/profile',
    icon: 'fa fa-street-view',
    permission: []
  }







  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
