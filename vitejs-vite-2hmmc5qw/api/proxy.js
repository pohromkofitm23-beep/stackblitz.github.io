export default async function handler(req, res) {
  // Дозволяємо доступ з будь-яких доменів (CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Забираємо параметри, які прийшли від фронтенду
    const { group, sdate, edate } = req.query;
    
    // Очищаємо ID групи від можливих помилкових знаків (наприклад, мінусів)
    const cleanGroup = group ? group.replace('-', '') : '';

    // Формуємо чисте посилання на розклад університету
    const targetUrl = `http://mod.kubg.edu.ua/cgi-bin/timetable.cgi?n=701&group=${cleanGroup}&sdate=${sdate}&edate=${edate}`;

    console.log("Fetching from University:", targetUrl);

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`University server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Повертаємо чисті дані фронтенду
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    // Навіть якщо сервер КУБГ віддав порожнечу, повертаємо пустий масив, щоб сайт не падав
    res.status(200).json([]);
  }
}
