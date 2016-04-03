CREATE TABLE temperature_values (
	id INT NOT NULL AUTO_INCREMENT,
	valueid INT NOT NULL,
	value float NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(valueid) REFERENCES all_values(id)
);