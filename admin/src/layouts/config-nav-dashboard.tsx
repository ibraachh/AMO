import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  info: icon('ic-solar_info-circle-bold'),
  home: icon('ic-solar_home-angle-bold-duotone'),
  profile: icon('profile-icon'),
  phone: icon('ic-solar_phone-bold'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Statistika',
    items: [{ title: 'Saytın aktivliyi', path: paths.dashboard.root, icon: ICONS.analytics }],
  },
  /**
   * Management
   */
  {
    subheader: 'Saytın idarə etməsi',
    items: [
      { title: 'Ana səhifə', path: paths.dashboard.home, icon: ICONS.home },
      {
        title: 'Haqqımızda',
        path: paths.dashboard.about.root,
        icon: ICONS.info,
        children: [
          { title: 'Haqqımızda', path: paths.dashboard.about.main },
          { title: 'Tarixçə', path: paths.dashboard.about.history },
          { title: 'Qurucu mesajı', path: paths.dashboard.about.founderMessage },
        ],
      },
      { title: 'Şirkətlər', path: paths.dashboard.companies.root, icon: ICONS.profile },
      {
        title: 'Medya mərkəzi',
        path: paths.dashboard.mediaCenter.list,
        icon: ICONS.blog,
      },
      {
        title: 'Karyera',
        path: paths.dashboard.career.root,
        icon: ICONS.job,
      },
      {
        title: 'Əlaqə',
        path: paths.dashboard.contact.root,
        icon: ICONS.phone,
      },
    ],
  },
];
