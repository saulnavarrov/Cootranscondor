/**
 * Logs.js
 *
 * Permitira guardar los logs de una manera mucho mas simple en la base de datos,
 * ya que estaran organizados y guardados seran llamados mucho mas rapido
 * con el servicio,
 * @type {Object}
 */
module.exports = {

  /**
   * Guarda el nuevo log en caso de que halla problemas
   * @param  {[type]} code        [Codigo en numero del problema que se genera]
   * @param  {[type]} status      [Estado del log, ya sea ok, success, warnign, error, message]
   * @param  {[type]} message     [Mensaje que viene interno en el error]
   * @param  {[type]} description [La description del mensaje]
   * @param  {[type]} controller  [Controlador que lo proboca]
   * @param  {[type]} funtion     [La funcion dentro del controlador]
   * @param  {[type]} user        [Que usuario genero el error]
   * @return {[type]}             [La fecha y la hora la genera el schema del models]
   */
  newLogs: (code, status, message, description, controller, funtion, user) => {
    var datas = {
      code: code,
      status: status,
      message: message,
      description: description,
      controller: controller,
      funtion: funtion,
      user: user
    };

    Logs.create(datas).exec(function (err, logs){
      if (err) { sails.error(err) };
    });
  }
}
