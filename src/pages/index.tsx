import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const modules = [
  { name: 'Comercial', screens: 3, to: '/comercial/vent0100' },
  { name: 'Financeiro', screens: 9, to: '/financeiro/vfin0100' },
  { name: 'Fiscal', screens: 20, to: '/fiscal/vfis0100' },
  { name: 'Contabilidade', screens: 3, to: '/contabilidade/vctb0102' },
  { name: 'Cadastros', screens: 6, to: '/cadastros/vcal0100' },
  { name: 'Engenharia', screens: 17, to: '/engenharia/veng0204' },
  { name: 'Almoxarifado', screens: 2, to: '/almoxarifado/vent0800' },
  { name: 'Planejamento', screens: 3, to: '/planejamento/vpla0102' },
  { name: 'Previsao de Vendas', screens: 5, to: '/previsao/vpre0101' },
  { name: 'Assistencia Tecnica', screens: 5, to: '/assistencia/vass0201' },
  { name: 'Garantia', screens: 1, to: '/garantia/vgar0211' },
  { name: 'Cliente', screens: 6, to: '/cliente/vcli0117' },
  { name: 'Custos / Precificacao', screens: 1, to: '/custos/vcst0202' },
  { name: 'PDV / Pedidos', screens: 6, to: '/pdv/vpdv0108' },
  { name: 'Manutencao', screens: 2, to: '/manutencao/vman0202' },
  { name: 'Suprimento', screens: 7, to: '/suprimento/vavr0200' },
  { name: 'Importacao', screens: 3, to: '/importacao/vimp0101' },
  { name: 'Inspecao', screens: 11, to: '/inspecao/vavf0101' },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroStats}>
          110 telas documentadas &middot; 18 modulos &middot; Atualizado Junho 2026
        </p>
      </div>
    </header>
  );
}

function ModuleCard({name, screens, to}: {name: string; screens: number; to: string}) {
  return (
    <Link to={to} className={styles.moduleCard}>
      <div className={styles.moduleCardHeader}>
        <span className={styles.moduleName}>{name}</span>
        <span className={styles.moduleBadge}>{screens} telas</span>
      </div>
    </Link>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentacao completa de todas as telas do sistema ERP Venture Desktop.">
      <HomepageHeader />
      <main className={styles.mainContent}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            Modulos
          </Heading>
          <div className={styles.moduleGrid}>
            {modules.map((mod) => (
              <ModuleCard key={mod.name} {...mod} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
