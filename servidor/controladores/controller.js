var con = require('../lib/conexionbd');


//http://localhost:8080/peliculas?pagina=1&genero=7&anio=2003&cantidad=52&columna_orden=titulo&tipo_orden=ASC


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


function cargarGeneros(req,res){
      var sql="SELECT * FROM GENERO";
      con.query(sql, function(error, resultado,fields){
      var response ={
            'generos' : resultado
      };
      res.send(JSON.stringify(response));
      })
}

module.exports ={
      buscarPeliculas:buscarPeliculas,
      cargarGeneros:cargarGeneros
};