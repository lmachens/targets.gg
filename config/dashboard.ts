import type { DashboardConfig } from 'types';

const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Tactics',
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
