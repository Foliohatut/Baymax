CREATE TABLE Sensors 
(
    id int NOT NULL AUTO_INCREMENT,
    sensorid varchar(20) NOT NULL,
    description text NOT NULL,
    PRIMARY KEY (id)
)

ALTER TABLE Sensors
ON DELETE CASCADE;

insert into Sensors(sensorid, description) select distinct ? from Sensors where ? not in (select sensorid from Sensors);