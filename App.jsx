
import React, { useEffect, useState } from 'react';

const PHONE_DISPLAY = '+55 65 98406-8868'; // exibido no site
const WHATSAPP_NUMBER = '5565984068868'; // números apenas para wa.me
const EMAIL = 'contato@iafeagro.com.br';
const ADDRESS = 'Cuiabá — Mato Grosso — Brasil';

const RSS_FEEDS = [
  'https://www.canalrural.com.br/rss',
  'https://www.agrolink.com.br/rss',
  'https://www.noticiasagricolas.com.br/rss'
];

function formatDate(d) {
  try {
    const dt = new Date(d);
    return dt.toLocaleString();
  } catch (e) {
    return d;
  }
}

export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchAllFeeds() {
      try {
        const allItems = [];
        await Promise.all(RSS_FEEDS.map(async (feedUrl) => {
          const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(feedUrl);
          try {
            const res = await fetch(proxy);
            if (!res.ok) throw new Error('Feed não disponível');
            const text = await res.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'text/xml');
            const items = Array.from(xml.querySelectorAll('item')).map(item => ({
              title: item.querySelector('title')?.textContent || 'Sem título',
              link: item.querySelector('link')?.textContent || item.querySelector('guid')?.textContent || '#',
              pubDate: item.querySelector('pubDate')?.textContent || item.querySelector('dc\:date')?.textContent || '',
              source: (xml.querySelector('channel > title')?.textContent) || feedUrl,
              description: item.querySelector('description')?.textContent || ''
            }));
            allItems.push(...items);
          } catch (e) {
            console.warn('Erro ao buscar feed', feedUrl, e.message);
          }
        }));

        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        if (mounted) setNews(allItems);
      } catch (e) {
        if (mounted) setError('Falha ao carregar notícias');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAllFeeds();
    const interval = setInterval(fetchAllFeeds, 1000 * 60 * 10);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="min-h-screen bg-[#0f2327] text-slate-100">
      <header className="bg-gradient-to-b from-[#092225] to-transparent border-b border-slate-800">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="IAFE AGRO" className="h-14 w-auto drop-shadow-lg" />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">IAFE AGRO</h1>
              <p className="text-sm text-slate-400">Soluções integradas para a cadeia agroindustrial</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center text-sm text-slate-200">
            <a href="#sobre" className="hover:text-emerald-300">Sobre</a>
            <a href="#servicos" className="hover:text-emerald-300">Serviços</a>
            <a href="#noticias" className="hover:text-emerald-300">Notícias</a>
            <a href="#contato" className="bg-emerald-400 text-[#04221f] px-4 py-2 rounded shadow hover:brightness-110">Contato</a>
          </nav>

          <div className="hidden md:flex flex-col items-end text-right text-xs text-slate-300">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="font-semibold">{PHONE_DISPLAY}</a>
            <span className="text-slate-400">{ADDRESS}</span>
          </div>

          <button className="md:hidden p-2 rounded border border-slate-700" onClick={() => {
            const el = document.getElementById('mobileMenu');
            if (el) el.classList.toggle('hidden');
          }}>Menu</button>
        </div>

        <div id="mobileMenu" className="container mx-auto px-6 pb-4 md:hidden hidden">
          <div className="flex flex-col gap-2 text-slate-200">
            <a href="#sobre" className="block">Sobre</a>
            <a href="#servicos" className="block">Serviços</a>
            <a href="#noticias" className="block">Notícias</a>
            <a href="#contato" className="block">Contato</a>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-extrabold leading-tight text-slate-100">Parceiro estratégico da agricultura moderna</h2>
            <p className="mt-4 text-slate-300">A IAFE AGRO conecta produtores e indústrias por meio de soluções financeiras, logísticas e contratuais que reduzem riscos e aumentam eficiência. Atuamos com transparência, segurança jurídica e foco em resultados sustentáveis.</p>

            <div className="mt-6 flex gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-400 text-[#04221f] px-5 py-3 rounded-md font-semibold shadow hover:brightness-105">Fale conosco (WhatsApp)</a>
              <a href="#contato" className="inline-block border border-emerald-400 text-emerald-300 px-5 py-3 rounded-md hover:bg-[rgba(16,185,129,0.06)]">Solicitar proposta</a>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li>• Recebimento e antecipação de recebíveis com estrutura jurídica</li>
              <li>• Compra direta de produção com avaliação de qualidade</li>
              <li>• Logística integrada e armazenagem especializada</li>
              <li>• Consultoria em conformidade e contratos comerciais</li>
            </ul>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#072424] to-[#072f2f] rounded-2xl shadow-2xl p-6">
              <img src="/hero-agro.jpg" alt="Campo e logística" className="w-full h-56 object-cover rounded-lg mb-4" />
              <div className="text-center">
                <h3 className="font-semibold text-slate-100">Do campo ao mercado — com confiança</h3>
                <p className="text-sm text-slate-400 mt-2">Operações estruturadas para proteger o produtor e garantir previsibilidade à indústria.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-transparent border-t border-slate-800">
          <div className="container mx-auto px-6 py-12">
            <h3 className="text-2xl font-bold text-slate-100">Sobre a IAFE AGRO</h3>
            <p className="mt-4 text-slate-300">Fundada por profissionais com experiência na comercialização agrícola e estruturação financeira, a IAFE AGRO entrega soluções práticas e responsáveis para toda cadeia produtiva. Atuamos com foco em resultados, controles claros e parcerias de longo prazo.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#071718] rounded-lg">
                <h4 className="font-semibold text-slate-100">Missão</h4>
                <p className="text-sm text-slate-300 mt-2">Facilitar operações seguras entre produtores e indústrias, reduzindo riscos e promovendo eficiência.</p>
              </div>
              <div className="p-6 bg-[#071718] rounded-lg">
                <h4 className="font-semibold text-slate-100">Visão</h4>
                <p className="text-sm text-slate-300 mt-2">Ser referência em soluções integradas para comercialização e financiamento agrícola.</p>
              </div>
              <div className="p-6 bg-[#071718] rounded-lg">
                <h4 className="font-semibold text-slate-100">Valores</h4>
                <p className="text-sm text-slate-300 mt-2">Transparência, responsabilidade, agilidade e parceria.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="container mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-slate-100">Serviços</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#071718] rounded-lg">
              <h4 className="font-semibold text-slate-100">Compra de produção</h4>
              <p className="text-sm text-slate-300 mt-2">Compra com avaliação de qualidade, certificação e logística dedicada.</p>
            </div>
            <div className="p-6 bg-[#071718] rounded-lg">
              <h4 className="font-semibold text-slate-100">Antecipação de recebíveis</h4>
              <p className="text-sm text-slate-300 mt-2">Modelos de antecipação negociados para reduzir custos e melhorar fluxo de caixa.</p>
            </div>
            <div className="p-6 bg-[#071718] rounded-lg">
              <h4 className="font-semibold text-slate-100">Logística & armazenagem</h4>
              <p className="text-sm text-slate-300 mt-2">Rede de parceiros para transporte e armazenagem com controles de qualidade.</p>
            </div>
          </div>
        </section>

        <section id="noticias" className="bg-gradient-to-b from-transparent to-[#031818] border-t border-slate-800">
          <div className="container mx-auto px-6 py-12">
            <h3 className="text-2xl font-bold text-slate-100">Notícias do Agro</h3>
            <p className="mt-2 text-slate-300">Agregamos automaticamente artigos de fontes confiáveis para você acompanhar o mercado.</p>

            <div className="mt-6">
              {loading && <p className="text-slate-400">Carregando notícias...</p>}
              {error && <p className="text-rose-400">{error}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {news.slice(0, 12).map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-[#052222] rounded-lg hover:scale-[1.01] transition transform">
                    <h4 className="font-semibold text-slate-100">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.source} — {formatDate(item.pubDate)}</p>
                    <p className="text-sm text-slate-300 mt-2" dangerouslySetInnerHTML={{ __html: item.description }} />
                  </a>
                ))}

                {!loading && news.length === 0 && <p className="text-slate-400">Nenhuma notícia encontrada no momento.</p>}
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="container mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-slate-100">Fale com a IAFE AGRO</h3>
          <p className="mt-2 text-slate-300">Preencha o formulário ou entre em contato direto pelo WhatsApp ou e-mail.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <form className="space-y-4" action={`mailto:{EMAIL}`} method="GET" encType="text/plain">
              <div>
                <label className="block text-sm font-medium text-slate-200">Nome</label>
                <input name="Nome" className="mt-1 block w-full rounded border border-slate-700 bg-[#031718] p-2 text-slate-100" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">E-mail</label>
                <input name="Email" type="email" className="mt-1 block w-full rounded border border-slate-700 bg-[#031718] p-2 text-slate-100" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Mensagem</label>
                <textarea name="Mensagem" rows={5} className="mt-1 block w-full rounded border border-slate-700 bg-[#031718] p-2 text-slate-100" required />
              </div>

              <div>
                <button type="submit" className="bg-emerald-400 text-[#04221f] px-4 py-2 rounded font-semibold">Enviar por e-mail</button>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ml-3 inline-block border border-emerald-400 px-4 py-2 rounded text-emerald-300">WhatsApp</a>
              </div>
            </form>

            <div className="bg-[#071718] rounded-lg p-6">
              <h4 className="font-semibold text-slate-100">Contato direto</h4>
              <p className="mt-2 text-sm text-slate-300">Telefone: <a href={whatsappLink} className="text-emerald-300">{PHONE_DISPLAY}</a></p>
              <p className="mt-1 text-sm text-slate-300">E-mail: <a href={`mailto:{EMAIL}`} className="text-emerald-300">{EMAIL}</a></p>

              <div className="mt-6">
                <h5 className="font-medium text-slate-100">Endereço</h5>
                <p className="text-sm text-slate-300 mt-1">{ADDRESS}</p>
              </div>

              <div className="mt-6">
                <h5 className="font-medium text-slate-100">Horário de atendimento</h5>
                <p className="text-sm text-slate-300 mt-1">Seg — Sex: 08:00 — 18:00</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-transparent border-t border-slate-800">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} IAFE AGRO — Todos os direitos reservados</p>
          <div className="flex gap-4 items-center text-sm text-slate-400">
            <a href="#politica" className="hover:text-emerald-300">Política de Privacidade</a>
            <a href="#termos" className="hover:text-emerald-300">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
