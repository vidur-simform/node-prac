const fs = require('fs');

const objJsonBuffer = fs.readFileSync('1-json.json');
const objJSON = objJsonBuffer.toString();
const obj = JSON.parse(objJSON);

obj.name = "Vidur";
obj.age= 21;

const modifiedObjJSON = JSON.stringify(obj);
fs.writeFileSync('1-json.json',modifiedObjJSON);