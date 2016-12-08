const { MongoClient, ObjectID } = require('mongodb');
const fs = require('fs');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable connect to MongoDB server ', err)
    }
    console.log('Connected to mongoDB server');

    var users = db.collection('Users').find().toArray().then((data) => {
        console.log('Fetch Users fom db');

        var strUsers = JSON.stringify(data);
        fs.writeFileSync('users.json', strUsers);
        console.log("write users to file");
        console.log(strUsers);

        var usersString = fs.readFileSync('users.json');
        var usersObj = JSON.parse(usersString);

        db.collection('Users').findOneAndUpdate(
            {
                _id: new ObjectID(usersObj[0]._id)
            },
            {
                $set: {
                    name: "Sasha"
                },
                $inc: {
                    age: -1
                }
            },
            {
                returnOriginal: false
            }).then((result) => {
                console.log('Updating result:', result);
            });

    }, (err) => {
        console.log('Unable fetch data from collection Users', err);
    });

    //db.close()
})
