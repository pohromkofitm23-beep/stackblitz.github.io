export default async function handler(req, res) {
  const { group, sdate, edate } = req.query;
  const targetUrl = `http://mod.kubg.edu.ua/cgi-bin/timetable.cgi?group=${group || ''}&sdate=${sdate || ''}&edate=${edate || ''}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch timetable' });
    }

    const html = await response.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
