const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('connect', (err) => {
  if (err) {
    console.log('Redis could not connect');
  } else {
    console.log('Redis connected');
  }
});

module.exports = redisClient;
