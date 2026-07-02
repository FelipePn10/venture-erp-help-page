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
    algolia: {
      appId: 'UGQA22ALT4',
      apiKey: '5fbb424f14cd4bebb23ed474b44b0d6a',
      indexName: 'Venture ERP Documentação',
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'VENTURE',
      hideOnScroll: false,
      items: [
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Processos',
          items: [
            {
              label: 'Índice Geral',
              to: '/indice',
            },
            {
              label: 'Financeiro, Contábil e Cadastros',
              to: '/financeiro/vfin0100',
            },
            {
              label: 'Industrial e Produção',
              to: '/engenharia/vent0200',
            },
            {
              label: 'Comercial, Vendas e PDV',
              to: '/pdv/vpdv0200',
            },
          ],
        },
        {
          title: 'Processos',
          items: [
            {
              label: 'Fiscal',
              to: '/fiscal/vfis0100',
            },
            {
              label: 'PCP, Chão de Fábrica e Estoque',
              to: '/pcp/vmrp0100',
            },
            {
              label: 'Suprimento e Compras',
              to: '/compras/vsup0500',
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
