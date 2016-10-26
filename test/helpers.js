import supertest from 'supertest';
import chai from 'chai';
import app from '../Server';

exports.app = app;
exports.request = supertest(app);
exports.expect = chai.expect;
