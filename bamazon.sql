
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name varchar(255),
    department_name varchar(255),
    price DECIMAL(20,2)	,
    stock_quantity INTEGER(11) 
);

