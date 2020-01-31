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
//connection initiated

//setvalue function 
function setSetsvalues(Setskey,Setvalue){
redisClient.sadd(Setskey ,Setvalue, function(err, reply) {
   // console.log(reply + " set(s) added !"); 
});

}
function getSetsvalue(Setskey){
redisClient.SMEMBERS( Setskey ,function(err,data){
    if (err) throw err;
   /// console.log(data);
})

}
//hashvalue function 
function sethashvalues(hashkey,hashvalue){

redisClient.hmset(
             hashkey,
             hashvalue,function(err,reply){
              //console.log(reply + " hash(s) added !"); 
            });
}

function gethashvalues(hashkey){ 
redisClient.hgetall( hashkey , function(err, object) {
  if (err) throw err;
  //console.log(object);
});
}

setSetsvalues('name',['abhi','indore','dev' ,'indore']);
getSetsvalue('name');

sethashvalues('nameaddress',{'abhishek1': 'indore','devesh1': 'indore'});
gethashvalues('nameaddress');
//redis clusters 
// var cluster = [
//   {name: 'redis01', link: '127.0.0.1:6379', slots: [   0, 5462], options: {max_attempts: 5}},
//   {name: 'redis02', link: '127.0.0.1:7379', slots: [5463, 12742], options: {max_attempts: 5}},
//   {name: 'redis03', link: '127.0.0.1:8379', slots: [12743, 16384], options: {max_attempts: 5}}
// ];
 
// var r = poorMansClusterClient(cluster);
 
// r.set('foo', 'bar', function (err, reply) {
//   if (err) throw err;
//   assert.equal(reply,'OK');
 
//   r.get('foo', function (err, reply) {
//     if (err) throw err;
//     assert.equal(reply, 'bar');
//   });
// });

var rediscl = new RedisCluster({
  servers : [
    {name: 'redis01', link: '127.0.0.1:6379', slots: [   0, 5462], options: {max_attempts: 5}},
    {name: 'redis02', link: '127.0.0.1:7379', slots: [5463, 12742], options: {max_attempts: 5}},
     {name: 'redis03', link: '127.0.0.1:8379', slots: [12743, 16384], options: {max_attempts: 5}}
    ],
  createClient: function(port, host) {
   
    // this is the default behaviour
 let connection = redis.createClient(port, host);
  // console.log(port);
  // console.log(host);
  console.log(connection);
  
  }

});
