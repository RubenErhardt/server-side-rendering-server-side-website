import express from 'express';
import fetchJson from './helpers/fetch-json.js';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'FDND',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('port', process.env.PORT || 8000);

app.get('/', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        res.render('home', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        req.session.data = data; 

        res.render('home', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/SDG', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        req.session.data = data; 

        res.render('SDG', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/vragenlijst', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        req.session.data = data; 

        res.render('vragenlijst', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/dashboard', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        req.session.data = data; 

        res.render('dashboard', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/updateClickedImages', (req, res) => {
    const { clickedImages } = req.body;
    console.log('Received Clicked Images:', clickedImages);
    req.session.clickedImages = clickedImages; // Store clickedImages in session

    res.json({ success: true });
});

app.get('/vragenlijst', async (req, res) => {
    try {
        const apiUrl = 'https://fdnd-agency.directus.app/items/hf_sdgs';
        const response = await fetchJson(apiUrl);
        const data = response.data || [];

        // Retrieve clickedImages from session
        const clickedImages = req.session.clickedImages || [];

        res.render('vragenlijst', { data, clickedImages });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(app.get('port'), () => {
    console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
