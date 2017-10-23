
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name varchar(255),
    department_name varchar(255),
    price DECIMAL(20,2)	,
    stock_quantity INTEGER(11), 
    PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name,price,stock_quantity)
VALUES (1,"vanilla ice-cream", "Dairy", 2.50,10), (2,"chocolate ice-cream", "Dairy",3.10, 120), (3,"strawberry ice-cream","Dairy" ,3.25,2),
(4,"socks", "Apparel", 5.50,2),(5,"underwear", "Apparel", 10.50,50),(6,"laptop", "Electronics", 500.00,80)
,(7,"iPhone", "Electornics", 900.85,50),(8,"iPod", "Electornics", 500.00,2),(9,"Dawn Soap", "Household", 2.50,100),
(10,"pusheen", "toys", 20.50,25);

