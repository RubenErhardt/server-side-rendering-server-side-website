import express from 'express';
import fetchJson from './helpers/fetch-json.js';

const app = express();

// Configureer EJS als view engine en stel de map met EJS-bestanden in
app.set('view engine', 'ejs');
app.set('views', './views');

// Verwijder express.json() middleware als je geen JSON-gegevens verwacht
// app.use(express.json());

// Gebruik express.urlencoded() middleware om formuliergegevens te parsen
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8000);

// GET-route voor de startpagina
app.get('/', async (req, res) => {
  try {
    // Render het formulier zonder gegevens als GET-verzoek
    res.render('./public/index.ejs', { data: null });
  } catch (error) {
    console.error('Fout bij het ophalen van gegevens:', error);
    res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
  }
});

// POST-route voor het verwerken van het formulier
app.post('/', async (req, res) => {
  try {
    // Haal het geselecteerde nummer uit het formulier op
    const { number } = req.body;

    // Voeg het filter toe aan de URL op basis van het geselecteerde nummer
    const apiUrl = await fetchJson(`https://fdnd-agency.directus.app/items/hf_sdgs?filter={"number":${number}}`);

    // Log de ontvangen gegevens
    console.log('Ontvangen gegevens van API:', apiUrl);

    // Render de pagina opnieuw met bijgewerkte gegevens
    res.render('./public/index.ejs', { data: apiUrl.data });
  } catch (error) {
    console.error('Fout bij het ophalen van gegevens:', error);
    res.status(500).json({ error: 'Er is een interne serverfout opgetreden' });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
