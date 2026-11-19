/* Genera: questions.js (opciones barajadas), 06-practice-exam.md y guia.html
   Uso: node build.js */
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const SRC = require('./questions.src.js');

/* ---------- 1. Barajar opciones con semilla fija y remapear letras ---------- */
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20261109);
const L = ['A', 'B', 'C', 'D'];
const QS = SRC.map(function (q) {
  const idx = q.o.map(function (_, i) { return i; });
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  const newPos = {}; idx.forEach(function (oldI, newI) { newPos[oldI] = newI; });
  const e = q.e.replace(/\b([A-D])\b/g, function (m, l) { return L[newPos[L.indexOf(l)]]; });
  return { id: q.id, d: q.d, t: q.t, q: q.q, o: idx.map(function (i) { return q.o[i]; }), a: q.a.map(function (i) { return newPos[i]; }).sort(), e: e };
});
fs.writeFileSync(path.join(dir, 'questions.js'), '/* Generado por build.js. No editar: edita questions.src.js */\nwindow.QUESTIONS = ' + JSON.stringify(QS, null, 1) + ';\n');

/* ---------- 2. Examen en Markdown ---------- */
const DN = { 1: 'Conceptos de la nube', 2: 'Seguridad y cumplimiento', 3: 'Tecnología y servicios', 4: 'Facturación, precios y soporte' };
let md = '# Examen de práctica AWS Certified Cloud Practitioner (CLF-C02)\n\n';
md += '- **Preguntas:** 65 (opción única y respuesta múltiple)\n- **Tiempo:** 90 minutos\n- **Aprobación:** 700 de 1000 (en este simulacro es una estimación, ver `exam.html`)\n';
md += '- **Distribución:** Dominio 1: 16, Dominio 2: 19, Dominio 3: 22, Dominio 4: 8\n- Las preguntas "Seleccione DOS" se califican como todo o nada.\n- Responde primero **sin mirar** la clave de respuestas. Para la experiencia con cronómetro usa `exam.html`.\n\n---\n\n';
QS.forEach(function (q, n) {
  md += '### Pregunta ' + (n + 1) + '\n\n' + q.q + (q.t === 'multi' ? ' *(seleccione ' + q.a.length + ')*' : '') + '\n\n';
  q.o.forEach(function (o, i) { md += '- ' + L[i] + '. ' + o + '\n'; });
  md += '\n';
});
md += '---\n\n# Clave de respuestas y explicaciones\n\n';
QS.forEach(function (q, n) {
  md += '### ' + (n + 1) + '. Dominio ' + q.d + ' (' + DN[q.d] + ')\n\n**Respuesta:** ' + q.a.map(function (i) { return L[i]; }).join(', ') + '\n\n' + q.e + '\n\n';
});
fs.writeFileSync(path.join(dir, '06-practice-exam.md'), md);

/* ---------- 3. guia.html (todas las guías en un solo documento) ---------- */
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
const SECTIONS = [
  ['README.md', 'inicio', 'Inicio'],
  ['01-conceptos-de-la-nube.md', 'dominio-1', 'D1 Conceptos de la nube'],
  ['02-seguridad-y-cumplimiento.md', 'dominio-2', 'D2 Seguridad y cumplimiento'],
  ['03-tecnologia-y-servicios.md', 'dominio-3', 'D3 Tecnología y servicios'],
  ['04-facturacion-precios-y-soporte.md', 'dominio-4', 'D4 Facturación y soporte'],
  ['05-cronograma.md', 'cronograma', 'Cronograma'],
  ['07-skill-builder.md', 'skill-builder', 'Skill Builder']
];
const linkMap = {}; SECTIONS.forEach(function (s) { linkMap[s[0]] = '#' + s[1]; });
function inline(t) {
  t = esc(t);
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, txt, href) {
    const target = linkMap[href] || href.replace(/&amp;/g, '&');
    const ext = /^https?:/.test(target) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<a href="' + target + '"' + ext + '>' + txt + '</a>';
  });
  t = t.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  return t;
}
function convert(src) {
  const lines = src.replace(/\r/g, '').split('\n'); let out = ''; let i = 0;
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\s*$/.test(ln)) { i++; continue; }
    let m;
    if ((m = ln.match(/^(#{1,4})\s+(.*)$/))) { out += '<h' + m[1].length + '>' + inline(m[2]) + '</h' + m[1].length + '>\n'; i++; continue; }
    if (/^---+$/.test(ln)) { out += '<hr>\n'; i++; continue; }
    if (/^\|/.test(ln)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = function (r) { return r.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map(function (c) { return c.trim(); }); };
      out += '<div class="tw"><table><thead><tr>' + cells(rows[0]).map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
      rows.slice(2).forEach(function (r) { out += '<tr>' + cells(r).map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; });
      out += '</tbody></table></div>\n'; continue;
    }
    if (/^>/.test(ln)) { const b = []; while (i < lines.length && /^>/.test(lines[i])) { b.push(lines[i].replace(/^>\s?/, '')); i++; } out += '<blockquote>' + inline(b.join(' ')) + '</blockquote>\n'; continue; }
    if (/^\s*[-*]\s+/.test(ln)) {
      out += '<ul>'; while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        let t = lines[i].replace(/^\s*[-*]\s+/, '');
        const cb = t.match(/^\[( |x)\]\s+(.*)$/);
        out += cb ? '<li class="cb"><label><input type="checkbox"' + (cb[1] === 'x' ? ' checked' : '') + '> ' + inline(cb[2]) + '</label></li>' : '<li>' + inline(t) + '</li>'; i++;
      } out += '</ul>\n'; continue;
    }
    if (/^\d+\.\s+/.test(ln)) {
      out += '<ol>'; while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { out += '<li>' + inline(lines[i].replace(/^\d+\.\s+/, '')) + '</li>'; i++; } out += '</ol>\n'; continue;
    }
    const p = []; while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|\||>|---+$|\s*[-*]\s|\d+\.\s)/.test(lines[i])) { p.push(lines[i]); i++; }
    out += '<p>' + inline(p.join(' ')) + '</p>\n';
  }
  return out;
}
let nav = '', body = '';
SECTIONS.forEach(function (s) {
  const html = convert(fs.readFileSync(path.join(dir, s[0]), 'utf8'));
  nav += '<a href="#' + s[1] + '">' + s[2] + '</a>';
  body += '<section id="' + s[1] + '">' + html + '</section>\n';
});
const page = '<!DOCTYPE html>\n<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Guía AWS Cloud Practitioner (CLF-C02)</title>\n<style>\n' +
  ':root{--bg:#f7f8fa;--fg:#16191f;--mut:#5f6b7a;--acc:#b85c00;--card:#fff;--bd:#d5dbdb;--nav:#232f3e}\n' +
  '*{box-sizing:border-box}body{margin:0;font:16px/1.6 system-ui,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--fg)}\n' +
  'header{background:var(--nav);color:#fff;padding:12px 20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}\n' +
  'header h1{font-size:18px;margin:0}nav{display:flex;flex-wrap:wrap;gap:6px}nav a,.btn{color:#fff;text-decoration:none;padding:6px 12px;border-radius:6px;background:#37475a;font-size:14px}\n' +
  'nav a:hover,nav a:focus,.btn:hover{background:#ec7211;outline:none}.btn{background:#ec7211;font-weight:600}\n' +
  'main{max-width:960px;margin:0 auto;padding:24px 16px 64px}section{background:var(--card);border:1px solid var(--bd);border-radius:10px;padding:8px 28px 20px;margin-bottom:24px}\n' +
  'h1,h2,h3{line-height:1.25}h1{color:var(--nav)}h2{border-bottom:2px solid var(--bd);padding-bottom:4px;margin-top:28px}h3{color:var(--acc)}\n' +
  'code{background:#eef1f3;padding:1px 5px;border-radius:4px;font-size:.92em}blockquote{margin:12px 0;padding:8px 14px;border-left:4px solid var(--acc);background:#fff6ec}\n' +
  '.tw{overflow-x:auto}table{border-collapse:collapse;width:100%;margin:12px 0;font-size:15px}th,td{border:1px solid var(--bd);padding:6px 10px;text-align:left;vertical-align:top}th{background:#eef1f3}\n' +
  'li.cb{list-style:none;margin-left:-20px}a{color:#0a5fb4}:focus-visible{outline:3px solid #0a5fb4;outline-offset:2px}\n' +
  '@media print{header{display:none}section{border:0}}\n</style></head><body>\n' +
  '<header><h1>Guía AWS Cloud Practitioner (CLF-C02)</h1><nav aria-label="Secciones">' + nav + '<a class="btn" href="exam.html">Simulador de examen</a></nav></header>\n<main>\n' + body + '</main></body></html>\n';
fs.writeFileSync(path.join(dir, 'guia.html'), page);
console.log('OK: ' + QS.length + ' preguntas; questions.js, 06-practice-exam.md, guia.html generados.');
