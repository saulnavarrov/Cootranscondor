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

