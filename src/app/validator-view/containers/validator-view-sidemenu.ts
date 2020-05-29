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
    name: 'Validator Menu'
  },
  {
    name: 'Document',
    url: '/',
    icon: 'fa fa-suitcase',
    permission: 'DATA_ANALYST',

    children: [
      {
        name: 'Analytics',
        url: '/validator-view/analytics',
        icon: 'fa fa-line-chart',
        permission: 'DATA_ANALYST'
      },
      {
        name: 'Validate Document',
        url: '/validator-view/pending-documents',
        icon: 'fa fa-gavel',
        permission: 'DATA_ANALYST'
      },
      {
        name: 'Approved Docs',
        url: '/validator-view/approved-documents',
        icon: 'fa fa-check-square',
        permission: 'DATA_ANALYST'
      },
      {
        name: 'Rejected Docs',
        url: '/validator-view/rejected-documents',
        icon: 'fa fa-times',
        permission: 'DATA_ANALYST'
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
    name: 'My Profile',
    url: '/profile',
    icon: 'fa fa-street-view'
  }







];
