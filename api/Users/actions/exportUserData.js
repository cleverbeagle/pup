/* eslint-disable consistent-return */

import JSZip from 'jszip';
import Documents from '../../Documents/Documents';

let action;

const generateZip = (zip) => {
  try {
    zip.generateAsync({ type: 'base64' }).then((content) => action.resolve({ zip: content }));
  } catch (exception) {
    throw new Error(`[exportUserData.generateZip] ${exception.message}`);
  }
};

const addDocumentsToZip = (documents, zip) => {
  try {
    documents.forEach((document) => {
      zip.file(`${document.title}.txt`, `${document.title}\n\n${document.body}`);
    });
  } catch (exception) {
    throw new Error(`[exportUserData.addDocumentsToZip] ${exception.message}`);
  }
};

const getDocuments = ({ _id }) => {
  try {
    return Documents.find({ owner: _id }).fetch();
  } catch (exception) {
    throw new Error(`[exportUserData.getDocuments] ${exception.message}`);
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error('options object is required.');
    if (!options.user) throw new Error('options.user is required.');
  } catch (exception) {
    throw new Error(`[exportUserData.validateOptions] ${exception.message}`);
  }
};

const exportUserData = (options) => {
  try {
    validateOptions(options);
    const zip = new JSZip();
    const documents = getDocuments(options.user);
    addDocumentsToZip(documents, zip);
    generateZip(zip);
  } catch (exception) {
    action.reject(`[exportUserData] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject };
    exportUserData(options);
  });
