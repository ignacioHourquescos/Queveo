var con = require('../lib/conexionbd');

function buscarPeliculas(req,res){  
      var anio =req.query.anio;
      var titulo=req.query.titulo;
      var genero=req.query.genero;
      var columna_orden=req.query.columna_orden;
      var tipo_orden=req.query.tipo_orden;
      var pagina=req.query.pagina;
      var cantidad=req.query.cantidad;

      
      var               sql= "SELECT * FROM PELICULA WHERE 1=1"
      if(anio)          sql+=" AND anio="+anio;
      if(titulo)        sql+=" AND titulo like '%"+titulo+"%'";
      if(genero)        sql+=" AND genero="+genero;
      if(columna_orden) sql+=" ORDER BY "+columna_orden+" "+tipo_orden;
                        //sql+=" LIMIT "+((pagina-1)*cantidad)+","+cantidad;

      con.query(sql,function(error,resultado,fields){
            var response =  {
                  'total':resultado.length,
                  'peliculas':resultado.slice((pagina-1)*cantidad, cantidad*pagina)               
            };     
            res.send(JSON.stringify(response));
            });
}

//funcion que carga los generos
function cargarGeneros(req,res){
      var sql="SELECT * FROM GENERO";
      con.query(sql, function(error, resultado,fields){
      var response ={
            'generos' : resultado
      };
      res.send(JSON.stringify(response));
      })
}

//funcion que va a cargar la ficha de cada pelicula particular
function detallePelicula (req,res){
      var id=req.params.id;
      var sqlpelicula="SELECT * FROM pelicula join actor_pelicula on pelicula.id=actor_pelicula.pelicula_id join actor on actor_pelicula.actor_id=actor.id where pelicula.id="+id;
      var sqlactores=`SELECT actor.nombre FROM actor join actor_pelicula on actor.id=actor_id where pelicula_id=${id}`;
      var sqlgenero="SELECT genero.nombre FROM genero,pelicula where genero_id=genero.id AND pelicula.id="+id;

      con.query(sqlpelicula, function(error,resultadopelicula,fields){
            if (error){ 
                  console.log("hubo un error en la consutla", error.message);
                  return res.status(404).send("Error en la consulta");
            }else{
                  con.query(sqlactores, function(error,resultadoactores,fields){
                        con.query(sqlgenero, function(error,resultadogenero,fields){
                        var response={
                              'pelicula':resultadopelicula[0],
                              'actores':resultadoactores,
                              'genero':resultadogenero[0]
                        };
                        res.send(JSON.stringify(response));
                        });
                  });
            }
      });
}


//"http://localhost:8080/peliculas/recomendacion?genero=Drama&anio_inicio=1900&anio_fin=2005&puntuacion=7".

function recomendacion(req,res){
      var genero        =req.query.genero;
      var anio_inicio   =req.query.anio_inicio;
      var anio_fin      =req.query.anio_fin;
      var puntuacion    =req.query.puntuacion;
     
      var               sql= "SELECT * FROM PELICULA WHERE 1=1"
      if (genero)       sql+=" AND genero_id=4";
      if (anio_inicio)  sql+=" AND anio BETWEEN "+anio_inicio+" AND "+anio_fin;
      if (puntuacion)   sql+=" AND puntuacion>="+puntuacion;

      con.query(sql, function(error,resultado,fields){
            if(error){
                  console.log("hubo un error en la consutla", error.message);
                  return res.status(404).send("Error en la consulta");
            }
            var response={
                  'peliculas':resultado
            }
            res.send(JSON.stringify(response));      
            }
      )

}

module.exports ={
      buscarPeliculas:buscarPeliculas,
      cargarGeneros:cargarGeneros,
      detallePelicula:detallePelicula,
      recomendacion:recomendacion
};