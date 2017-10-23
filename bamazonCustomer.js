//require the node.js sql library
var mysql = require("mysql");


//configuration information of database
var config ={
	host:"localhost",
	port:3306,
	user: "root",
	password:"",
	database:"bamazon"
}

//connect to database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //queryAllSongs();
  //queryDanceSongs();
});


//how to end connection
//connection.end();

//create some CRUD functions (create read update delete)

/*


Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.

*/

function queryAllSongs() {
  connection.query("SELECT * FROM songs", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
    }
    console.log("-----------------------------------");
  });
}

 (item_id, product_name, department_name,price,stock_quantity)
//work on display functionality
function displayQuery(){
	connection.query("SELECT * FROM products", function(err,res){
		console.log(err);
		for(var i = 0; i<res.length;i++){
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
		}
		console.log("-----------------------------------");
		connection.end();

	});//end of displayQuery
	
}

/*
6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.



7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

*/