/**
 * Historys.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {


    zonaId: {
      collection: 'zonas',
      via: 'his'
    },

    taxiId: {
      collection: 'taxis',
      via: 'hist'
    },

    InZona: {
      type: 'boolean',
      defaultTo: true,
      required: true
    },
    coleado: {
      type: 'boolean',
      defaultTo: false,
    },

    anotaciones: {
      type: 'String',
      defaultTo: false,
      maxLength: 1024
    },
    despachadorId: {
      model: 'users'
    },
    /*
    Fecha: Date:
    horaEntrada: Date
    HoraSalida: Date
    salidasExternas: String
     */

  }
};

