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
      name: 'Clerk Menu'
    },
    {
      name: 'Document',
      url: '/',
      icon: 'fa fa-suitcase',


      children: [
        {
          name: 'Analytics',
          url: '/cleaner-view/cleaner-dashboard',
          icon: 'fa fa-line-chart',
          permission: 'DATA_CLEANER'
        },
        {
          name: 'File Search',
          url: '/cleaner-view/file-search',
          icon: 'fa fa-exchange',
          permission: 'DATA_CLEANER'
        },
        {
          name: 'Capture Data',
          url: '/cleaner-view/capture-data',
          icon: 'fa fa-exchange',
          permission: 'DATA_CLEANER'
        },

      ]
    },
    {
      name: 'My Profile',
      url: '/profile',
      icon: 'fa fa-street-view'
    }







  ];