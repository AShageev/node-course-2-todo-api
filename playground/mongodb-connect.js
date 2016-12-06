const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if (err) {
        return console.log('Unable to connect to MongoDb Server', err);
    }

    console.log('Connected to MongoDb server.');

    db.collection('Users').count().then((count) => {
        console.log(`Users count: ${count}`);
    });
    db.collection('Todos').deleteMany({completed: false}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })
});