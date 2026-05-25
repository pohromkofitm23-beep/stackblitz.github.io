import { useEffect, useState, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLng } from '../context/LanguageContext';

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { t, isFocusMode, setIsFocusMode, addFocusMinutes } = useLng();

  const initialDurationRef = useRef(25);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsRunning(false);
            addFocusMinutes(initialDurationRef.current);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, addFocusMinutes]);

  const startTimer = () => {
    if (!isRunning && minutes > 0) {
      initialDurationRef.current = minutes;
    }
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    initialDurationRef.current = 25;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black">
            {t('pomodoroTimer')}
          </h2>
          <p className="text-gray-400 text-sm mt-1 md:mt-2">
            {t('stayFocused')}
          </p>
        </div>

        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`px-4 py-2 rounded-2xl border transition-all duration-300 font-medium text-sm ${
            isFocusMode
              ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/30'
              : 'bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20'
          }`}
        >
          {isFocusMode ? t('focusModeOn') : t('focusModeOff')}
        </button>
      </div>

      <div className="flex justify-center items-center gap-3 md:gap-5 mb-10">
        <input
          type="text"
          inputMode="numeric"
          value={String(minutes).padStart(2, '0')}
          disabled={isRunning}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setMinutes(value !== '' ? Number(value) : 0);
          }}
          className={`w-24 md:w-36 text-center text-5xl md:text-7xl font-black bg-transparent outline-none border border-white/10 rounded-3xl py-4 md:py-6 transition-all ${
            isRunning
              ? 'opacity-50 cursor-not-allowed'
              : 'focus:border-violet-500'
          }`}
        />

        <span className="text-5xl md:text-7xl font-black text-violet-400">
          :
        </span>

        <input
          type="text"
          inputMode="numeric"
          value={String(seconds).padStart(2, '0')}
          disabled={isRunning}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value === '') {
              setSeconds(0);
              return;
            }
            value = Math.min(59, Number(value));
            setSeconds(value);
          }}
          className={`w-24 md:w-36 text-center text-5xl md:text-7xl font-black bg-transparent outline-none border border-white/10 rounded-3xl py-4 md:py-6 transition-all ${
            isRunning
              ? 'opacity-50 cursor-not-allowed'
              : 'focus:border-violet-500'
          }`}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        <button
          onClick={startTimer}
          className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all text-sm md:text-base shadow-lg shadow-violet-900/30"
        >
          <Play size={18} />
          {t('start')}
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm md:text-base"
        >
          <Pause size={18} />
          {t('pause')}
        </button>

        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/20 transition-all text-sm md:text-base"
        >
          <RotateCcw size={18} />
          {t('reset')}
        </button>
      </div>
    </div>
  );
}
