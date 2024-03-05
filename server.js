import express from 'express';
import fetchJson from './helpers/fetch-json.js';

const app = express();

// Configureer EJS als view engine en stel de map met EJS-bestanden in
app.set('view engine', 'ejs');
app.set('views', './views');

app.set('port', process.env.PORT || 8000);

app.get('/', async (req, res) => {
  try {
    const apiUrl = await fetchJson('https://fdnd-agency.directus.app/items/hf_scores?filter=%7B%22stakeholder_id%22:1%7D');
    res.render('./public/index.ejs', { data: apiUrl.data }); // Render de EJS-template met de gegevens
  } catch (error) {
    console.error('Fout bij het ophalen van gegevens:', error);
    res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
