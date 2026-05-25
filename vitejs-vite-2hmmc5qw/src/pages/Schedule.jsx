import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useLng } from '../context/LanguageContext';
import 'react-calendar/dist/Calendar.css';

const groupIds = {
  ІНб12340д: '-809',
  ІНб22340д: '-810',
};

const getPairTime = (pairNum) => {
  const schedule = {
    1: '08:30 – 09:40',
    2: '09:45 – 10:55',
    3: '11:15 – 12:25',
    4: '12:30 – 13:40',
    5: '13:45 – 14:55',
    6: '15:10 – 16:20',
    7: '16:25 – 17:35',
    8: '17:40 – 18:50',
  };
  return schedule[pairNum] || '13:45 – 14:55';
};

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWeekRange = (date) => {
  const current = new Date(date);
  const day = current.getDay();
  const diffToMonday = current.getDate() - day + (day === 0 ? -6 : 1);

  const monday = new Date(current.setDate(diffToMonday));
  const sunday = new Date(current.setDate(monday.getDate() + 6));

  const formatDate = (d) => {
    const dayStr = String(d.getDate()).padStart(2, '0');
    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
    return `${dayStr}.${monthStr}.${d.getFullYear()}`;
  };

  return { sdate: formatDate(monday), edate: formatDate(sunday) };
};

const localBackupSchedule = {
  ІНб12340д: [
    {
      date: '2026-05-25',
      time: '13:45 – 14:55',
      title:
        'Комп’ютерна графіка та анімація: Віртуальна та доповнена реальність (Лаб) - Горбатовський Д.В. (підгр. 1)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-25',
      time: '13:45 – 14:55',
      title:
        'Комп’ютерна графіка та анімація: Тривимірна комп’ютерна графіка (Лаб) - Співак С.М. (підгр. 2)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-25',
      time: '15:10 – 16:20',
      title:
        'Комп’ютерна графіка та анімація: Тривимірна комп’ютерна графіка (Лаб) - Співак С.М. (підгр. 1)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-25',
      time: '15:10 – 16:20',
      title:
        'Комп’ютерна графіка та анімація: Віртуальна та доповнена реальність (Лаб) - Горбатовський Д.В. (підгр. 2)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '15:10 – 16:20',
      title:
        'Технологічний практикум: Інформаційно-вимірювальна техніка (Лаб) - Іваніченко Є.В. (підгр. 1)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '16:25 – 17:35',
      title:
        'Практикум з розв’язання олімпіадних задач з інформатики (Пр) - Носенко Т.І.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '16:25 – 17:35',
      title:
        'Технологічний практикум: Інформаційно-вимірювальна техніка (Лаб) - Іваніченко Є.В. (підгр. 2)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '17:40 – 18:50',
      title:
        'Програмування: Крос-платформне програмування (Л) - Дібрівний О.А. Потік ІНб12340д, ІНб22340д',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '13:45 – 14:55',
      title:
        'Моделювання систем і процесів (Л) - Машкіна І.В. Потік ІНб12340д, ІНб22340д',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '15:10 – 16:20',
      title:
        'Моделювання систем і процесів (Л) - Машкіна І.В. Потік ІНб12340д, ІНб22340д',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '16:25 – 17:35',
      title:
        'Програмування: Крос-платформне програмування (Лаб) - Дібрівний О.А. (підгр. 1)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '17:40 – 18:50',
      title:
        'Програмування: Крос-платформне програмування (Лаб) - Дібрівний О.А. (підгр. 1)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-28',
      time: '13:45 – 14:55',
      title:
        'Іноземна мова: Іноземна мова-ІІ (поглиблений курс) (Пр) - Мельник О.В.',
      type: 'В університеті',
      room: 'Ауд. 502/1, Корпус 1',
    },
    {
      date: '2026-05-28',
      time: '15:10 – 16:20',
      title:
        'Іноземна мова: Іноземна мова-ІІ (поглиблений курс) (Пр) - Мельник О.В.',
      type: 'В університеті',
      room: 'Ауд. 502/1, Корпус 1',
    },
    {
      date: '2026-06-01',
      time: '13:45 – 14:55',
      title: 'Моделювання систем і процесів (Лаб) - Машкіна І.В. (підгр. 1)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-02',
      time: '15:10 – 16:20',
      title:
        'Програмування: Крос-платформне програмування (Л) - Дібрівний О.А.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-03',
      time: '11:15 – 12:25',
      title: 'Комп’ютерна графіка та анімація (Л) - Співак С.М.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-04',
      time: '13:45 – 14:55',
      title: 'Іноземна мова-ІІ (Пр) - Мельник О.В.',
      type: 'В університеті',
      room: 'Ауд. 502/1',
    },
    {
      date: '2026-06-05',
      time: '12:30 – 13:40',
      title: 'Практикум з розв’язання олімпіадних задач (Пр)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-06',
      time: '11:15 – 12:25',
      title: 'Консультація перед сесією - Дібрівний О.А.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-06',
      time: '12:30 – 13:40',
      title: 'Підготовка до захисту курсових робіт',
      type: 'Дистанційно',
      room: '',
    },
  ],
  ІНб22340д: [
    {
      date: '2026-05-25',
      time: '13:45 – 14:55',
      title:
        'Комп’ютерна графіка та анімація (Лаб) - Горбатовський Д.В. (підгр. 3)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-25',
      time: '15:10 – 16:20',
      title: 'Комп’ютерна графіка та анімація (Лаб) - Співак С.М. (підгр. 3)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '13:45 – 14:55',
      title: 'Технологічний практикум (Лаб) - Іваніченко Є.В. (підгр. 3)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '16:25 – 17:35',
      title: 'Практикум з розв’язання олімпіадних задач (Пр)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-26',
      time: '17:40 – 18:50',
      title: 'Програмування: Крос-платформне (Л) - Дібрівний О.А.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '13:45 – 14:55',
      title: 'Моделювання систем і процесів (Л) - Машкіна І.В.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '15:10 – 16:20',
      title: 'Моделювання систем і процесів (Л) - Машкіна І.В.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '16:25 – 17:35',
      title: 'Програмування (Лаб) - Дібрівний О.А. (підгр. 2)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-27',
      time: '17:40 – 18:50',
      title: 'Програмування (Лаб) - Дібрівний О.А. (підгр. 2)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-05-28',
      time: '13:45 – 14:55',
      title: 'Іноземна мова-ІІ (Пр) - Мельник О.В.',
      type: 'В університеті',
      room: 'Ауд. 502/1',
    },
    {
      date: '2026-05-28',
      time: '15:10 – 16:20',
      title: 'Іноземна мова-ІІ (Пр) - Мельник О.В.',
      type: 'В університеті',
      room: 'Ауд. 502/1',
    },
    {
      date: '2026-06-01',
      time: '13:45 – 14:55',
      title: 'Моделювання систем і процесів (Лаб) - Машкіна І.В. (підгр. 2)',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-02',
      time: '15:10 – 16:20',
      title: 'Програмування: Крос-платформне (Л) - Дібрівний О.А.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-03',
      time: '11:15 – 12:25',
      title: 'Комп’ютерна графіка та анімація (Л) - Співак С.М.',
      type: 'Дистанційно',
      room: '',
    },
    {
      date: '2026-06-04',
      time: '13:45 – 14:55',
      title: 'Іноземна мова-ІІ (Пр) - Мельник О.В.',
      type: 'В університеті',
      room: 'Ауд. 502/1',
    },
    {
      date: '2026-06-06',
      time: '11:15 – 12:25',
      title: 'Консультація перед сесією для ІНб22340д',
      type: 'Дистанційно',
      room: '',
    },
  ],
};

export default function Schedule() {
  const [value, setValue] = useState(new Date());
  const [activeGroup, setActiveGroup] = useState(
    () => localStorage.getItem('selectedGroup') || 'ІНб12340д'
  );
  const [realEvents, setRealEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customNotes, setCustomNotes] = useState(() => {
    const savedNotes = localStorage.getItem('scheduleNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });
  const [noteInput, setNoteInput] = useState('');

  const { t } = useLng();
  const selectedDateStr = formatDateToYYYYMMDD(value);

  const formatDisplayDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleGroupChange = (e) => {
    const group = e.target.value;
    setActiveGroup(group);
    localStorage.setItem('selectedGroup', group);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    const updatedNotes = {
      ...customNotes,
      [selectedDateStr]: [
        ...(customNotes[selectedDateStr] || []),
        noteInput.trim(),
      ],
    };
    setCustomNotes(updatedNotes);
    localStorage.setItem('scheduleNotes', JSON.stringify(updatedNotes));
    setNoteInput('');
  };

  const handleDeleteNote = (dateStr, indexToDelete) => {
    const updatedDayNotes = customNotes[dateStr].filter(
      (_, idx) => idx !== indexToDelete
    );
    const updatedNotes = { ...customNotes };
    if (updatedDayNotes.length === 0) delete updatedNotes[dateStr];
    else updatedNotes[dateStr] = updatedDayNotes;
    setCustomNotes(updatedNotes);
    localStorage.setItem('scheduleNotes', JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    const fetchLiveSchedule = async () => {
      setIsLoading(true);
      const { sdate, edate } = getWeekRange(value);
      const targetId = groupIds[activeGroup] || '-809';
      const localProxyUrl = `/api/proxy?group=${targetId}&sdate=${sdate}&edate=${edate}`;

      try {
        const response = await fetch(localProxyUrl);
        if (!response.ok) throw new Error('Помилка сервера');

        const htmlText = await response.text();
        if (!htmlText || htmlText.length < 500) throw new Error('Мало даних');

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const parsedEvents = [];
        const headings = doc.querySelectorAll('h4');

        headings.forEach((heading) => {
          const dateMatch = heading.textContent.match(/\d{2}\.\d{2}\.\d{4}/);
          if (dateMatch) {
            const dateText = dateMatch[0];
            const [d, m, y] = dateText.split('.');
            const formattedDate = `${y}-${m}-${d}`;

            let nextEl = heading.nextElementSibling;
            if (!nextEl && heading.parentElement)
              nextEl = heading.parentElement.querySelector('table');

            if (nextEl) {
              const rows = nextEl.querySelectorAll('tr');
              rows.forEach((row) => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                  const pairNumber = cells[0].textContent.trim();
                  const contentCell = cells[cells.length - 1];

                  if (contentCell) {
                    const contentHtml = contentCell.innerHTML;
                    const rawText = contentCell.textContent.trim();

                    if (
                      rawText &&
                      rawText.length > 5 &&
                      !rawText.includes('академічна група')
                    ) {
                      let cleanTitle = rawText
                        .replace(/Дистанційно/g, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                      const isRemote =
                        contentHtml.includes('remote_work') ||
                        rawText.includes('Дистанційно');

                      let roomInfo = '';
                      if (!isRemote) {
                        const audMatch = cleanTitle.match(/Ауд\.\s*\d+[^,.]*/i);
                        if (audMatch) {
                          roomInfo = audMatch[0];
                          cleanTitle = cleanTitle
                            .replace(audMatch[0], '')
                            .replace(/^,\s*/, '')
                            .trim();
                        } else {
                          roomInfo = 'Корпус КУБГ';
                        }
                      }

                      parsedEvents.push({
                        date: formattedDate,
                        time: getPairTime(pairNumber),
                        title: cleanTitle,
                        type: isRemote ? 'Дистанційно' : 'В університеті',
                        room: roomInfo,
                      });
                    }
                  }
                }
              });
            }
          }
        });

        if (parsedEvents.length === 0) throw new Error('Порожній тиждень');
        setRealEvents(parsedEvents);
      } catch (err) {
        setRealEvents(localBackupSchedule[activeGroup] || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveSchedule();
  }, [activeGroup, value]);

  const selectedEvents = realEvents.filter(
    (event) => event.date === selectedDateStr
  );
  const selectedDayNotes = customNotes[selectedDateStr] || [];

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDateToYYYYMMDD(date);
      let classes = [];
      if (realEvents.some((event) => event.date === dateStr)) {
        classes.push(
          '!text-violet-400 font-bold underline decoration-violet-500 decoration-2'
        );
      }
      if (customNotes[dateStr] && customNotes[dateStr].length > 0) {
        classes.push(
          'before:content-["•"] before:block before:text-amber-400 before:text-center before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2'
        );
      }
      return classes.join(' ');
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">
            {t('schedule') || 'Розклад'}
          </h1>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Група: <strong className="text-violet-400">{activeGroup}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
          <label
            htmlFor="group-select"
            className="text-xs text-gray-400 uppercase font-bold cursor-pointer"
          >
            ГРУПА:
          </label>
          <select
            id="group-select"
            value={activeGroup}
            onChange={handleGroupChange}
            className="text-white font-bold text-sm bg-zinc-900 border border-violet-500/30 px-3 py-1.5 rounded-xl outline-none"
          >
            <option value="ІНб12340д">ІНб12340д</option>
            <option value="ІНб22340д">ІНб22340д</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[420px_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 h-fit relative">
            <Calendar
              onChange={setValue}
              value={value}
              tileClassName={tileClassName}
              className="!bg-transparent !border-none text-white w-full relative"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
              📌 Додати дедлайн
            </h3>
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Здати лабораторну..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="flex-1 bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-4 rounded-xl"
              >
                +
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Події на {formatDisplayDate(selectedDateStr)}
            </h2>
          </div>

          <div className="space-y-6">
            {selectedDayNotes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                  Дедлайни:
                </span>
                {selectedDayNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                  >
                    <p className="text-amber-200 text-sm font-medium">
                      📌 {note}
                    </p>
                    <button
                      onClick={() => handleDeleteNote(selectedDateStr, idx)}
                      className="text-amber-500/50 hover:text-red-400 text-xs font-bold px-2"
                    >
                      Видалити
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              {selectedDayNotes.length > 0 && selectedEvents.length > 0 && (
                <span className="text-xs uppercase font-bold tracking-widest text-violet-400 block mb-2 mt-4">
                  Пари:
                </span>
              )}
              {isLoading ? (
                <div className="text-center py-12 text-gray-400 animate-pulse">
                  Завантаження...
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedEvents.length > 0 ? (
                    selectedEvents.map((event, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-xs text-violet-400 font-mono block">
                            {event.time}
                          </span>
                          <h3 className="text-lg font-bold text-white">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                event.type === 'Дистанційно'
                                  ? 'bg-sky-400'
                                  : 'bg-emerald-400'
                              }`}
                            ></span>
                            {event.type} {event.room ? `— ${event.room}` : ''}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : selectedDayNotes.length === 0 ? (
                    <div className="text-gray-400 py-12 text-center">
                      Пар на цей день немає
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
