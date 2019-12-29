var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors')
var async = require('async');
var sql = require('mssql');
var session = require('express-session');
app.use(cors());
app.use(session({secret: 'super secret'}));
app.get('/', function (req, res) {
var config = {
    user: 'talladmin@tall-db-server',
    password: 'Tallpassword1',
    server: 'tall-db-server.database.windows.net',
    database:'tall-db',
    options: {encrypt: true},
    multipleStatements:true
};

   sql.connect(config, function (err) {
     if (err) console.log(err);

var request = new sql.Request();
var sessionData = req.session;
var id = req.session.userId;

async.parallel([
    function(callback) {
        var queryData = 'select Dim_date.month,count(FactTable_Taxitrip.passenger_count) as passengers from FactTable_Taxitrip  join Dim_date on FactTable_Taxitrip.PickupDate_key=Dim_date.date_key group by Dim_date.month';
        request.query(queryData, function (err, rows1) {
            if (err) {
                return callback(err);
            }
            return callback(null, rows1);
        });
    },
    function(callback)
    {
        var queryData1 = 'select month,count(*) as count1 from Dim_date group by month order by month';
        request.query(queryData1,id, function (err, rows2){
            if (err)
            {
                return callback(err);
            }
            return callback(null, rows2);
        });
    }
], function(error, callbackResults) {
    if (error) {
        //handle error
        console.log(error);
    } else {
        console.log(callbackResults[0]); // rows1
        console.log(callbackResults[1]); // rows2
        // use this data to send back to client etc.
    }
});
});
});
var server = app.listen(5001, function () {
    console.log('Server is running..');
    });