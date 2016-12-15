/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    numberId: {
      type: 'Integer',
      minLength: 6,
      maxLength: 12,
      unique: true,
      required: true,
    },
    password: {
      type: 'String',
      maxLength: 256,
      required:true,
    },
    roll: {
      type: 'Integer',
      enum: [0,1,2,3],
      required: true,
    },
    active: {
      type: 'Boolean',
      defaultTo: true,
    },
    name: {
      type: 'String',
      minLength: 3,
      maxLength: 64,
    },
    lastname: {
      type: 'String',
      minLength: 3,
      maxLength: 64,
    },
    imagen: {
      type: 'String',
      maxLength: 254,
    },
    connect: {
      type: 'Boolean',
      defaultTo: false
    },
  }
};

