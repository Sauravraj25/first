var http = require("http");
var express = require('express');
var app = express();
var mssql = require('mssql');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
app.use(cors());
app.use(express.static('Nodejsproject'));
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

//rest api to get records from azure data
//query for preferred payment method
var request = new mssql.Request();
app.get('/first', function (req, res) 
{
   request.query('select payment_method,NumberofPayments as value from Vis_PreferredPaymentType order by NumberofPayments',
    function (error, results, fields) 
    {
	  if (error) throw error;
	  res.send(results.recordset);
	 });
   
});


// app.get('/first1', function (req, res) 
// {
//    request.query('select payment_method,percentage from Vis_PreferredPaymentType1',
//     function (error, results, fields) 
//     {
//     if (error) throw error;
//     res.send(results.recordset);
//    });
   
// });


// query for number of passengers counts each month 
app.get('/second', function (req, res) 
{
	request.query('select month,passenger_count as passengers from vis_passenger_per_month order by month',
     function(error,recordset,fields)
     {
    	if (error) throw error;
    	res.send(recordset.recordset);

    });
});
// query for busiest location wrt number of trips
app.get('/third',function(req,res)
{
  request.query('select top 10 location_detail,no_of_trips from Vis_Busiest_location',
    function(error,recordset,fields)
    {
      if (error) throw error;
      res.send(recordset.recordset);
    });
});


// query for vendor wise  payment method
app.get('/fourth',function(req,res)
{
  request.query('select VendorID,Credit_card,Cash from Vis_vendor_payment_method1 order by VendorID',
    function(error,recordset,fields)
    {
      if (error) throw error;
      res.send(recordset.recordset);
    });
});
// trips per month per vendor
app.get('/fifth',function(req,res)
{
  request.query('select * from Vis_Trips_PerMonth_PerVendor1 order by VendorID',
    function(error,recordset,fields)
    {
      if (error) throw error;
      res.send(recordset.recordset);
    });
});
// 
app.get('/sixth',function(req,res)
{
  request.query('select flag,floor(counts) as counts from vis_Trip_per_tip_bins order by counts desc',
    function(error,recordset,fields)
    {
      if (error) throw error;
      res.send(recordset.recordset);
    });
});
app.get('/seventh',function(req,res)
{
  request.query('select rate_id,floor(revenue) as revenu1 from Vis_totalrevenue_per_rateid order by revenue desc',
    function(error,recordset,fields)
    {
      if (error) throw error;
      res.send(recordset.recordset);
    });
});

app.get('/eighth',function(req,res)
{
  request.query('select distance_bin,floor(total_fare) as total_fare from Vis_fare_vs_distance',
    function(error,recordset,fields)
    {
      if (error) throw error;
      res.send(recordset.recordset);
    });
});
var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});



