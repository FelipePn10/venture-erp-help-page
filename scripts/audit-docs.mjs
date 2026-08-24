import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const frontendCatalog = path.resolve(root, '../app-venture/src/types/erpScreen.ts');

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : target.endsWith('.mdx') ? [target] : [];
  });
}

function fail(message) {
  problems.push(message);
}

const allDocs = walk(docsRoot);
const screenDocs = allDocs.filter((file) => path.basename(file) !== 'intro.mdx');
const problems = [];
const warnings = [];
const requiredSections = [
  ['Objetivo', /^## Objetivo\s*$/im],
  ['Pré-requisitos', /^## Pr[eé]-requisitos\s*$/im],
  ['Passo a passo', /^## Passo a passo\s*$/im],
  ['Observações ou regras importantes', /^## (?:Observa[cç][oõ]es|Regras|Cuidados)(?: importantes| e erros)?\s*$/im],
  ['Telas relacionadas', /^## Telas relacionadas\s*$/im],
];

const slugByFile = new Map(
  allDocs.map((file) => {
    const relative = path.relative(docsRoot, file).replace(/\.mdx$/, '').replaceAll(path.sep, '/');
    return [file, relative === 'intro' ? '/indice' : `/${relative}`];
  }),
);
const validSlugs = new Set(slugByFile.values());

for (const file of screenDocs) {
  const relative = path.relative(root, file);
  const ownCode = path.basename(file, '.mdx').toUpperCase();
  const source = fs.readFileSync(file, 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    fail(`${relative}: front matter ausente`);
    continue;
  }
  for (const key of ['title:', 'description:', 'sidebar_position:']) {
    if (!frontmatter[1].includes(key)) fail(`${relative}: ${key.slice(0, -1)} ausente no front matter`);
  }
  if (!new RegExp(`^# ${ownCode}\\b`, 'm').test(source)) fail(`${relative}: título principal não começa com ${ownCode}`);
  if (!new RegExp(`^title:\\s*["']?${ownCode}\\b`, 'm').test(frontmatter[1])) {
    fail(`${relative}: título do front matter não começa com ${ownCode}`);
  }
  for (const [label, pattern] of requiredSections) {
    if (!pattern.test(source)) fail(`${relative}: seção “${label}” ausente`);
  }
  const words = (source.replace(/^---[\s\S]*?---/, '').match(/[\p{L}\p{N}]+/gu) ?? []).length;
  if (words < 180) warnings.push(`${relative}: conteúdo curto (${words} palavras)`);
  for (const match of source.matchAll(/\]\((\/[^)#?\s]+)(?:[)#?])/g)) {
    const slug = match[1].replace(/\/$/, '');
    if (!validSlugs.has(slug)) fail(`${relative}: link interno inexistente ${slug}`);
  }
}

if (fs.existsSync(frontendCatalog)) {
  const catalogSource = fs.readFileSync(frontendCatalog, 'utf8');
  const catalogCodes = [...catalogSource.matchAll(/code:\s*['"]([A-Z0-9]+)['"]/g)].map((match) => match[1]);
  const catalogSet = new Set(catalogCodes);
  const documentedSet = new Set(screenDocs.map((file) => path.basename(file, '.mdx').toUpperCase()));
  for (const code of catalogSet) if (!documentedSet.has(code)) fail(`catálogo: tela ${code} sem documentação`);
  for (const code of documentedSet) if (!catalogSet.has(code)) fail(`documentação: tela ${code} não existe no catálogo`);

  for (const file of screenDocs) {
    const relative = path.relative(root, file);
    const ownCode = path.basename(file, '.mdx').toUpperCase();
    const source = fs.readFileSync(file, 'utf8');
    const mentioned = new Set(source.match(/\bV[A-Z]{2,4}\d{4}(?:ITE)?\b/g) ?? []);
    for (const code of mentioned) {
      if (code !== ownCode && !catalogSet.has(code)) warnings.push(`${relative}: referência não catalogada ${code}`);
    }
  }
} else {
  warnings.push('catálogo do frontend não encontrado; cobertura não foi comparada');
}

const sidebarSource = fs.readFileSync(path.join(root, 'sidebars.ts'), 'utf8');
const sidebarItems = new Set(
  [...sidebarSource.matchAll(/['"]([a-z-]+\/[a-z0-9]+)['"]/g)].map((match) => match[1]),
);
for (const file of screenDocs) {
  const item = path.relative(docsRoot, file).replace(/\.mdx$/, '').replaceAll(path.sep, '/');
  if (!sidebarItems.has(item)) fail(`${item}: página fora do menu lateral`);
}

console.log(`Telas documentadas: ${screenDocs.length}`);
console.log(`Problemas: ${problems.length}`);
console.log(`Avisos editoriais: ${warnings.length}`);
for (const warning of warnings) console.warn(`AVISO: ${warning}`);
for (const problem of problems) console.error(`ERRO: ${problem}`);
if (problems.length) process.exitCode = 1;
