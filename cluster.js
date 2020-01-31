var ioRedis = require("ioredis");
const redis = require('redis');
let redisClient = redis.createClient();
//var RedisCluster = require('redis-cluster').clusterClient;
var RedisCluster = require('redis-clustr');
//var rediscl = RedisCluster;
//var redisPubSub = RedisCluster;
//var assert = require('assert');

redisClient.on('connect', function(){
  console.log('Redis Connection Successful');
});


var cluster = new ioRedis.Cluster([
    {enableReadyCheck: false},
  {
    port: 6388,
    host: "127.0.0.1"
  },
  {
    port: 6389,
    host: "127.0.0.1"
  }
]);

cluster.set("foo", "bar");
cluster.get("foo", function(err, res) {
  // res === 'bar'
});