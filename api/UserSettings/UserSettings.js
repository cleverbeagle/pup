import { Mongo } from 'meteor/mongo';

const UserSettings = new Mongo.Collection('UserSettings');

export default UserSettings;
