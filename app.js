const redis = require('redis');
let redisClient = redis.createClient();

redisClient.on('connect', function(){
  console.log('Redis Connection Successful');
});
//connection initiated

//setvalue function 
function setSetsvalues(Setskey,Setvalue){
redisClient.sadd(Setskey ,Setvalue, function(err, reply) {
    console.log(reply + " set(s) added !"); 
});

}
function getSetsvalue(Setskey){
redisClient.SMEMBERS( Setskey ,function(err,data){
    if (err) throw err;
    console.log(data);
})

}
//hashvalue function 
function sethashvalues(hashkey,hashvalue){

redisClient.hmset(
             hashkey,
             hashvalue,function(err,reply){
              console.log(reply + " hash(s) added !"); 
            });
}

function gethashvalues(hashkey){ 
redisClient.hgetall( hashkey , function(err, object) {
  if (err) throw err;
  console.log(object);
});
}

setSetsvalues('name',['abhi','indore','dev' ,'indore']);
getSetsvalue('name');

sethashvalues('nameaddress',{'abhishek1': 'indore','devesh1': 'indore'});
gethashvalues('nameaddress');
