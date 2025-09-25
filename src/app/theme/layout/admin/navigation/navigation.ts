export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home'
      },
      {
        id: 'user',
        title: 'User Detail',
        type: 'item',
        url: '/user',
        icon: 'feather icon-user'
      },
      {
        id: 'transfer',
        title: 'Transfer',
        type: 'item',
        url: '/transfer',
        icon: 'feather icon-more-vertical'
      },
      {
        id: 'paymentcredit',
        title: 'Payment Credit',
        type: 'item',
        url: '/paymentcredit',
        icon: 'feather icon-more-vertical'
      },
      {
        id: 'balance',
        title: 'Check-Balance',
        type: 'item',
        url: '/check-balance',
        icon: 'feather icon-more-vertical'
      },
      {
        id: 'wallettransfer',
        title: 'WalletTransfer',
        type: 'item',
        url: '/wallettransfer',
        icon: 'feather icon-more-vertical'
      },
      // ✅ Added Transactions
      {
        id: 'transactions',
        title: 'Transactions',
        type: 'item',
        url: '/transactions',
        icon: 'feather icon-list'
      },
      // ✅ Added Refund
      {
        id: 'refund',
        title: 'Refund',
        type: 'item',
        url: '/refund',
        icon: 'feather icon-rotate-ccw'
      }
    ]
  },
  {
    id: 'ui-component',
    title: 'Ui Component',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/component/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/component/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/component/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/component/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/component/typography'
          }
        ]
      }
    ]
  },
  {
    id: 'Authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'signup',
        title: 'Sign up',
        type: 'item',
        url: '/register',
        icon: 'feather icon-at-sign',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'signin',
        title: 'Sign in',
        type: 'item',
        url: '/login',
        icon: 'feather icon-log-in',
        target: true,
        breadcrumbs: false
      }
    ]
  }
];
