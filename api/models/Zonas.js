/**
 * Zonas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var hours = [ '01:00','01:15','01:30','01:45',
              '02:00','02:15','02:30','02:45',
              '03:00','03:15','03:30','03:45',
              '04:00','04:15','04:30','04:45',
              '05:00','05:15','05:30','05:45',
              '06:00','06:15','06:30','06:45',
              '07:00','07:15','07:30','07:45',
              '08:00','08:15','08:30','08:45',
              '09:00','09:15','09:30','09:45',
              '10:00','10:15','10:30','10:45',
              '11:00','11:15','11:30','11:45',
              '12:00','12:15','12:30','12:45',];

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
      type: 'Long',
      minLength: 1,
      maxLength: 64,
    },
    "longitudZona": {
      type: 'Long',
      minLength: 1,
      maxLength: 64,
    },
    "activeZona": {
      type: 'Boolean',
      defaultTo: true,
      required: true,
    },
    "imagenZona": {
      type: 'String',
      maxLength: 254,
    },
   "horariZona": {
      type: 'Boolean',
      defaultTo: false,
    },
    "horariZonaSet":{
      "hourStart": {
        type: 'String',
        enum: hours,
        defaultTo: '12:00',
      },
      "hourEnd": {
        type: 'String',
        enum: hours,
        defaultTo: '12:00',
      },
      "ampm": {
        type: 'Boolean',
        defaultTo: true,
        // True: am y False: pm
      }
    },
    "cityZona": {
      type: 'String',
      enum: ['Apartadó', 'Carepa'],
      required: true,
    },
    "version": {
      type: 'Integer',
      defaultTo: 0,
    },
    hist: {
      model: 'historys'
    }
  }
};

