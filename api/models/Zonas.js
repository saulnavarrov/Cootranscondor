/**
 * Zonas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var hours = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
             '0:30', '1:30', '2:30', '3:30', '4:30', '5:30', '6:30', '7:30', '8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30', '20:30', '21:30', '22:30', '23:30',]

module.exports = {
  schema: true,
  attributes: {

    "numberZona": {
      type: 'Integer',
      unique: true,
      maxLength: 6,
      required: true,
    },

    "nameZona": {
      type: 'String',
      maxLength: 64,
      required: true,
    },

    "latitudZona": {
      type: 'Float',
      minLength: 1,
      maxLength: 64,
    },

    "longitudZona": {
      type: 'Float',
      minLength: 1,
      maxLength: 64,
    },

    "activeZona": {
      type: 'String',
      enum: ['active','disabled','deleted'],
      defaultsTo: 'active',
      required: true,
    },

   "horariZona": {
      type: 'Boolean',
      defaultsTo: false,
    },

    "hourStart": {
      type: 'String',
      enum: hours,
      maxLength: 5,
      defaultsTo: '12:00',
    },

    "hourEnd": {
      type: 'String',
      enum: hours,
      maxLength: 5,
      defaultsTo: '12:00',
    },

    "cityZona": {
      type: 'String',
      enum: ['Apartadó', 'Carepa'],
      required: true,
    },

    "version": {
      type: 'Integer',
      defaultsTo: 0,
    },

    "imagenZona": {
      type: 'String',
      defaultsTo: '/images/logo_1.png',
      maxLength: 254,
    },

    hist: {
      model: 'historys'
    },
  },
};

