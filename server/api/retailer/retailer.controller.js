/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/retailers              ->  index
 * POST    /api/retailers              ->  create
 * GET     /api/retailers/:id          ->  show
 * PUT     /api/retailers/:id          ->  update
 * DELETE  /api/retailers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Retailer} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Retailers
export function index(req, res) {
  return Retailer.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Retailer from the DB
export function show(req, res) {
  return Retailer.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Retailer in the DB
export function create(req, res) {
  return Retailer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Retailer in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Retailer.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Retailer from the DB
export function destroy(req, res) {
  return Retailer.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
