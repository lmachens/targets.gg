import type { DashboardConfig } from 'types';

const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Discover',
      href: '/dashboard',
      icon: 'discover',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
      disabled: true,
    },
  ],
};

export default dashboardConfig;
