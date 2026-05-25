import Pomodoro from '../components/Pomodoro';
import { useLng } from '../context/LanguageContext';

export default function Dashboard() {
  const { t, isFocusMode, tasks, stats } = useLng();

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  const focusHours = (stats.focusMinutes / 60).toFixed(1);

  const productivity =
    tasks.length > 0
      ? Math.round((completedTasksCount / tasks.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {!isFocusMode && (
        <div className="transition-all duration-500 ease-in-out">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">{t('welcomeTo')}</p>
        </div>
      )}

      {!isFocusMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-200">
              {t('tasksCompleted')}
            </h2>
            <p className="text-4xl md:text-5xl font-black text-white">
              {completedTasksCount}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-200">
              {t('focusHours')}
            </h2>
            <p className="text-4xl md:text-5xl font-black text-white">
              {focusHours}h
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-200">
              {t('productivity')}
            </h2>
            <p className="text-4xl md:text-5xl font-black text-white">
              {productivity}%
            </p>
          </div>
        </div>
      )}

      <Pomodoro />
    </div>
  );
}
