# redis-pubsub-pair
[![Build Status](https://travis-ci.org/mmalecki/redis-pubsub-pair.png)](https://travis-ci.org/mmalecki/redis-pubsub-pair)

Open a Redis Pub/Sub pair ensuring that Sub client is subscribed.

## Usage

```js
var redis = require('redis');
var createPubSubPair = require('redis-pubsub-pair');

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
```
