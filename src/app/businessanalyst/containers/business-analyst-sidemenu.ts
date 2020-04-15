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
      name: 'Analytics'
    },
    
    
    {
      name: 'Analytics',
      url: '/analyst-view/data-clerk-analytics',
      icon: 'fa fa-bar-chart-o',
      permission: 'BUSINESS_ANALYST',
      
      children: [
        {
          name: 'Clerk Analytics',
          url: '/analyst-view/data-clerk-analytics',
          icon: 'fa fa-users',
          permission: 'BUSINESS_ANALYST'
        },
        {
          name: 'Validator Analytics',
          url: '/analyst-view/data-validator-analytics',
          icon: 'fa fa-address-book',
          permission: 'BUSINESS_ANALYST'
        },
        {
          name: 'Document Analytics',
          url: '/analyst-view/data-document-analytics',
          icon: 'fa fa-envelope-o',
          permission: 'BUSINESS_ANALYST'
        },
        {
          name: 'Department Analytics',
          url: '/analyst-view/data-department-analytics',
          icon: 'fa fa-cubes',
          permission: 'BUSINESS_ANALYST'
        }
      ]
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'fa fa-street-view'
    }

    

    
  
  
    
  ];
  