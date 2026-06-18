import WebSocket from 'ws';
import { writeFileSync } from 'fs';

const TARGET = process.argv[2] || 'http://localhost:3000';
const OUT = process.argv[3] || '.verify/landing.png';

const list = await (await fetch('http://localhost:9222/json/list')).json();
let tab = list.find(t => t.type === 'page');
if (!tab) {
  const r = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
  tab = await r.json();
}
const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (method, params={}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({id:i, method, params})); });
ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise(r => ws.on('open', r));
await send('Page.enable');
await send('Page.navigate', { url: TARGET });
await new Promise(r => setTimeout(r, 4000));
const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true });
writeFileSync(OUT, Buffer.from(data, 'base64'));
console.log('OK ->', OUT);
ws.close(); process.exit(0);
