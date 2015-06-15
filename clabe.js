
var reg = new RegExp('^[0-9]{18}$');

function check(clabe){
  console.log(clabe);
  if(typeof clabe != "string") return "need to be a string";
  if(clabe.length != 18) return "incorrect length";
  if(!reg.test(clabe)) return "incorrect character";
  clabe = clabe.split("").map(function(s){ return parseInt(s,10); });
  var f = clabe.filter(function(n,i){ return i<17; }).map(function(n,i){ return (n*[3,7,1][i%3])%10; });
  var p = 10-(f.reduce(function(s,c){ return s+c; },0)%10);
  if(p != clabe[17]) return "incorrect control digit";
  return;
}

function checkCb(clabe,cb){
  var err = check(clabe);
  return cb(err,err?null:clabe);
}

function checkThrow(clabe){
  var err = check(clabe)
  if(err) throw new Error(err);
  return true;
}

function isValid(clabe){ return !check(clabe); }

exports.isValid = isValid;
exports.checkThrow = checkThrow;
exports.check = check;
exports.checkCb = checkCb;