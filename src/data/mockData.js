export const weeklyStats = [
  { name: 'Пн', hours: 4.5, tasks: 3 },
  { name: 'Вт', hours: 6.2, tasks: 5 },
  { name: 'Ср', hours: 5.8, tasks: 4 },
  { name: 'Чт', hours: 7.0, tasks: 6 },
  { name: 'Пт', hours: 3.5, tasks: 2 },
  { name: 'Сб', hours: 2.0, tasks: 1 },
  { name: 'Нд', hours: 4.0, tasks: 3 }
];

export const subjectDistribution = [
  { name: 'Веб-дизайн', value: 40 },
  { name: 'Дискретна Математика', value: 25 },
  { name: 'Інженерія ПЗ', value: 20 },
  { name: 'Бази Даних', value: 15 }
];

export const heatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 5)
}));