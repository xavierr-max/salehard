import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ChevronDown, MessageCircle, Search, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import './styles.css';
import './overrides.css';
import './status.css';
import './mobile.css';

type Stock = 'Disponível' | 'Indisponível';
type Product = { id: string; name: string; category: string; price: number; description: string; specs: string[]; stock: Stock; accent: string; image: string; tag?: string };

export const products: Product[] = [
  { id: 'kit-amd', name: 'Kit AMD Ryzen 5 5500 + Cooler Hawin VC-120', category: 'Processador + Cooler', price: 529, description: 'Kit com processador AMD Ryzen 5 5500 e cooler Hawin VC-120.', specs: ['6 núcleos e 12 threads', '3.6GHz até 4.2GHz Turbo', 'Cache 19MB', 'Socket AM4', 'Garantia de 12 meses'], stock: 'Indisponível', accent: '#111111', image: '/kit-amd.png', tag: 'Anúncio' },
  { id: 'placa-mae-maxsun', name: 'Placa-mãe Maxsun Challenger A520M-K', category: 'Placa-mãe', price: 399, description: 'Placa-mãe Maxsun Challenger A520M-K para processadores AMD Ryzen.', specs: ['Socket AMD AM4', 'Chipset AMD A520', 'Memória DDR4 até 64GB', 'Formato M-ATX', 'Garantia de 12 meses'], stock: 'Indisponível', accent: '#111111', image: '/placa-mae-maxsun.png', tag: 'Anúncio' },
];

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const whatsapp = (p: Product) => `https://wa.me/5584992157903?text=${encodeURIComponent(`Olá! Tenho interesse no ${p.name}. Gostaria de saber disponibilidade e condições para Natal/RN ou região metropolitana, como Parnamirim.`)}`;

function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return <div className={`product-visual ${large ? 'large' : ''}`}><img src={product.image} alt={product.name}/></div>;
}

function App() {
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('Todos'); const [selected, setSelected] = useState<Product | null>(null);
  const categories = ['Todos', 'Processador + Cooler', 'Placa-mãe'];
  const visible = useMemo(() => products.filter(p => (category === 'Todos' || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <div className="app">
    <header className="topbar"><a className="brand" href="#sh-sale-hard" aria-label="SH · Sale Hard"><img className="brand-icon" src="/natal-hardware-icon.png" alt="Logo SH"/><span>SH <small>Sale Hard</small></span></a><nav><a href="#catalogo">Catálogo</a><a href="#como-funciona">Como funciona</a><a href="#sobre">Sobre a loja</a></nav><a className="header-cta" href="https://wa.me/5584992157903" target="_blank">Falar no WhatsApp <ArrowUpRight size={15}/></a></header>
    <main id="top">
      <section className="hero wrap"><div className="hero-copy"><div className="eyebrow" id="sh-sale-hard">$ SH · Sale Hard</div><h1>Hardware bom.<br/><span>Sem enrolação.</span></h1><p>Peças selecionadas para você comprar com orientação de verdade, com vendas para Natal/RN e regiões metropolitanas, como Parnamirim.</p><div className="hero-actions"><a className="button primary" href="#catalogo">Explorar catálogo <ArrowUpRight size={16}/></a><a className="text-link" href="https://wa.me/5584992157903" target="_blank"><MessageCircle size={17}/> Tirar uma dúvida</a></div><div className="hero-note"><ShieldCheck size={16}/> Natal/RN e região metropolitana · Compra por contato · Sem checkout online</div></div><div className="hero-map"><img src="/mapa-natal-hero.png" alt="Mapa de Natal, Rio Grande do Norte"/></div></section>
      <section id="catalogo" className="catalog wrap"><div className="section-heading"><div><div className="eyebrow">01 / CATÁLOGO</div><h2>Escolha seu próximo upgrade.</h2></div><span className="result-count">Disponibilidade local</span></div>
        <div className="toolbar"><label className="search"><Search size={17}/><input placeholder="Buscar produto ou categoria" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button onClick={() => setQuery('')}><X size={15}/></button>}</label><div className="filters"><SlidersHorizontal size={16}/>{categories.map(c => <button className={category === c ? 'active' : ''} key={c} onClick={() => setCategory(c)}>{c}</button>)}<ChevronDown size={16}/></div></div>
        <div className="grid">{visible.map(p => <article className="card" key={p.id} onClick={() => setSelected(p)}><div className="card-top"><ProductVisual product={p}/>{p.tag && <span className="tag">{p.tag}</span>}</div><div className="card-body"><div className="card-kicker">{p.category}<span className="stock"><i/>{p.stock}</span></div><h3>{p.name}</h3><p>{p.description}</p><div className="card-bottom"><strong>{money(p.price)}</strong><button aria-label={`Ver detalhes de ${p.name}`}><ArrowUpRight size={18}/></button></div></div></article>)}</div>{!visible.length && <div className="empty">Nenhum produto encontrado. Tente outra busca.</div>}</section>
      <section id="como-funciona" className="process wrap"><div className="section-heading"><div><div className="eyebrow">02 / COMO FUNCIONA</div><h2>Direto ao ponto.</h2></div></div><div className="process-grid">{[['01','Escolha','Encontre a peça ou o setup que faz sentido para você.'],['02','Converse','Chame no WhatsApp e tire suas dúvidas com atendimento humano.'],['03','Combine','Definimos disponibilidade, pagamento e entrega em Natal/RN.']].map(([n,t,d]) => <div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
      <section id="sobre" className="local wrap"><div className="local-copy"><div className="eyebrow">03 / FEITO PARA NATAL</div><h2>Compra local,<br/><span>decisão tranquila.</span></h2><p>A SH / Sale Hard atende Natal/RN e regiões metropolitanas, como Parnamirim. Sem carrinho confuso, sem promessa impossível: você fala com a gente, entende o que está levando e combina tudo com transparência.</p><a className="button light" href="https://wa.me/5584992157903" target="_blank">Falar com a loja <MessageCircle size={16}/></a></div><div className="local-art"><div className="ring r1"/><div className="ring r2"/><div className="ring r3"/><span>NAT<br/>16°S</span></div></section>
    </main><footer className="footer wrap"><div className="brand"><span className="terminal-logo"><b>SH</b><small>Sale Hard</small></span></div><p>Atendimento em Natal/RN e região metropolitana.</p><span>© 2026 · Sem checkout online</span></footer>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}><X/></button><ProductVisual product={selected} large/><div className="modal-content"><div className="card-kicker">{selected.category}<span className="stock"><i/>{selected.stock}</span></div><h2>{selected.name}</h2><p>{selected.description}</p><div className="specs">{selected.specs.map(s => <span key={s}>{s}</span>)}</div><strong className="modal-price">{money(selected.price)}</strong>{selected.stock === 'Disponível' ? <a className="button primary full" href={whatsapp(selected)} target="_blank"><MessageCircle size={17}/> Consultar pelo WhatsApp</a> : <button className="button unavailable full" disabled>Indisponível no momento</button>}<small>Atendimento e entrega somente em Natal/RN e região metropolitana. O pagamento é combinado diretamente com a loja.</small></div></div></div>}
  </div>
}
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
