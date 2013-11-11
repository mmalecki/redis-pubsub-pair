var assert = require('assert');
var redis = require('redis');
var cb = require('assert-called');
var createPubSubPair = require('../');

var CHANNEL = 'pubsub';
var MESSAGE = 'Hello world';

var pair = createPubSubPair(redis.createClient, {
  redis: {
    host: 'localhost',
    port: 6379
  },
  channel: CHANNEL
}, cb(function (err) {
  var sub = pair.sub;
  var pub = pair.pub;

  if (err) {
    throw err;
  }

  sub.on('message', cb(function (channel, data) {
    assert.equal(channel, CHANNEL);
    assert.equal(data.toString('utf8'), MESSAGE);
    process.exit();
  }));


  pub.publish(CHANNEL, MESSAGE);
}));
