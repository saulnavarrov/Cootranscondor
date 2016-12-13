/**
 * FrontPagesController
 *
 * @description :: Server-side logic for managing frontpages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Layouts View controller
	dashboard: (req, res) => {
    return res.view('dashBoard/index');
  },

  // Layouts View controller
  history: (req, res) => {
    return res.view('history/index');
  },

  // Layouts View controller
  logs: (req, res) => {
    return res.view('logs/index');
  },

  // Layouts View controller
  permises: (req, res) => {
    return res.view('permises/index');
  },

  // Layouts View controller
  taxis: (req, res) => {
    return res.view('taxis/index');
  },

  // Layouts View controller
  zonas: (req, res) => {
    return res.view('zonas/index');
  },

  // Layouts View controller
  users: (req, res) => {
    return res.view('users/index');
  },

  // Layouts View controller
  login: (req, res) => {
    return res.view('login/index');
  },

};
