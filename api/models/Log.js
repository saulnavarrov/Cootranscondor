/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    code: {
      type: 'string',
    },
    status: {
      type: 'string',
      maxLength: 64
    },
    message: {
      type: 'string',
      maxLength: 255
    },
    description: {
      type: 'string',
      maxLength: 1024
    },
    controller: {
      type: 'string',
      required: true,
      maxLength: 128
    },
    funtion: {
      type: 'string',
      required: true,
      maxLength: 128
    },
    user: {
      model: 'users'
    },
  }
};
