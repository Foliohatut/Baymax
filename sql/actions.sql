CREATE TABLE Actions 
(
    id int NOT NULL AUTO_INCREMENT,
    a_id tinyint NOT NULL,
    value tinyint NOT NULL,
    date timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (a_id) REFERENCES ActionType(id)  
)