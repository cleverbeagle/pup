export default (value) => {
  let unfrozenValue = JSON.parse(JSON.stringify(value));

  if (unfrozenValue instanceof Array) {
    unfrozenValue = unfrozenValue.map(({ __typename, ...rest }) => ({ ...rest }));
  }

  if (unfrozenValue instanceof Object) {
    delete unfrozenValue.__typename; // eslint-disable-line
  }

  return unfrozenValue;
};
