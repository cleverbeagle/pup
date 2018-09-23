export default (cache, { query, field, update }) => {
  const response = cache.readQuery({ query });
  cache.writeQuery({
    query,
    data: {
      [field]: update ? response[field].concat([update]) : response[field],
    },
  });
};
