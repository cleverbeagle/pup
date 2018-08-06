/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Documents from './Documents';
import handleMethodException from '../../modules/handleMethodException';
import rateLimit from '../../modules/rateLimit';

Meteor.methods({
  'documents.findOne': function documentsFindOne(documentId) {
    check(documentId, Match.OneOf(String, undefined));

    try {
      return Documents.findOne(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'documents.insert': function documentsInsert(doc) {
    check(doc, {
      title: String,
      body: String,
    });

    try {
      return Documents.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'documents.update': function documentsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const documentId = doc._id;
      const docToUpdate = Documents.findOne(documentId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Documents.update(documentId, { $set: doc });
        return documentId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', "Sorry, pup. You're not allowed to edit this document.");
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'documents.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      const docToRemove = Documents.findOne(documentId, { fields: { owner: 1 } });

      if (docToRemove.owner === this.userId) {
        return Documents.remove(documentId);
      }

      throw new Meteor.Error('403', "Sorry, pup. You're not allowed to delete this document.");
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: ['documents.insert', 'documents.update', 'documents.remove'],
  limit: 5,
  timeRange: 1000,
});
