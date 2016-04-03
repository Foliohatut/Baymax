CREATE TABLE other_values (
	id INT NOT NULL AUTO_INCREMENT,
	value_details INT NOT NULL,
	value TINYINT NOT NULL,
	date TIMESTAMP NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(value_details) REFERENCES value_details(id)
);