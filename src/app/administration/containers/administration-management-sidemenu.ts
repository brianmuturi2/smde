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
      name: 'Sacco Management Menu'
    },
    {
      name: 'Main Home',
      url: '/sacco-management/dashboard/',
      icon: 'fa fa-home',
      permission: 'can_view_dashboard_menu'
    },
    {
      name: 'Dashboard',
      url: '/sacco-management/dashboard/',
      icon: 'fa fa-area-chart',
      permission: 'can_view_dashboard_menu'
    },
    {
      name: 'Record Setup',
      url: '/base',
      icon: 'fa fa-cogs',
      permission: 'can_view_device_explorer_menu',
      
      children: [
        {
          name: 'Account Category',
          url: '/sacco-management/account-category/',
          icon: 'fa fa-eraser',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Account Type',
          url: '/sacco-management/account-type/',
          icon: 'fa fa-code-fork',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Stage',
          url: '/sacco-management/stage/',
          icon: 'fa fa-institution',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Stage Items',
          url: '/sacco-management/stage-items/',
          icon: 'fa fa-cube',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Stage Defaults',
          url: '/sacco-management/stage-item-default/',
          icon: 'fa fa-cubes',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Vehicle Capacity',
          url: '/sacco-management/vehicle-capacity/',
          icon: 'fa fa-car',
          permission: 'can_add_business_accounts'
        },
      ]
    },
    {
      name: 'Client Records',
      url: '/base',
      icon: 'fa fa-cogs',
      permission: 'can_view_device_explorer_menu',
      
      children: [
        
        {
          name: 'Member Dashboard',
          url: '/sacco-management/member-dashboard/',
          icon: 'fa fa-bar-chart',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Account Registration',
          url: '/sacco-management/member-registration/',
          icon: 'fa fa-id-card',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Account Type',
          url: '/sacco-management/account-type/',
          icon: 'fa fa-code-fork',
          permission: 'can_add_business_accounts'
        },
      ]
    },
    
    // {
    //   name: 'Logout',
    //   url: '/',
    //   icon: 'icon-cloud-download',
    //   class: 'mt-auto',
    //   variant: 'success',
    //   attributes: { target: '_blank', rel: 'noopener' }
    // },
  
  
    
  ];
  