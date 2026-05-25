import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useLng } from '../context/LanguageContext';

const data = [
  { name: 'Completed', value: 75 },
  { name: 'Remaining', value: 25 },
];

const COLORS = ['#7c3aed', '#27272a'];

export default function Analytics() {
  const { t } = useLng();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-black mb-2">{t('analytics')}</h1>
        <p className="text-gray-400">{t('productivityStats')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover-card">
          <h2 className="text-xl font-bold mb-3">{t('tasksCompleted')}</h2>
          <p className="text-5xl font-black">18</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover-card">
          <h2 className="text-xl font-bold mb-3">{t('focusHours')}</h2>
          <p className="text-5xl font-black">67h</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover-card">
          <h2 className="text-xl font-bold mb-3">{t('sessions')}</h2>
          <p className="text-5xl font-black">42</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-8">{t('productivity')}</h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={130}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-8 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-violet-600" />
            <span className="text-gray-300">{t('completed')}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-zinc-800" />
            <span className="text-gray-300">{t('remaining')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
