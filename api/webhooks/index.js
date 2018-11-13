import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';
import handleWebhook from './handleWebhook';

Picker.middleware(bodyParser.json());

Picker.route('/webhooks/:service', (params, request, response) => {
  const service = handleWebhook[params.service];
  if (service) service(request, params);
  response.writeHead(200);
  response.end('[200] Webhook received.');
});
