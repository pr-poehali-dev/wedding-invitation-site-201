import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-08-11T15:00:00');
const HERO_IMAGE = 'https://cdn.poehali.dev/projects/9afabb3c-1523-4299-a0f9-bd1fd5cf3035/files/3e120691-5c05-4ca1-9c7d-2b480368166d.jpg';

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const SCHEDULE = [
  { time: '14:30', title: 'Сбор гостей', desc: 'Встречаем гостей, фуршет и живая музыка' },
  { time: '15:00', title: 'Церемония', desc: 'Торжественная регистрация брака' },
  { time: '15:45', title: 'Фотосессия', desc: 'Прогулка по территории и фото с гостями' },
  { time: '17:00', title: 'Банкет', desc: 'Торжественный ужин, тосты и поздравления' },
  { time: '19:30', title: 'Первый танец', desc: 'Романтический танец молодожёнов' },
  { time: '20:00', title: 'Вечеринка', desc: 'Дискотека, шоу-программа и веселье' },
  { time: '00:00', title: 'Торт', desc: 'Торжественная разрезка свадебного торта' },
];

const GIFTS = [
  { icon: '✈️', title: 'Медовый месяц', desc: 'Незабываемое свадебное путешествие', popular: true },
  { icon: '🏡', title: 'Гнёздышко', desc: 'Вклад в обустройство нашего дома' },
  { icon: '🍷', title: 'Вечер вдвоём', desc: 'Романтический ужин для двоих' },
  { icon: '📚', title: 'Библиотека', desc: 'Книги для нашей домашней библиотеки' },
];

const DRESSCODE_COLORS = [
  { name: 'Лаванда', hex: '#c8c0d8' },
  { name: 'Шалфей', hex: '#a8b8a0' },
  { name: 'Айвори', hex: '#f0ece4', border: true },
  { name: 'Пудра', hex: '#e0c0bc' },
  { name: 'Оливковый', hex: '#8a9878' },
  { name: 'Шампань', hex: '#d4c090' },
];

const PLAYLIST = [
  { artist: 'Ed Sheeran', song: 'Perfect', mood: 'Романтика' },
  { artist: 'John Legend', song: 'All of Me', mood: 'Первый танец' },
  { artist: 'Coldplay', song: 'Yellow', mood: 'Лиричное' },
  { artist: 'Bruno Mars', song: 'Marry You', mood: 'Весёлое' },
  { artist: 'ABBA', song: 'Dancing Queen', mood: 'Танцы' },
];

const NAV = [
  { href: '#event', label: 'О дне' },
  { href: '#schedule', label: 'Программа' },
  { href: '#venue', label: 'Место' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#gifts', label: 'Подарки' },
  { href: '#dresscode', label: 'Дресс-код' },
];

export default function Index() {
  useReveal();
  const cd = useCountdown(WEDDING_DATE);
  const [rsvp, setRsvp] = useState({ name: '', email: '', phone: '', guests: '1', coming: 'yes', wish: '', alcohol: [] as string[], allergy: '' });
  const [rsvpSent, setRsvpSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [song, setSong] = useState('');
  const pad = (n: number) => String(n).padStart(2, '0');
  const handleRsvp = (e: React.FormEvent) => { e.preventDefault(); setRsvpSent(true); };
  const toggleAlcohol = (val: string) =>
    setRsvp(r => ({ ...r, alcohol: r.alcohol.includes(val) ? r.alcohol.filter(a => a !== val) : [...r.alcohol, val] }));

  return (
    <div className="min-h-screen bg-white" style={{ color: '#141414' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between h-14">
          <a href="#hero" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#141414' }}>
            Д &amp; А
          </a>
          <div className="hidden md:flex items-center gap-10">
            {NAV.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-xs" style={{ color: '#555' }}>{l.label}</a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} style={{ color: '#141414' }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-8 py-6 flex flex-col gap-5 bg-white" style={{ borderTop: '1px solid #f0f0f0' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} className="text-xs tracking-widest uppercase" style={{ color: '#555' }} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative" style={{ height: '100vh', minHeight: 600 }}>
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="animate-fade-up animate-delay-1 section-label mb-4">Свадьба</p>
              <h1 className="animate-fade-up animate-delay-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 300, fontStyle: 'italic', color: '#141414', lineHeight: 0.95 }}>
                Дарья<br />&amp; Андрей
              </h1>
            </div>
            <div className="animate-fade-up animate-delay-4 text-right">
              <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#666' }}>11 августа 2026</p>
              <p className="text-xs tracking-[0.1em]" style={{ color: '#888' }}>Ресторан «Белый Сад», Москва</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{ color: '#999' }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 px-8 border-b" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-0 mb-16"
            style={{ borderTop: '1px solid #e8e8e8', borderLeft: '1px solid #e8e8e8' }}>
            {[
              { val: cd.days, label: 'Дней' },
              { val: cd.hours, label: 'Часов' },
              { val: cd.minutes, label: 'Минут' },
              { val: cd.seconds, label: 'Секунд' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center py-10 px-4"
                style={{ borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', fontWeight: 300, color: '#141414', lineHeight: 1 }}>
                  {pad(val)}
                </div>
                <p className="section-label mt-2">{label}</p>
              </div>
            ))}
          </div>
          <div className="reveal max-w-xl">
            <p className="section-label mb-5">Приглашение</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: '#333' }}>
              Мы рады пригласить вас разделить с нами один из самых счастливых дней нашей жизни.
            </p>
            <div className="mt-8">
              <a href="#rsvp" className="btn-dark">Подтвердить присутствие</a>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT INFO */}
      <section id="event" className="py-20 px-8 border-b" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">О дне</p>
          <div className="grid md:grid-cols-3 gap-0"
            style={{ borderTop: '1px solid #e8e8e8', borderLeft: '1px solid #e8e8e8' }}>
            {[
              { label: 'Дата', value: '11 августа 2026', sub: 'Вторник' },
              { label: 'Время', value: '15:00', sub: 'Сбор гостей с 14:30' },
              { label: 'Место', value: 'Белый Сад', sub: 'ул. Садовая, 12, Москва' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} p-10`}
                style={{ borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
                <p className="section-label mb-3">{item.label}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: '#141414' }}>{item.value}</p>
                <p className="text-xs mt-1" style={{ color: '#999' }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-20 px-8 border-b" style={{ background: '#fafafa', borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">Программа дня</p>
          <div style={{ borderTop: '1px solid #e8e8e8' }}>
            {SCHEDULE.map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i % 3 + 1} flex items-start gap-8 py-6`}
                style={{ borderBottom: '1px solid #e8e8e8' }}>
                <span className="shrink-0 text-xs font-mono mt-0.5" style={{ color: '#999', width: '3rem' }}>{item.time}</span>
                <div className="shrink-0 mt-2"><div className="timeline-dot" /></div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: '#141414', fontWeight: 300 }}>{item.title}</span>
                  <span className="text-xs" style={{ color: '#999' }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="py-20 px-8 border-b" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">Место</p>
          <div className="grid md:grid-cols-2 gap-16 mb-12">
            <div className="reveal">
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', marginBottom: '1rem' }}>
                Ресторан «Белый Сад»
              </h2>
              <p className="text-sm mb-6" style={{ color: '#666', lineHeight: 1.9 }}>
                ул. Садовая, 12, Москва<br />Метро Пушкинская — 3 мин пешком
              </p>
              <div className="space-y-3">
                {[
                  { icon: 'Car', text: 'Бесплатная парковка на 80 мест' },
                  { icon: 'Train', text: 'Пушкинская / Тверская / Чеховская' },
                  { icon: 'Phone', text: '+7 (999) 123-45-67 • Андрей' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name={r.icon} fallback="Info" size={13} style={{ color: '#ccc' }} />
                    <span className="text-xs" style={{ color: '#666' }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-2" style={{ height: 320 }}>
              <iframe src="https://yandex.ru/map-widget/v1/?ll=37.604&z=15&text=Садовая+12+Москва"
                width="100%" height="100%" style={{ border: '1px solid #e8e8e8' }} title="Карта" />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-20 px-8" style={{ background: '#141414' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <p className="section-label mb-5" style={{ color: '#555' }}>Подтверждение</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.1 }}>
                Вы<br />придёте?
              </h2>
              <p className="text-xs mt-6" style={{ color: '#555', lineHeight: 1.9 }}>
                Просим подтвердить<br />до 1 июля 2026
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              {rsvpSent ? (
                <div className="py-12">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: '#fff' }}>
                    Спасибо — ждём вас!
                  </p>
                  <p className="text-xs mt-3" style={{ color: '#555' }}>Мы получили ваш ответ.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-6">
                  <div>
                    <label className="block section-label mb-2" style={{ color: '#555' }}>Имя *</label>
                    <input className="form-input" type="text" required placeholder="Имя и фамилия"
                      style={{ background: 'transparent', color: '#fff', borderColor: '#333' }}
                      value={rsvp.name} onChange={e => setRsvp({ ...rsvp, name: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block section-label mb-2" style={{ color: '#555' }}>Email</label>
                      <input className="form-input" type="email" placeholder="mail@mail.ru"
                        style={{ background: 'transparent', color: '#fff', borderColor: '#333' }}
                        value={rsvp.email} onChange={e => setRsvp({ ...rsvp, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block section-label mb-2" style={{ color: '#555' }}>Гостей</label>
                      <select className="form-input" style={{ background: 'transparent', color: '#fff', borderColor: '#333' }}
                        value={rsvp.guests} onChange={e => setRsvp({ ...rsvp, guests: e.target.value })}>
                        {['1','2','3','4','5+'].map(n => <option key={n} value={n} style={{ background: '#141414' }}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block section-label mb-3" style={{ color: '#555' }}>Алкоголь</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 'wine', label: 'Вино' }, { val: 'champagne', label: 'Шампанское' },
                        { val: 'whiskey', label: 'Виски' }, { val: 'beer', label: 'Пиво' },
                        { val: 'cocktails', label: 'Коктейли' }, { val: 'none', label: 'Не пью' },
                      ].map(opt => (
                        <button key={opt.val} type="button"
                          className={`tag-pill px-4 py-2 ${rsvp.alcohol.includes(opt.val) ? 'active' : ''}`}
                          style={rsvp.alcohol.includes(opt.val) ? {} : { color: '#666', borderColor: '#333' }}
                          onClick={() => toggleAlcohol(opt.val)}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block section-label mb-2" style={{ color: '#555' }}>Аллергии / пожелания к меню</label>
                    <input className="form-input" type="text" placeholder="Орехи, лактоза, вегетарианское..."
                      style={{ background: 'transparent', color: '#fff', borderColor: '#333' }}
                      value={rsvp.allergy} onChange={e => setRsvp({ ...rsvp, allergy: e.target.value })} />
                  </div>
                  <div>
                    <label className="block section-label mb-2" style={{ color: '#555' }}>Пожелания</label>
                    <textarea className="form-input" rows={3} placeholder="Ваши тёплые слова..."
                      style={{ background: 'transparent', color: '#fff', borderColor: '#333' }}
                      value={rsvp.wish} onChange={e => setRsvp({ ...rsvp, wish: e.target.value })} />
                  </div>
                  <div>
                    <label className="block section-label mb-3" style={{ color: '#555' }}>Присутствие</label>
                    <div className="flex gap-3">
                      {[{ val: 'yes', label: 'Буду' }, { val: 'no', label: 'Не смогу' }, { val: 'maybe', label: 'Возможно' }].map(opt => (
                        <button key={opt.val} type="button"
                          className={`tag-pill px-5 py-2 ${rsvp.coming === opt.val ? 'active' : ''}`}
                          style={rsvp.coming === opt.val ? {} : { color: '#666', borderColor: '#333' }}
                          onClick={() => setRsvp({ ...rsvp, coming: opt.val })}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="btn-dark" style={{ background: '#fff', color: '#141414', width: '100%' }}>
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GIFTS */}
      <section id="gifts" className="py-20 px-8 border-b" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">Подарки</p>
          <div className="grid md:grid-cols-2 gap-0 mb-10"
            style={{ borderTop: '1px solid #e8e8e8', borderLeft: '1px solid #e8e8e8' }}>
            {GIFTS.map((g, i) => (
              <div key={i} className={`reveal reveal-delay-${i % 2 + 1} p-8 flex gap-5 items-start`}
                style={{ borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
                <span className="text-2xl shrink-0">{g.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: '#141414' }}>{g.title}</span>
                    {g.popular && <span className="text-xs px-2 py-0.5" style={{ background: '#f5f5f5', color: '#888' }}>популярное</span>}
                  </div>
                  <p className="text-xs" style={{ color: '#999' }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal">
            <a href="#" className="btn-outline">Открыть реестр подарков</a>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <section id="dresscode" className="py-20 px-8 border-b" style={{ background: '#fafafa', borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">Дресс-код</p>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="reveal">
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', marginBottom: '1rem' }}>
                Garden Party
              </h2>
              <p className="text-sm mb-8" style={{ color: '#666', lineHeight: 1.9 }}>
                Лёгкие летние наряды в пастельных тонах.<br />Романтика тёплого августовского вечера.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="section-label mb-4">Для гостий</p>
                  <ul className="space-y-2">
                    {['Платья миди / в пол', 'Пастельные тона', 'Брючный костюм', 'Сандалии / каблук'].map((t, i) => (
                      <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#666' }}>
                        <span style={{ color: '#ccc' }}>—</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="section-label mb-4">Для гостей</p>
                  <ul className="space-y-2">
                    {['Светлый костюм', 'Льняной пиджак', 'Без галстука OK', 'Лоферы / туфли'].map((t, i) => (
                      <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#666' }}>
                        <span style={{ color: '#ccc' }}>—</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs mt-8 pt-6" style={{ color: '#ccc', borderTop: '1px solid #e8e8e8' }}>
                Избегайте: белого и айвори, чёрного total look, неоновых оттенков
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="section-label mb-6">Палитра</p>
              <div className="grid grid-cols-3 gap-5">
                {DRESSCODE_COLORS.map((dc, i) => (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 mx-auto mb-2" style={{ background: dc.hex, border: dc.border ? '1px solid #e0e0e0' : 'none' }} />
                    <p className="text-xs" style={{ color: '#999' }}>{dc.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYLIST */}
      <section id="playlist" className="py-20 px-8 border-b" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">Плейлист</p>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="reveal" style={{ borderTop: '1px solid #e8e8e8' }}>
              {PLAYLIST.map((track, i) => (
                <div key={i} className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <div>
                    <p className="text-sm" style={{ color: '#141414' }}>{track.song}</p>
                    <p className="text-xs" style={{ color: '#999' }}>{track.artist}</p>
                  </div>
                  <span className="text-xs" style={{ color: '#ccc' }}>{track.mood}</span>
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-sm mb-6" style={{ color: '#666' }}>Предложите свою любимую песню для нашего вечера</p>
              <div className="space-y-4">
                <input className="form-input" type="text" placeholder="Артист — Название"
                  value={song} onChange={e => setSong(e.target.value)} />
                <button className="btn-dark" style={{ width: '100%' }}>Добавить в плейлист</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-8 border-b" style={{ background: '#fafafa', borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="reveal section-label mb-10">Контакты</p>
          <div className="grid md:grid-cols-2 gap-0"
            style={{ borderTop: '1px solid #e8e8e8', borderLeft: '1px solid #e8e8e8' }}>
            {[
              { name: 'Дарья', role: 'Невеста', phone: '+7 (999) 111-22-33', tg: '@darya_wedding' },
              { name: 'Андрей', role: 'Жених', phone: '+7 (999) 123-45-67', tg: '@andrey_wedding' },
            ].map((p, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} p-10`}
                style={{ borderRight: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
                <p className="section-label mb-3">{p.role}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: '#141414', marginBottom: '1rem' }}>{p.name}</p>
                <div className="space-y-2">
                  <p className="text-xs flex items-center gap-2" style={{ color: '#666' }}>
                    <Icon name="Phone" size={12} style={{ color: '#ccc' }} />{p.phone}
                  </p>
                  <p className="text-xs flex items-center gap-2" style={{ color: '#666' }}>
                    <Icon name="MessageCircle" size={12} style={{ color: '#ccc' }} />{p.tg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #e8e8e8' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, fontStyle: 'italic', color: '#141414' }}>
          Дарья &amp; Андрей
        </p>
        <p className="section-label">11 августа 2026 · Москва</p>
      </footer>

    </div>
  );
}
