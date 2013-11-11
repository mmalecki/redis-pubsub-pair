var redis = require('redis');
var createPubSubPair = require('../');

var pair = createPubSubPair(redis.createClient, {
  redis: {
    host: 'localhost',
    port: 6379
  },
  channel: 'pubsub'
}, function (err) {
  var sub = pair.sub;
  var pub = pair.pub;

  if (err) {
    throw err;
  }

  sub.on('message', function (channel, data) {
    console.log('message:', channel, data.toString('utf8'));
  });

  pub.publish('pubsub', 'hello world');
});
