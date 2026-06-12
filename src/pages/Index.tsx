import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_DATE = new Date('2026-07-12T15:00:00');

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/9afabb3c-1523-4299-a0f9-bd1fd5cf3035/files/ffa2ce43-f2f9-4c7c-86c5-26fbd507c73e.jpg';

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
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const SCHEDULE = [
  { time: '14:30', title: 'Сбор гостей', desc: 'Встречаем гостей, фуршет и живая музыка', icon: 'Users' },
  { time: '15:00', title: 'Церемония', desc: 'Торжественная регистрация брака', icon: 'Heart' },
  { time: '15:45', title: 'Фотосессия', desc: 'Прогулка по территории и фото с гостями', icon: 'Camera' },
  { time: '17:00', title: 'Банкет', desc: 'Торжественный ужин, тосты и поздравления', icon: 'Utensils' },
  { time: '19:30', title: 'Первый танец', desc: 'Романтический танец молодожёнов', icon: 'Music' },
  { time: '20:00', title: 'Танцы & вечеринка', desc: 'Дискотека, шоу-программа и веселье до утра', icon: 'Star' },
  { time: '00:00', title: 'Торт', desc: 'Торжественная разрезка свадебного торта', icon: 'Cake' },
];

const GIFTS = [
  { icon: '✈️', title: 'Медовый месяц', desc: 'Помогите нам создать незабываемое свадебное путешествие', popular: true },
  { icon: '🏡', title: 'Гнёздышко', desc: 'Вклад в обустройство нашего общего дома' },
  { icon: '🍷', title: 'Вечер вдвоём', desc: 'Подарите нам незабываемый романтический ужин' },
  { icon: '📚', title: 'Библиотека', desc: 'Книги для нашей домашней библиотеки' },
];


const DRESSCODE = [
  { color: '#1a4a35', name: 'Изумрудный', hex: '#1a4a35', light: false },
  { color: '#c9a84c', name: 'Золотой', hex: '#c9a84c', light: false },
  { color: '#f5f0e8', name: 'Айвори', hex: '#f5f0e8', light: true },
  { color: '#8b7355', name: 'Мокко', hex: '#8b7355', light: false },
  { color: '#d4c5b0', name: 'Шампань', hex: '#d4c5b0', light: true },
  { color: '#2c3e2d', name: 'Тёмный лес', hex: '#2c3e2d', light: false },
];

const DRESSCODE_AVOID = ['#ffffff', '#ff0000', '#000000'];

const PLAYLIST = [
  { artist: 'Ed Sheeran', song: 'Perfect', mood: 'Романтика' },
  { artist: 'John Legend', song: 'All of Me', mood: 'Первый танец' },
  { artist: 'Coldplay', song: 'Yellow', mood: 'Лиричное' },
  { artist: 'Bruno Mars', song: 'Marry You', mood: 'Весёлое' },
  { artist: 'ABBA', song: 'Dancing Queen', mood: 'Танцы' },
];

export default function Index() {
  useReveal();
  const countdown = useCountdown(WEDDING_DATE);
  const [rsvp, setRsvp] = useState({ name: '', email: '', phone: '', guests: '1', coming: 'yes', wish: '', alcohol: [] as string[], allergy: '' });
  const [rsvpSent, setRsvpSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playlistSong, setPlaylistSong] = useState({ artist: '', song: '' });

  const navLinks = [
    { href: '#event', label: 'О событии' },
    { href: '#schedule', label: 'Программа' },
    { href: '#venue', label: 'Место' },
    { href: '#rsvp', label: 'Подтвердить' },
    { href: '#gifts', label: 'Подарки' },
    { href: '#dresscode', label: 'Дресс-код' },
  ];

  const pad = (n: number) => String(n).padStart(2, '0');

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#f5f0e8' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15,42,31,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" className="font-serif text-lg tracking-widest" style={{ color: '#c9a84c', fontFamily: 'Cormorant Garamond, serif' }}>
            А&nbsp;&amp;&nbsp;М
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-xs tracking-widest uppercase" style={{ color: 'rgba(245,240,232,0.8)', fontFamily: 'Golos Text, sans-serif' }}>
                {l.label}
              </a>
            ))}
          </div>
          <button className="md:hidden" style={{ color: '#c9a84c' }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: 'rgba(15,42,31,0.98)' }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm tracking-widest uppercase" style={{ color: 'rgba(245,240,232,0.85)' }} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Wedding" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="animate-fade-up animate-delay-1 text-xs tracking-[0.4em] uppercase mb-6" style={{ color: '#c9a84c', fontFamily: 'Golos Text, sans-serif' }}>
            Мы женимся
          </p>
          <h1 className="animate-fade-up animate-delay-2 font-serif text-6xl md:text-8xl font-light mb-4" style={{ color: '#f5f0e8', fontFamily: 'Cormorant Garamond, serif', lineHeight: 1.1 }}>
            Анна<br /><span style={{ color: '#c9a84c' }}>&amp;</span><br />Михаил
          </h1>
          <div className="animate-fade-up animate-delay-3 section-divider my-8" />
          <p className="animate-fade-up animate-delay-4 text-lg tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(245,240,232,0.9)', fontFamily: 'Golos Text, sans-serif', fontWeight: 300 }}>
            12 июля 2026
          </p>
          <p className="animate-fade-up animate-delay-5 text-sm tracking-widest" style={{ color: 'rgba(245,240,232,0.6)' }}>
            Москва, Ресторан «Белый Сад»
          </p>

          {/* Countdown */}
          <div className="animate-fade-up animate-delay-6 flex justify-center gap-4 md:gap-8 mt-12">
            {[
              { val: countdown.days, label: 'Дней' },
              { val: countdown.hours, label: 'Часов' },
              { val: countdown.minutes, label: 'Минут' },
              { val: countdown.seconds, label: 'Секунд' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-light gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', minWidth: '3rem' }}>
                  {pad(val)}
                </div>
                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="animate-fade-up animate-delay-6 mt-12">
            <a href="#rsvp" className="btn-gold">Подтвердить присутствие</a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{ color: 'rgba(245,240,232,0.4)' }}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* EVENT INFO */}
      <section id="event" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>О событии</p>
          <h2 className="reveal reveal-delay-1 text-5xl md:text-6xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>
            Наш особый день
          </h2>
          <div className="reveal reveal-delay-2 section-divider mb-10" />
          <p className="reveal reveal-delay-2 text-base leading-relaxed mb-16 max-w-2xl mx-auto" style={{ color: '#3a5a48', fontWeight: 300 }}>
            Мы рады пригласить вас разделить с нами один из самых счастливых дней нашей жизни.
            Вместе мы начинаем новую главу, и нам важно, что вы будете рядом в этот торжественный момент.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'Calendar', title: '12 июля 2026', sub: 'Воскресенье', label: 'Дата' },
              { icon: 'Clock', title: '15:00', sub: 'Сбор гостей с 14:30', label: 'Время' },
              { icon: 'MapPin', title: 'Белый Сад', sub: 'ул. Садовая, 12, Москва', label: 'Место' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8 text-center`}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
                  <Icon name={item.icon} fallback="Star" size={20} style={{ color: '#c9a84c' }} />
                </div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#c9a84c' }}>{item.label}</p>
                <p className="text-xl font-serif mb-1" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif' }}>{item.title}</p>
                <p className="text-sm" style={{ color: '#3a5a48' }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-24 px-6 emerald-bg">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Программа</p>
            <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
              Расписание дня
            </h2>
            <div className="reveal reveal-delay-2 section-divider" />
          </div>

          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px" style={{ background: 'rgba(201,168,76,0.25)' }} />
            <div className="space-y-8">
              {SCHEDULE.map((item, i) => (
                <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} flex items-start gap-6`}>
                  <div className="text-right shrink-0 w-16">
                    <span className="text-sm font-mono" style={{ color: '#c9a84c' }}>{item.time}</span>
                  </div>
                  <div className="relative shrink-0 mt-1">
                    <div className="timeline-dot" />
                  </div>
                  <div className="glass-card rounded-xl px-5 py-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={item.icon} fallback="Star" size={14} style={{ color: '#c9a84c' }} />
                      <span className="font-medium text-sm" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>{item.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#3a5a48' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Место</p>
            <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>
              Ресторан «Белый Сад»
            </h2>
            <div className="reveal reveal-delay-2 section-divider mb-6" />
            <p className="reveal reveal-delay-2 text-sm" style={{ color: '#3a5a48' }}>ул. Садовая, 12, Москва • Метро Пушкинская, 3 мин пешком</p>
          </div>

          <div className="reveal rounded-2xl overflow-hidden gold-border" style={{ height: 400 }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.604&z=15&text=Садовая+12+Москва"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Карта"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: 'Car', title: 'Парковка', desc: 'Бесплатная парковка для гостей на 80 мест' },
              { icon: 'Train', title: 'Метро', desc: 'Пушкинская / Тверская / Чеховская, 3 мин' },
              { icon: 'Phone', title: 'Вопросы', desc: '+7 (999) 123-45-67 • Михаил' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-xl p-6 text-center`}>
                <Icon name={item.icon} fallback="Star" size={20} style={{ color: '#c9a84c', margin: '0 auto 12px' }} />
                <p className="font-serif text-lg mb-2" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif' }}>{item.title}</p>
                <p className="text-xs" style={{ color: '#3a5a48' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-24 px-6" style={{ background: '#1a4a35' }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Подтверждение</p>
            <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
              Вы придёте?
            </h2>
            <div className="reveal reveal-delay-2 section-divider mb-6" />
            <p className="reveal reveal-delay-2 text-sm" style={{ color: 'rgba(245,240,232,0.65)' }}>
              Просим подтвердить присутствие до 1 июня 2026 года
            </p>
          </div>

          {rsvpSent ? (
            <div className="reveal glass-card rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">💐</div>
              <h3 className="font-serif text-2xl mb-3" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif' }}>Спасибо!</h3>
              <p className="text-sm" style={{ color: '#3a5a48' }}>Мы получили ваше подтверждение и очень рады вас видеть!</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="reveal glass-card rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Ваше имя *</label>
                  <input className="form-input" type="text" required placeholder="Имя и фамилия"
                    value={rsvp.name} onChange={e => setRsvp({ ...rsvp, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Email</label>
                  <input className="form-input" type="email" placeholder="email@mail.ru"
                    value={rsvp.email} onChange={e => setRsvp({ ...rsvp, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Телефон</label>
                  <input className="form-input" type="tel" placeholder="+7 999 000 00 00"
                    value={rsvp.phone} onChange={e => setRsvp({ ...rsvp, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Гостей</label>
                  <select className="form-input" value={rsvp.guests} onChange={e => setRsvp({ ...rsvp, guests: e.target.value })}>
                    {['1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n} {n === '1' ? 'человек' : 'человека'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Присутствие</label>
                  <select className="form-input" value={rsvp.coming} onChange={e => setRsvp({ ...rsvp, coming: e.target.value })}>
                    <option value="yes">С радостью буду!</option>
                    <option value="no">К сожалению, нет</option>
                    <option value="maybe">Пока не знаю</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#3a5a48' }}>Алкоголь</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: 'wine', label: '🍷 Вино' },
                      { val: 'champagne', label: '🥂 Шампанское' },
                      { val: 'whiskey', label: '🥃 Виски / Коньяк' },
                      { val: 'beer', label: '🍺 Пиво' },
                      { val: 'cocktails', label: '🍹 Коктейли' },
                      { val: 'none', label: '🚫 Не пью' },
                    ].map(opt => {
                      const checked = rsvp.alcohol.includes(opt.val);
                      return (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setRsvp({ ...rsvp, alcohol: checked ? rsvp.alcohol.filter(a => a !== opt.val) : [...rsvp.alcohol, opt.val] })}
                          className="text-left text-sm px-4 py-3 rounded-xl transition-all"
                          style={{
                            border: checked ? '1.5px solid #c9a84c' : '1px solid rgba(201,168,76,0.25)',
                            background: checked ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.7)',
                            color: '#0f2a1f',
                            fontFamily: 'Golos Text, sans-serif',
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Аллергии и особые пожелания к меню</label>
                  <input className="form-input" type="text" placeholder="Например: орехи, лактоза, вегетарианское меню..."
                    value={rsvp.allergy} onChange={e => setRsvp({ ...rsvp, allergy: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#3a5a48' }}>Пожелания молодожёнам</label>
                  <textarea className="form-input resize-none" rows={3} placeholder="Ваши тёплые слова..."
                    value={rsvp.wish} onChange={e => setRsvp({ ...rsvp, wish: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn-gold w-full" style={{ width: '100%' }}>
                Подтвердить присутствие
              </button>
            </form>
          )}
        </div>
      </section>

      {/* GIFTS */}
      <section id="gifts" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Подарки</p>
            <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>
              Список желаний
            </h2>
            <div className="reveal reveal-delay-2 section-divider mb-6" />
            <p className="reveal reveal-delay-2 text-sm max-w-md mx-auto" style={{ color: '#3a5a48' }}>
              Лучший подарок — это ваше присутствие. Но если вы хотите порадовать нас чем-то особенным — вот несколько идей:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {GIFTS.map((g, i) => (
              <div key={i} className={`reveal reveal-delay-${i % 2 + 1} gift-card glass-card rounded-2xl p-7 gold-border flex gap-5 items-start`}>
                <div className="text-3xl shrink-0">{g.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif' }}>{g.title}</h3>
                    {g.popular && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: '#a07830' }}>Популярное</span>}
                  </div>
                  <p className="text-xs" style={{ color: '#3a5a48' }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal text-center">
            <a href="#" className="btn-outline-gold">
              Открыть реестр подарков
            </a>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <section id="dresscode" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Стиль</p>
            <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>
              Дресс-код
            </h2>
            <div className="reveal reveal-delay-2 section-divider mb-6" />
            <p className="reveal reveal-delay-2 text-sm max-w-md mx-auto" style={{ color: '#3a5a48' }}>
              Мы будем рады, если вы поддержите цветовую палитру нашей свадьбы
            </p>
          </div>

          {/* Формат */}
          <div className="reveal glass-card gold-border rounded-2xl p-8 mb-10 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Icon name="Sparkles" fallback="Star" size={18} style={{ color: '#c9a84c' }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#c9a84c' }}>Формат вечера</span>
            </div>
            <h3 className="font-serif text-3xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>Black Tie Optional</h3>
            <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: '#3a5a48' }}>
              Вечерние платья и костюмы приветствуются. Коктейльные наряды также уместны.
              Главное — ощущение праздника и элегантности.
            </p>
          </div>

          {/* Палитра */}
          <div className="reveal mb-10">
            <p className="text-center text-xs tracking-widest uppercase mb-6" style={{ color: '#3a5a48' }}>Рекомендуемая палитра</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {DRESSCODE.map((dc, i) => (
                <div key={i} className={`reveal reveal-delay-${i % 3 + 1} text-center`}>
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
                    style={{
                      background: dc.hex,
                      border: dc.light ? '2px solid rgba(201,168,76,0.4)' : 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                    }}
                  />
                  <p className="text-xs" style={{ color: '#3a5a48' }}>{dc.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Гостям */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="reveal reveal-delay-1 glass-card gold-border rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">👗</span>
                <h3 className="font-serif text-xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>Для гостий</h3>
              </div>
              <ul className="space-y-2">
                {['Вечерние и коктейльные платья', 'Длина: миди или в пол', 'Элегантные брючные костюмы', 'Каблук или элегантные балетки'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#3a5a48' }}>
                    <span style={{ color: '#c9a84c', fontSize: '0.5rem' }}>◆</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal reveal-delay-2 glass-card gold-border rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤵</span>
                <h3 className="font-serif text-xl" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>Для гостей</h3>
              </div>
              <ul className="space-y-2">
                {['Смокинг или строгий костюм', 'Галстук или бабочка', 'Светлая или пастельная рубашка', 'Классические туфли'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#3a5a48' }}>
                    <span style={{ color: '#c9a84c', fontSize: '0.5rem' }}>◆</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Избегать */}
          <div className="reveal mt-6 glass-card rounded-2xl px-7 py-5 flex flex-col md:flex-row items-center gap-4" style={{ background: 'rgba(255,240,240,0.6)', border: '1px solid rgba(200,50,50,0.15)' }}>
            <Icon name="AlertCircle" fallback="Info" size={18} style={{ color: '#c07070', flexShrink: 0 }} />
            <p className="text-sm" style={{ color: '#7a4040' }}>
              <strong>Просьба избегать:</strong> белого и оттенков айвори (цвет невесты), чёрного total look и ярких кислотных оттенков.
            </p>
          </div>
        </div>
      </section>

      {/* PLAYLIST */}
      <section id="playlist" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Музыка</p>
            <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0f2a1f' }}>
              Свадебный плейлист
            </h2>
            <div className="reveal reveal-delay-2 section-divider mb-6" />
            <p className="reveal reveal-delay-2 text-sm" style={{ color: '#3a5a48' }}>Предложите свою любимую песню для нашего вечера</p>
          </div>

          <div className="space-y-3 mb-10">
            {PLAYLIST.map((track, i) => (
              <div key={i} className={`reveal reveal-delay-${i % 3 + 1} glass-card gold-border rounded-xl px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
                    <Icon name="Music" size={14} style={{ color: '#c9a84c' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0f2a1f' }}>{track.song}</p>
                    <p className="text-xs" style={{ color: '#3a5a48' }}>{track.artist}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.1)', color: '#a07830' }}>{track.mood}</span>
              </div>
            ))}
          </div>

          <div className="reveal glass-card gold-border rounded-2xl p-7">
            <p className="font-serif text-lg mb-4" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif' }}>Предложить песню</p>
            <div className="flex gap-3">
              <input className="form-input flex-1" type="text" placeholder="Артист — Название песни"
                value={playlistSong.song} onChange={e => setPlaylistSong({ ...playlistSong, song: e.target.value })} />
              <button className="btn-gold shrink-0" style={{ padding: '12px 24px' }}>Добавить</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 emerald-bg">
        <div className="max-w-3xl mx-auto text-center">
          <p className="reveal text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Контакты</p>
          <h2 className="reveal reveal-delay-1 text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}>
            Свяжитесь с нами
          </h2>
          <div className="reveal reveal-delay-2 section-divider mb-10" />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Анна', role: 'Невеста', phone: '+7 (999) 111-22-33', tg: '@anna_wedding', icon: '👰' },
              { name: 'Михаил', role: 'Жених', phone: '+7 (999) 123-45-67', tg: '@misha_wedding', icon: '🤵' },
            ].map((p, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8`}>
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-serif text-2xl mb-1" style={{ color: '#0f2a1f', fontFamily: 'Cormorant Garamond, serif' }}>{p.name}</h3>
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#c9a84c' }}>{p.role}</p>
                <div className="space-y-2">
                  <p className="flex items-center justify-center gap-2 text-sm" style={{ color: '#3a5a48' }}>
                    <Icon name="Phone" size={14} style={{ color: '#c9a84c' }} />{p.phone}
                  </p>
                  <p className="flex items-center justify-center gap-2 text-sm" style={{ color: '#3a5a48' }}>
                    <Icon name="MessageCircle" size={14} style={{ color: '#c9a84c' }} />{p.tg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center" style={{ background: '#0f2a1f', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="font-serif text-3xl mb-3 gold-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Анна &amp; Михаил
        </div>
        <p className="text-xs tracking-widest mb-6" style={{ color: 'rgba(245,240,232,0.35)' }}>12 июля 2026 • Москва</p>
        <p className="text-xs" style={{ color: 'rgba(245,240,232,0.25)' }}>Сделано с любовью ♥</p>
      </footer>

    </div>
  );
}