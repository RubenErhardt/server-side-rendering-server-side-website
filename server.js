
import fetchJson from './helpers/fetch-json.js'

// Rest van je server.js-bestand
const apiUrl = await fetchJson('https://fdnd-agency.directus.app/items/hf_scores?filter=%7B%22stakeholder_id%22:1%7D');
console.log(apiUrl.data);

