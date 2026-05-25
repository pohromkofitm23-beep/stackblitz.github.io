import { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  en: {
    dashboard: 'Dashboard',
    tasks: 'Tasks',
    schedule: 'Schedule',
    analytics: 'Analytics',
    settings: 'Settings',
    welcome: 'Welcome back ',
    stayProductive: 'Stay productive today',
    search: 'Search...',
    noNotifications: 'No notifications yet',
    welcomeTo: 'Welcome to FocusFlight',
    tasksCompleted: 'Tasks Completed',
    focusHours: 'Focus Hours',
    productivity: 'Productivity',
    pomodoroTimer: 'Pomodoro Timer',
    stayFocused: 'Stay focused and productive',
    focusModeOn: 'Focus Mode: ON',
    focusModeOff: 'Focus Mode',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    sessions: 'Sessions',
    completed: 'Completed',
    remaining: 'Remaining',
    productivityStats: 'Productivity Statistics',
    eventsOn: 'Events on',
    noEvents: 'No events or classes',
    calendarOfEvents: 'Calendar of events',
    profileSettings: 'Profile Settings',
    name: 'Name',
    save: 'Save',
    saved: 'Settings saved!',
    taskManagement: 'Task Management',
    newTask: 'New Task',
    defaultTaskTitle: 'New Task',
    defaultTaskDesc: 'Click edit to change',
    edit: 'Edit',
    selectGroup: 'Select Group',
  },
  ua: {
    dashboard: 'Dashboard',
    tasks: 'Задачі',
    schedule: 'Розклад',
    analytics: 'Аналітика',
    settings: 'Налаштування',
    welcome: 'Ласкаво просимо назад ',
    stayProductive: 'Залишайтесь продуктивними сьогодні',
    search: 'Пошук...',
    noNotifications: 'Повідомлень поки немає',
    welcomeTo: 'Ласкаво просимо у FocusFlight',
    tasksCompleted: 'Виконано задач',
    focusHours: 'Години фокусу',
    productivity: 'Продуктивність',
    pomodoroTimer: 'Помодоро Таймер',
    stayFocused: 'Залишайтесь сфокусованими та продуктивними',
    focusModeOn: 'Режим фокусу: Увімкнено',
    focusModeOff: 'Режим фокусу',
    start: 'Старт',
    pause: 'Пауза',
    reset: 'Скидання',
    sessions: 'Сесії',
    completed: 'Виконано',
    remaining: 'Залишилось',
    productivityStats: 'Статистика продуктивності',
    eventsOn: 'Події та пари на',
    noEvents: 'Немає занять або подій',
    calendarOfEvents: 'Календар подій університету',
    profileSettings: 'Налаштування профілю',
    name: 'Ім’я',
    save: 'Зберегти',
    saved: 'Налаштування збережено!',
    taskManagement: 'Управління задачами',
    newTask: 'Нова задача',
    defaultTaskTitle: 'Нова задача',
    defaultTaskDesc: 'Натисни edit щоб змінити',
    edit: 'Редагувати',
    selectGroup: 'Оберіть групу',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ua');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem('selectedGroup') || 'ІНб12340д'
  );

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: 'Зробити лабораторну',
            description: 'React + Tailwind',
            completed: false,
          },
        ];
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('focus_stats');
    return saved
      ? JSON.parse(saved)
      : { focusMinutes: 0, completedSessions: 0 };
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('selectedGroup', selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('focus_stats', JSON.stringify(stats));
  }, [stats]);

  const t = (key) => translations[lang][key] || key;

  const addFocusMinutes = (minutes) => {
    setStats((prev) => ({
      focusMinutes: prev.focusMinutes + minutes,
      completedSessions: prev.completedSessions + 1,
    }));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        isFocusMode,
        setIsFocusMode,
        searchQuery,
        setSearchQuery,
        selectedGroup,
        setSelectedGroup,
        tasks,
        setTasks,
        stats,
        addFocusMinutes,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLng = () => useContext(LanguageContext);
