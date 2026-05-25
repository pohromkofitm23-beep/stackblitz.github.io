import { useState } from 'react';
import { useLng } from '../context/LanguageContext';

export default function Settings() {
  const [name, setName] = useState('Angelina');
  const [email, setEmail] = useState('angelina@example.com');
  const { t } = useLng();

  const saveSettings = () => {
    alert(t('saved'));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-4xl font-black mb-2">{t('settings')}</h1>
        <p className="text-gray-400">{t('profileSettings')}</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-5">
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            {t('name')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <button
          onClick={saveSettings}
          className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all"
        >
          {t('save')}
        </button>
      </div>
    </div>
  );
}
