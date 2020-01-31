const ioRedis = require('ioredis');
const redis = require 

var cluster = new ioRedis.Cluster([{
    port: 6379,
    host: 'host1'
},
{
    port: 6382,
    host: 'host2'
},
{
    port: 6383,
    host: 'host3'
},
{
    port: 6384,
    host: 'host4'
},
{
    port: 6385,
    host: 'host5'
},
{
    port: 6386,
    host: 'host6'
}
], );

//console.log(cluster);
// console.log('Welcome to the Redis Cluster reader');
// console.log(cluster);

// cluster.set("foo", "bar",function(err,res){
//     console.log("insert");
// });
// cluster.get("foo", function(err, res) {
//     if(err) throw err;
//   console.log("hello "+res);
// });

// var nodes = [
//     "hello"
//   ];
//   var pub = new ioRedis.Cluster(nodes);
//   var sub = new ioRedis.Cluster(nodes);
//   sub.on("message", function(channel, message) {
//     console.log(channel, message);
//   });
  
//   sub.subscribe("news", function() {
//     pub.publish("news", "highlights");
//   });
cluster.set("foo", function(err) {
    err instanceof cluster.ReplyError;
  });
