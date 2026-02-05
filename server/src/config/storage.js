const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    keyFilename: path.join(__dirname, '../../gcs-key.json'),
});

const bucket = storage.bucket('streamtube');

module.exports = {
    storage,
    bucket,
};
