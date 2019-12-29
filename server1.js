var express = require('express');
var app = express();
var result;
var fs = require('fs');
var cors = require('cors')

app.use(cors());

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'talladmin@tall-db-server',
        password: 'Tallpassword1',
        server: 'tall-db-server.database.windows.net', 
        database: 'tall-db',
        options: {encrypt: true}
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select  month,passenger_count  from vis_passenger_per_month order by month',

         function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            res.send(recordset.recordset);
            
        });
    });
});

var server = app.listen(4000, function () {
    console.log('Server is running..');
});