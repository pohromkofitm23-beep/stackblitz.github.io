import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Settings,
  BarChart3,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLng } from '../../context/LanguageContext';

const links = [
  { to: '/', labelKey: 'dashboard', icon: LayoutDashboard },
  { to: '/tasks', labelKey: 'tasks', icon: CheckSquare },
  { to: '/schedule', labelKey: 'schedule', icon: Calendar },
  { to: '/analytics', labelKey: 'analytics', icon: BarChart3 },
  { to: '/settings', labelKey: 'settings', icon: Settings },
];

export default function Sidebar() {
  const { t, isFocusMode } = useLng();

  return (
    <aside
      className={`bg-[#131127]/90 backdrop-blur-md border-t md:border-t-0 md:border-r border-white/10 transition-all duration-500 ease-in-out z-50
        /* Мобильная версия: нижняя панель */
        fixed bottom-0 left-0 right-0 h-16 p-2 flex flex-row items-center justify-around
        /* ПК версия: боковая панель */
        md:sticky md:top-0 md:left-0 md:h-screen md:w-[260px] md:flex-col md:justify-start md:items-stretch md:p-6
        ${
          isFocusMode
            ? 'opacity-0 pointer-events-none translate-y-full md:translate-y-0 md:w-0 md:p-0 md:border-r-0 md:-translate-x-full'
            : 'opacity-100 translate-y-0 md:translate-x-0'
        }`}
    >
      {/* Логотип: показываем только на ПК */}
      <h1 className="text-3xl font-black mb-10 hidden md:block">FocusFlight</h1>

      {/* Навигация */}
      <nav className="flex flex-row md:flex-col justify-around md:justify-start gap-1 md:space-y-3 w-full">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-1.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl transition-all text-gray-400 w-full ${
                  isActive ? 'bg-violet-600 text-white' : 'hover:bg-white/5'
                }`
              }
            >
              <Icon size={20} />
              {/* На мобилках текст делаем совсем крошечным, на ПК - обычным */}
              <span className="text-[10px] md:text-sm font-medium">
                {t(item.labelKey)}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
