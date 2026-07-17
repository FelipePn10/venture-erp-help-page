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
  accent: string;
  start: string;
  modules: ModuleLink[];
};

const processes: Process[] = [
  {
    title: 'Financeiro, Contábil e Cadastros',
    summary:
      'A espinha dorsal administrativa: contas, títulos, adiantamentos, remessa/retorno bancário, apuração de impostos, contabilidade SPED e os cadastros que fundam o sistema.',
    accent: '#059669',
    start: '/financeiro/vfin0100',
    modules: [
      {name: 'Financeiro', to: '/financeiro/vfin0100'},
      {name: 'Contabilidade', to: '/contabilidade/vctb0102'},
      {name: 'Cadastros & Plataforma', to: '/cadastros/vemp0100'},
    ],
  },
  {
    title: 'Industrial e Produção',
    summary:
      'Do item de engenharia ao produto acabado: estrutura, roteiro, configurador, planejamento, inspeção, importação, terceiros, assistência e garantia.',
    accent: '#d97706',
    start: '/engenharia/vent0200',
    modules: [
      {name: 'Engenharia', to: '/engenharia/vent0200'},
      {name: 'Planejamento', to: '/planejamento/vpla0102'},
      {name: 'Previsão', to: '/previsao/vpre0101'},
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
      'O coração do fluxo operacional: cliente, orçamento, representantes e metas, pedido de venda, precificação, SAC, almoxarifado e expedição.',
    accent: '#4f46e5',
    start: '/pdv/vpdv0200',
    modules: [
      {name: 'Comercial', to: '/comercial/vent0100'},
      {name: 'Cliente', to: '/cliente/vcli0500'},
      {name: 'PDV / Pedidos', to: '/pdv/vpdv0200'},
      {name: 'Almoxarifado', to: '/almoxarifado/vent0800'},
      {name: 'Custos', to: '/custos/vcst0202'},
    ],
  },
  {
    title: 'Fiscal',
    summary:
      'O ciclo tributário completo: configuração do emitente, tabelas, IBPT, emissão de NF-e / NFS-e / CT-e, manifestação, SPED EFD e apuração de impostos.',
    accent: '#0d9488',
    start: '/fiscal/vfis0100',
    modules: [{name: 'Fiscal', to: '/fiscal/vfis0100'}],
  },
  {
    title: 'PCP, Chão de Fábrica, Estoque e Custos',
    summary:
      'Transforma a demanda em produto acabado: MRP, CRP/APS, sequenciamento, ordem de produção, plano de corte, ferramentas, custos, estoque e inventário.',
    accent: '#c2410c',
    start: '/pcp/vmrp0100',
    modules: [{name: 'PCP / Chão de Fábrica', to: '/pcp/vmrp0100'}],
  },
  {
    title: 'Suprimento e Compras',
    summary:
      'O ciclo de aquisição integrado ao MRP: fornecedor, mestres de compra, solicitação, cotação, pedido, alçadas, tolerâncias, EDI e homologação.',
    accent: '#15803d',
    start: '/compras/vsup0500',
    modules: [{name: 'Suprimento e Compras', to: '/compras/vsup0500'}],
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <span className={styles.heroEyebrow}>Documentação de Telas · Enterprise</span>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          O guia completo das telas do ERP Venture — organizado pelo{' '}
          <strong>fluxo real de trabalho</strong>, do pedido do cliente à entrega e ao
          faturamento.
        </p>
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
    <div
      className={styles.processCard}
      style={{['--card-accent' as string]: process.accent}}>
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
      <Link to={process.start} className={styles.processStart}>
        Começar por este processo →
      </Link>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentação enterprise das telas do sistema ERP Venture Desktop, organizada por processos de negócio.">
      <HomepageHeader />
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <Heading as="h2" className={styles.sectionTitle}>
              Processos de Negócio
            </Heading>
            <p className={styles.sectionLead}>
              A documentação é organizada por processos — o fluxo real de trabalho — e não
              por menus. Escolha um processo para percorrer suas telas.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processes.map((process) => (
              <ProcessCard key={process.title} process={process} />
            ))}
          </div>

          <div className={styles.usageStrip}>
            <Heading as="h2" className={styles.sectionTitle}>
              Como cada tela é documentada
            </Heading>
            <div className={styles.usageGrid}>
              <div className={styles.usageItem}>
                <span className={styles.usageTag}>Objetivo</span>
                <p>O que a tela resolve, em linguagem de negócio.</p>
              </div>
              <div className={styles.usageItem}>
                <span className={styles.usageTag}>Pré-requisitos</span>
                <p>O que precisa existir antes — cadastros e permissões.</p>
              </div>
              <div className={styles.usageItem}>
                <span className={styles.usageTag}>Passo a passo</span>
                <p>A sequência de ações para concluir a tarefa.</p>
              </div>
              <div className={styles.usageItem}>
                <span className={styles.usageTag}>Campos & Regras</span>
                <p>O significado de cada campo, opções e validações.</p>
              </div>
              <div className={styles.usageItem}>
                <span className={styles.usageTag}>Observações</span>
                <p>Automações, cuidados e comportamentos importantes.</p>
              </div>
              <div className={styles.usageItem}>
                <span className={styles.usageTag}>Telas relacionadas</span>
                <p>Para onde ir antes e depois no processo.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
