module.exports = function (factory, options, callback) {
  if (typeof options.channel !== 'string') {
    throw new TypeError('`options.channel` is required');
  }

  var pub = factory(options.redis);
  var sub = factory(options.redis);
  var ret = { pub: pub, sub: sub };
  var channel = options.channel;

  sub.subscribe(channel, function (err, channel_) {
    if (channel_ === channel) {
      callback(err, ret);
    }
  });

  return ret;
};
