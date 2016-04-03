CREATE TABLE all_values (
	id INT NOT NULL AUTO_INCREMENT,
	value_details INT NOT NULL,
	date TIMESTAMP,
	PRIMARY KEY(id),
	FOREIGN KEY(value_details) REFERENCES value_details(id)	
);