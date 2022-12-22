import type Icons from 'components/Icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon: keyof typeof Icons;
  href: string;
};

export type SiteConfig = {
  name: string;
  links: {
    github: string;
    discord: string;
    discordWidget: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type Game = {
  title: string;
  logoSrc: string;
  gameClassId: number;
  backgroundImages: { label: string; value: string }[];
};

export type Tool =
  | 'Move'
  | 'Select'
  | 'Brush'
  | 'Rectangle'
  | 'Circle'
  | 'Text'
  | string;

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
