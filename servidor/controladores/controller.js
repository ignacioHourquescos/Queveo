var con = require('../lib/conexionbd');

function buscarPeliculas(req,res){
      var sql="SELECT * FROM PELICULA";
      con.query(sql,function(error,resultado,fields){
      var response =  {
            'peliculas':resultado
      };        
      res.send(JSON.stringify(response));
      });
}

module.exports ={
      buscarPeliculas:buscarPeliculas
};