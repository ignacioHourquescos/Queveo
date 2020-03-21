CREATE TABLE actor_pelicula (	
      id INT NOT NULL auto_increment,
      actor_id INT NOT NULL,
      pelicula_id INT NOT NULL,   
      PRIMARY KEY (id),
      FOREIGN KEY (actor_id) REFERENCES actor(id),
      FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
)
