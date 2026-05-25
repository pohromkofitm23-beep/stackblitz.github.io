import { useState, useEffect } from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useLng } from '../../context/LanguageContext';
import { useLocation } from 'react-router-dom';

export default function Topbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const { lang, setLang, t, isFocusMode, searchQuery, setSearchQuery } =
    useLng();
  const location = useLocation();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLang(lang === 'ua' ? 'en' : 'ua');

  const isTasksPage = location.pathname === '/tasks';

  return (
    <header
      className={`flex flex-col gap-4 mb-6 md:mb-8 transition-all duration-500 ease-in-out overflow-hidden ${
        isFocusMode
          ? 'opacity-0 h-0 mb-0 scale-95 pointer-events-none'
          : 'opacity-100 h-auto scale-100'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-xl md:text-3xl font-black">{t('welcome')}</h2>
          <p className="text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">
            {t('stayProductive')}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => alert(t('noNotifications'))}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
          >
            <Bell size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          <button
            onClick={toggleLanguage}
            className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 shadow-sm flex items-center justify-center text-xs font-bold uppercase w-[38px] h-[38px]"
          >
            {lang}
          </button>
        </div>
      </div>

      {isTasksPage && (
        <div className="w-full md:w-80 md:self-end relative flex items-center">
          <Search
            size={18}
            className="absolute left-4 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-violet-500 transition-all text-white"
          />
        </div>
      )}
    </header>
  );
}
