/**
 * Taxis.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    number:{
      type: 'Integer',
      maxLength: 4,
      unique: true,
    },
    placa:{
      type: 'String',
      maxLength: 7,
      unique: true
    },
    ciudad: {
      type: "String",
      maxLength: 64,
    },
    turno: {
      type: "Boolean",
      defaultTo: true,
      // true, trabaja doble turno
      // false, trabaja medio turno
    },
    horario:{
      type: "Boolean",
      defaultTo: true,
      // true, Dia
      // false, Noche
    },
    active:{
      type: 'Boolean',
      defaultTo: true,
    },
    imagen:{
      type: 'String',
      maxLength: 254,
    },
  }
};

