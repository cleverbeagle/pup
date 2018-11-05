import curl from './curl';
// NOTE: Import service handlers here

export default {
  // nameOfService(request) {
  //   // NOTE: Get type of request, different services will have different ways to get the type
  //   const type = request.body.type;
  //   // NOTE: Get specific service handler and use it
  //   const handler = stripe[type];
  //   if (handler) return handler(request.body);
  //   return `${type} is not supported.`;
  // },

  // NOTE: Below is an example using curl. In the terminal run the following commands:
  //
  // curl http://localhost:3000/webhooks/curl --data '{"username":"xyz","password":"xyz"}' -H "Content-Type: application/json"
  // curl http://localhost:3000/webhooks/curl?something=42 --data '{"username":"xyz","password":"xyz"}' -H "Content-Type: application/json" --request GET
  curl(request) {
    const type = request.method.toLowerCase();
    const handler = curl[type];
    if (handler) return handler(request);
    return `${type} is not supported.`;
  },
};
