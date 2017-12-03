const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const path = require('path');

const server = 'mongodb://localhost/' + settings.db;
MongoClient.connect(server, (err, db) => {
  if (err) {
    return console.dir(err);
  }
  console.log('connected to db');
  db.collection('users', (err, collection) => {
    const docs = [
      {name: 'taguchi', socre: 40},
      {name: 'koji', socre: 80},
      {name: 'masashi', socre: 60},
    ];
    const stream = collection.find().stream();
    stream.on('data', (item) => {
      console.log(item);
    });
    stream.on('end', () => {
      console.log('finished');
    })
  })
});
