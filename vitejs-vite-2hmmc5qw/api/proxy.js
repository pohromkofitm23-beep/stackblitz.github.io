export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { group, sdate, edate } = req.query;
  const targetUrl = `https://dekanat.kubg.edu.ua/cgi-bin/timetable.cgi?n=700&group=${group}&sdate=${sdate}&edate=${edate}`;

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) throw new Error('Помилка сервера КУБГ');

    const html = await response.text();
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Не вдалося отримати дані з деканату' });
  }
}
