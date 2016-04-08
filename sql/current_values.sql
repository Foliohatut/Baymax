CREATE TABLE current_values (
	id INT NOT NULL AUTO_INCREMENT,
	value_detail INT NOT NULL,
	value INT NOT NULL,
	date TIMESTAMP NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(value_detail) REFERENCES value_details(id)	
);