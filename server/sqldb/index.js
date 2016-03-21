/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  //sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
  sequelize: new Sequelize('postgres://eladk:@localhost:5432/openprices')
};

// Insert models below
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.Retailer = db.sequelize.import('../api/retailer/retailer.model')

export default db;
