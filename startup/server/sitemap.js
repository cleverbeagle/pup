import xml from 'xml';
import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import Documents from '../../api/Documents';
import { iso } from '../../modules/dates.js';

/*
  TODO:
  - Find a way to automate route pulls (don't do it now, rabbit hole).
*/

const baseUrl = Meteor.absoluteUrl();

// No slash at front because it comes with baseUrl.
const routes = [
  { base: 'signup' },
  { base: 'login' },

  { base: 'verify-email' },
  { base: 'recover-password' },
  { base: 'reset-password' },

  { base: 'terms' },
  { base: 'privacy' },
  { base: 'example-page' },

  {
    base: 'documents',
    collection: Documents,
    // edit this query to limit what you publish
    query: {},
    projection: { fields: { _id: 1, createdAt: 1 }, sort: { createdAt: -1 } },
  },
];

const sitemap = {
  urlset: [{ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } }],
};

routes.forEach(({ base, collection, query, projection }) => {
  const currentDateTime = new Date().toISOString();
  const urlTemplate = (path, date, priority) => ({
    url: [
      { loc: `${baseUrl}${path}` },
      { lastmod: iso(date) },
      { changefreq: 'monthly' },
      { priority },
    ],
  });

  sitemap.urlset.push(urlTemplate(base, currentDateTime, '1.0'));

  if (collection) {
    const items = collection.find(query, projection).fetch();
    if (items.length > 0) {
      items.forEach(({ _id, createdAt }) => {
        sitemap.urlset.push(urlTemplate(`${base}/${_id}`, createdAt, 0.5));
      });
    }
  }
});

Picker.route('/sitemap.xml', (params, request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/xml' });
  response.end(xml(sitemap, { declaration: { standalone: 'yes', encoding: 'utf-8' } }));
});
