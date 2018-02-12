/* eslint-disable consistent-return */

import JSZip from 'jszip';
import Documents from '../../Documents/Documents';

let action;

const generateZip = (zip) => {
  try {
    zip.generateAsync({ type: 'base64' })
      .then(content => action.resolve(content));
  } catch (exception) {
    throw new Error(`[exportData.generateZip] ${exception.message}`);
  }
};

const addDocumentsToZip = (documents, zip) => {
  try {
    documents.forEach((document) => {
      zip.file(`${document.title}.txt`, `${document.title}\n\n${document.body}`);
    });
  } catch (exception) {
    throw new Error(`[exportData.addDocumentsToZip] ${exception.message}`);
  }
};

const getDocuments = (userId) => {
  try {
    return Documents.find({ owner: userId }).fetch();
  } catch (exception) {
    throw new Error(`[exportData.getDocuments] ${exception.message}`);
  }
};

const exportData = ({ userId }, promise) => {
  try {
    action = promise;
    const zip = new JSZip();
    const documents = getDocuments(userId);
    addDocumentsToZip(documents, zip);
    generateZip(zip);
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    exportData(options, { resolve, reject }));
