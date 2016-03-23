/**
 * Created by Akshay on 3/4/2015.
 */
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

/** app.get('/people', function (req, res) {
    Person.find(function (err, doc) {
        res.send(doc);
    })
}); **/
                                            //modify req to include username, to determine collection
app.post('/', function(req, res, next){    //req variable is a JSON document
    MongoClient.connect('mongodb://localhost:27017/stopwatchData', function(err, db) {
        if(err) throw err;

        if(typeof db.collection('data').find({name: req.name}) === 'object') {
            var dbStoredInstance = db.collection('data').find({name: req.name});
            if(typeof dbStoredInstance[req.sport] === 'object') {
                var temp = {};
                temp[req.sport] = {'$push': req[req.sport]};
                db.collection('data').update({name: req.name}, temp);
            } else {
                var tempObject = {};
                tempObject[req.sport] = [req[req.sport]];
                db.collection('data').update({name: req.name}, tempObject, function(err, inserted) {
                    if(err) throw err;

                    return db.close();
                }); //pass in stored JSON document
            }
            //if not, create array
        } else {
            //find sports and make them into arrays; stores as req1
            var req1 = {};
            req1[name] = req[name];
            req1[req.sport] = [req[req.sport]];
            db.collection('data').insert(req1);
        }
    });
});

app.listen(3000);