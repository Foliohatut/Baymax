create table temperatures (
    id int NOT NULL AUTO_INCREMENT,
    s_id int NOT NULL,
    temp int,
    date timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (s_id) REFERENCES Sensors(id)    
)

select * from temperatures where sensorid = 'a'
IF(a)

insert into Sensors(sensorid, description) values('123', 'testi') where 
NOT EXISTS (select 1 from Sensors);

IF NOT EXISTS(select 1 from Sensors)
BEGIN
    insert into Sensors(sensorid, description) values('123', 'testi')
END 