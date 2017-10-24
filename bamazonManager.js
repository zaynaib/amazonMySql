//require inquirer
var inquirer = require("inquirer");
//var customer = require("./bamazonCustomer.js");
var mysql = require("mysql");

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
  
   
});

function question(){
inquirer.prompt([{
   name: 'managerActions',
   message: 'Select an Option',
   type: 'list',
   choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
  }]).then( function (response) {
      
      //console.log(response.managerActions);

      //create a switch case for all manager actions
      managerActions(response.managerActions);
  })
};

//question();


//list every available item: the item IDs, names, prices, and quantities.
function viewProducts(){
	connection.query("SELECT * FROM products", function(err,res){
		console.log(err);
		for(var i = 0; i<res.length;i++){
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
		}
		console.log("-----------------------------------");
		//connection.end(); //end connection after established

	});//end of query

}

//it should list all items with an inventory count lower than five
function lowInventory(){
	var query = connection.query(
    "SELECT * From products WHERE stock_quantity < 5",
    function(err, res) {
      //loop through the array and format it for the manager
      console.log(err);
      console.log(res);
    });

  // logs the actual query being run
  console.log(query.sql);

}//end of function

//your app should display a prompt that will let the manager "add more" of any item currently in the store
function addInventory() {
	inquirer.prompt([{
    name: 'inventoryId',
    message: 'What is the id of the item you would like to add?',
    type: 'input',
   },
   {
    name: 'increaseInventory',
    message: 'How many items do you need?',
    type: 'input',
   }
   ]).then( function (response) {
      
      console.log(response.inventoryId);
      console.log(response.increaseInventory);

      var changeInventory ={
      	itemId : response.inventoryId,
      	add: response.increaseInventory
      }
      console.log(changeInventory);

  });//end of prompt
}

//it should allow the manager to add a completely new product to the store
//chain the two functions


//https://html5hive.org/how-to-chain-javascript-promises/
/*
function addNewProduct(id,num){
	console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: num +
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);

}
*/

function managerActions(questionResponse){
	switch(questionResponse){
		case 'View Products for Sale':
			viewProducts();
			//displayQuery();
		break;

		case 'View Low Inventory':
			lowInventory();
		break;

		case 'Add to Inventory':
			addInventory();
		break;

		case 'Add New Product':
			addNewProduct();
		break;


	}

}