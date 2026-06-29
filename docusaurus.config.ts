import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Venture ERP Docs',
  tagline: 'Documentação completa das telas do sistema ERP Venture',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://help.venturerp.com',
  baseUrl: '/',

  organizationName: 'ventureerp',
  projectName: 'venture-help',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'VENTURE',
      logo: {
        alt: 'VENTURE',
        src: 'img/logo.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'Índice de Telas',
              to: '/indice',
            },
            {
              label: 'Comercial',
              to: '/comercial/vent0100',
            },
            {
              label: 'Financeiro',
              to: '/financeiro/vfin0100',
            },
            {
              label: 'Fiscal',
              to: '/fiscal/vfis0100',
            },
          ],
        },
        {
          title: 'Módulos',
          items: [
            {
              label: 'Engenharia',
              to: '/engenharia/veng0204',
            },
            {
              label: 'Suprimento',
              to: '/suprimento/vavr0200',
            },
            {
              label: 'Inspeção',
              to: '/inspecao/vavf0101',
            },
            {
              label: 'PDV / Pedidos',
              to: '/pdv/vpdv0108',
            },
          ],
        },
        {
          title: 'Contato',
          items: [
            {
              label: 'Site Oficial',
              href: 'https://venturerp.com',
            },
            {
              label: 'contato@venturerp.com',
              href: 'mailto:contato@venturerp.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VentureERP. Todos os direitos reservados.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
