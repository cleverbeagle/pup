const GET = ({ params }) => {
  console.log('Handle GET Request', {
    params,
  });
};

const POST = ({ params, request }) => {
  console.log('Handle POST Request', {
    params,
    body: request.body,
  });
};

const PUT = ({ params, request }) => {
  console.log('Handle PUT Request', {
    params,
    body: request.body,
  });
};

const DELETE = ({ params, request }) => {
  console.log('Handle DELETE Request', {
    params,
    body: request.body,
  });
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
