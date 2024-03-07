import express from 'express';
import fetchJson from './helpers/fetch-json.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

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

app.post('/updateClickedImages', (req, res) => {
    const { clickedImages } = req.body;
    console.log('Received Clicked Images:', clickedImages);
    res.cookie('clickedImages', JSON.stringify(clickedImages));

    res.json({ success: true });
});

app.get('/vragenlijst', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        // Retrieve clickedImages from cookies or any other storage mechanism
        const clickedImages = JSON.parse(req.cookies.clickedImages || '[]');

        res.render('vragenlijst', { data, clickedImages });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(app.get('port'), () => {
    console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
