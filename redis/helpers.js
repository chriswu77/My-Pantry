/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
const redisClient = require('.');

const getOrSetCache = (key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data) return resolve(JSON.parse(data));
      const newData = await cb();
      redisClient.set(key, JSON.stringify(newData));
      resolve(newData);
    });
  });
};

module.exports = { getOrSetCache };
