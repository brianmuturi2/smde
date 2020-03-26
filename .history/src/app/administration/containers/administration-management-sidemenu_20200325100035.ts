interface NavAttributes {
    [propName: string]: any;
  }
  interface NavWrapper {
    attributes: NavAttributes;
    element: string;
  }
  interface NavBadge {
    text: string;
    variant: string;
  }
  interface NavLabel {
    class?: string;
    variant: string;
  }
  
  export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    permission?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
  }
  
  export const navItems: NavData[] = [
    {
      title: true,
      name: 'System Administration'
    },
    
    
    {
      name: 'User Management',
      url: '/',
      icon: 'fa fa-group',
      permission: 'DATA_DEPARTMENT_HEAD',
      
      children: [
        {
          name: 'Staff Listing',
          url: '/administration/staff-listing',
          icon: 'fa fa-users',
          permission: 'DATA_DEPARTMENT_HEAD'
        },
        {
          name: 'New Staff',
          url: '/administration/staff-registration',
          icon: 'fa fa-user-plus',
          permission: 'DATA_DEPARTMENT_HEAD'
        }
      ]
    },
    {
      name: 'Document Manager',
      url: '/',
      icon: 'fa fa-suitcase',
      permission: 'DATA_DEPARTMENT_HEAD',
      
      children: [
        {
          name: 'Document Listing',
          url: '/document-manager/document-listing',
          icon: 'fa fa-hdd-o',
          permission: 'DATA_DEPARTMENT_HEAD'
        },
        {
          name: 'Revoked Documents',
          url: '/document-manager/revoked-documents',
          icon: 'fa fa-exclamation-triangle',
          permission: 'DATA_DEPARTMENT_HEAD'
        }
      ]
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'fa fa-street-view'
    }

    

    
  
  
    
  ];
  