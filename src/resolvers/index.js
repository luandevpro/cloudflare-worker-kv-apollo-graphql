const merge = require('lodash.merge');
const { Query } = require('./query');
const { Mutation } = require('./mutation');
const { Post } = require('./post');
const { User } = require('./user');

module.exports = merge(Query, Mutation, Post, User);
