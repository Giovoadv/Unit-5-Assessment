--PROBLEM 1

SELECT email FROM customers
ORDER BY email ASC;

--PROBLEM 2

SELECT id FROM orders 
WHERE customer_id = (SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker');

--PROBLEM 3

SELECT SUM(num_cupcakes) FROM orders
WHERE NOT processed;

--PROBLEM 4

SELECT name, SUM(num_cupcakes) AS sum
FROM orders
RIGHT JOIN cupcakes
ON orders.cupcake_id = cupcakes.id
GROUP BY name 
ORDER BY name ASC;


--PROBLEM 5

SELECT email, SUM( num_cupcakes) AS total
FROM orders
RIGHT JOIN customers
ON customers.id = orders.customer_id
GROUP BY email
ORDER BY SUM(num_cupcakes) DESC;

--PROBLEM 6

SELECT fname, lname, email
FROM customers
WHERE id = (SELECT DISTINCT customer_id
FROM orders
RIGHT JOIN cupcakes
ON cupcakes.id = orders.cupcake_id
WHERE cupcakes.name = 'funfetti' AND orders.processed);

