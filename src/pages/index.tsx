import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type ModuleLink = {name: string; to: string};
type Process = {
  title: string;
  summary: string;
  modules: ModuleLink[];
};

const processes: Process[] = [
  {
    title: 'Financeiro, Contábil e Cadastros',
    summary:
      'A espinha dorsal administrativa: contas, títulos, apuração de impostos, contabilidade SPED e os cadastros que fundam o sistema.',
    modules: [
      {name: 'Financeiro', to: '/financeiro/vfin0100'},
      {name: 'Contabilidade', to: '/contabilidade/vctb0102'},
      {name: 'Cadastros', to: '/cadastros/vemp0100'},
    ],
  },
  {
    title: 'Industrial e Produção',
    summary:
      'Do item de engenharia ao produto acabado: estrutura, roteiro, planejamento, inspeção, importação, assistência e garantia.',
    modules: [
      {name: 'Engenharia', to: '/engenharia/vent0200'},
      {name: 'Planejamento', to: '/planejamento/vpla0102'},
      {name: 'Previsão de Vendas', to: '/previsao/vpre0101'},
      {name: 'Manutenção', to: '/manutencao/vman0202'},
      {name: 'Suprimento', to: '/suprimento/vavr0200'},
      {name: 'Importação', to: '/importacao/vimp0101'},
      {name: 'Inspeção', to: '/inspecao/vins0200'},
      {name: 'Assistência', to: '/assistencia/vass0201'},
      {name: 'Garantia', to: '/garantia/vgar0211'},
    ],
  },
  {
    title: 'Comercial, Vendas e PDV',
    summary:
      'O coração do fluxo operacional: cadastro de cliente, políticas comerciais, pedido de venda, precificação e expedição.',
    modules: [
      {name: 'Comercial', to: '/comercial/vent0100'},
      {name: 'Cliente', to: '/cliente/vcli0500'},
      {name: 'PDV / Pedidos', to: '/pdv/vpdv0200'},
      {name: 'Almoxarifado', to: '/almoxarifado/vent0800'},
      {name: 'Custos / Precificação', to: '/custos/vcst0202'},
    ],
  },
  {
    title: 'Fiscal',
    summary:
      'O ciclo tributário completo: configuração do emitente, tabelas, emissão de NF-e / NFS-e / CT-e e apuração de impostos.',
    modules: [{name: 'Fiscal', to: '/fiscal/vfis0100'}],
  },
  {
    title: 'PCP, Chão de Fábrica, Estoque e Custos',
    summary:
      'Transforma a demanda em produto acabado: MRP, CRP/APS, ordem de produção, plano de corte, custos, estoque e romaneio.',
    modules: [{name: 'PCP / Chão de Fábrica', to: '/pcp/vmrp0100'}],
  },
  {
    title: 'Suprimento e Compras',
    summary:
      'O ciclo de aquisição integrado ao MRP: cadastro de fornecedor, mestres de compra, solicitação, cotação e pedido de compra.',
    modules: [{name: 'Suprimento e Compras', to: '/compras/vsup0500'}],
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <span className={styles.heroEyebrow}>Documentação de Telas</span>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.heroActions}>
          <Link className={styles.heroButtonPrimary} to="/indice">
            Explorar a documentação
          </Link>
          <Link className={styles.heroButtonGhost} to="/financeiro/vfin0100">
            Começar pelo Financeiro
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProcessCard({process}: {process: Process}) {
  return (
    <div className={styles.processCard}>
      <div className={styles.processHeader}>
        <Heading as="h3" className={styles.processTitle}>
          {process.title}
        </Heading>
        <p className={styles.processSummary}>{process.summary}</p>
      </div>
      <div className={styles.moduleChips}>
        {process.modules.map((mod) => (
          <Link key={mod.name} to={mod.to} className={styles.moduleChip}>
            {mod.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentação completa de todas as telas do sistema ERP Venture Desktop.">
      <HomepageHeader />
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <Heading as="h2" className={styles.sectionTitle}>
              Processos de Negócio
            </Heading>
            <p className={styles.sectionLead}>
              A documentação é organizada por processos — o fluxo real de trabalho —
              e não por menus. Escolha um processo para percorrer suas telas.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processes.map((process) => (
              <ProcessCard key={process.title} process={process} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
