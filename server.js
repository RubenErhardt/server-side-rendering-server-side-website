import express from 'express';
import fetchJson from './helpers/fetch-json.js';

const app = express()
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', './views');

app.set('port', process.env.PORT || 8000);

app.get('/', async (req, res) => {
    try {
      const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
      const response = await fetchJson(apiUrl);
      const data = response.data || [];
  
      res.render('index', { data });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

app.listen(app.get('port'), () => {
  console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
