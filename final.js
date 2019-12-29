var http = require("http");
var express = require('express');
var app = express();
var mssql = require('mssql');
var bodyParser = require('body-parser');
var connection = {
        user: 'talladmin@tall-db-server',
        password: 'Tallpassword1',
        server: 'tall-db-server.database.windows.net', 
        database: 'tall-db',
        options: {encrypt: true}
};
 
 
mssql.connect(connection,function(err) {
  if (err) throw err
  console.log('You are now connected with mssql database...')
})
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
//rest api to get records from azure data
var request = new mssql.Request();
app.get('/first', function (req, res) {
   request.query('select month,count(*) as count1 from Dim_date group by month order by month', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results.recordset));
	});
   
});

//var request1 = new mssql.Request();

app.get('/second', function (req, res) {
	request.query('select Dim_date.month,count(FactTable_Taxitrip.passenger_count) as passengers from FactTable_Taxitrip  join Dim_date on FactTable_Taxitrip.PickupDate_key=Dim_date.date_key group by Dim_date.month',
     function(error,recordset,fields){
    	if (error) throw error;
    	res.end(JSON.stringify(recordset.recordset));

});
});