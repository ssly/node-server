const common = require('./assets/common');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongodbUrl = 'mongodb://lius.me:27017/ly';

module.exports = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongodbUrl, (err, db) => {
            if (err) {
                console.error(common.time() + 'mongodb: connection error.');
                reject(err);
                return;
            }
            console.log(common.time() + 'mongodb: connection successfully.');
            resolve(db);
        });
    });
}