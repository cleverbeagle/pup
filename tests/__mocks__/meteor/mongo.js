const Collection = jest.fn();

Collection.prototype.attachSchema = jest.fn();
Collection.prototype.insert = jest.fn();
Collection.prototype.update = jest.fn();
Collection.prototype.remove = jest.fn();
Collection.prototype.findOne = jest.fn();
Collection.prototype.allow = jest.fn();
Collection.prototype.deny = jest.fn();
Collection.prototype.helpers = jest.fn();

Collection.prototype.find = jest.fn(() => ({
  count: jest.fn(),
  fetch: jest.fn(),
}));

Collection.prototype.before = {
  insert: jest.fn(),
  update: jest.fn(),
};

Collection.prototype.after = {
  insert: jest.fn(),
  update: jest.fn(),
};

Collection.prototype.rawCollection = jest.fn(() => ({
  createIndex: jest.fn(),
}));

const RemoteCollectionDriver = jest.fn();

RemoteCollectionDriver.prototype.open = jest.fn().mockReturnThis();
RemoteCollectionDriver.prototype.insert = jest.fn();
RemoteCollectionDriver.prototype.update = jest.fn();
RemoteCollectionDriver.prototype.remove = jest.fn();
RemoteCollectionDriver.prototype.findOne = jest.fn();

RemoteCollectionDriver.prototype.find = jest.fn(() => ({
  count: jest.fn(),
  fetch: jest.fn(),
}));

module.exports = {
  Mongo: {
    Collection,
  },
  MongoInternals: {
    RemoteCollectionDriver,
  },
};
