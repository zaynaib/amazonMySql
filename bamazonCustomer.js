//require the node.js sql library
var mysql = require("mysql");

//require the inquirer 
var inquirer = require("inquirer");

//configuration information of database
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user: "root",
	password:"1234",
	database:"bamazon"
});

//connect to database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //queryAllSongs();
  displayQuery();
   
});

  


//create some CRUD functions (create read update delete)

/*
Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.
*/

//(item_id, product_name, department_name,price,stock_quantity)
//work on display functionality
function displayQuery(){
	connection.query("SELECT * FROM products", function(err,res){
		console.log(err);
		for(var i = 0; i<res.length;i++){
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
		}
		console.log("-----------------------------------");
    question();
		//connection.end(); //end connection after established

	});//end of displayQuery
}

//this function prompts the user to ask a letter
function question(){
inquirer.prompt([{
    type: "input",
    name: "idSelect",
    message: "What's the ID of the product you would like to buy?"
  },
  {
    type: "input",
    name: "unitSelect",
    message: "How many units of the product you would like to buy?"
  }]).then( function (response) {
      var prodId = parseInt(response.idSelect);
      var units = response.unitSelect;
    
      //console.log(response.idSelect);
      //console.log(response.unitSelect);
      placeOrder(prodId,units);

  })
};

/*
Once the customer has placed the order, your application should check if your 
store has enough of the product to meet the customer's request.
*/

function placeOrder(productId,numUnits) {
  console.log("Customer is placing an order...\n");
  var query = connection.query(
    "SELECT stock_quantity FROM products WHERE item_id=?",
    [productId],
    function(err, res) {
      if(err){
        console.log(err)
      }
      console.log(res);
      
      var quantity = res[0].stock_quantity;
      if(parseInt(quantity)<numUnits){
        console.log("we are out of stock");
      }else{
        console.log("This item available");
        updateProduct(productId,numUnits,quantity);
      }
      
      //console.log(quantity);
      
    }

    
  ); //end of query

  // logs the actual query being run
  console.log(query.sql);
};


//updating products
function updateProduct(id,customerUnits,currentQuantity) {
  console.log("Updating quantity...\n");
  var updatedQuantity = currentQuantity - customerUnits;
  console.log(updatedQuantity);
  
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [{
        stock_quantity:updatedQuantity
        //stock_quantity:118
      },
      {
        item_id:id
      }
    ],
    function(err, res) {
      //console.log(res.affectedRows);
      console.log(res.affectedRows);
    });

  // logs the actual query being run
  console.log(query.sql);
  connection.end();//be careful with connection end statements

}






