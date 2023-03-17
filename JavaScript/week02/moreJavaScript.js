function sum(x, y, z) {
  return x + y + z;
}

function colorCar(color) {
  console.log(`A ${color} car`);
}

let peter = {
  name: "Peter",
  surname: "Pettson",
  age: 32,
  job: "teacher",
};

function printOut(obj) {
  let entries = Object.entries(obj);
  for (const [key, value] of entries) {
    console.log(`${key}: ${value}`);
  }
}

function vehicleType(color, code) {
  if (code == 1) {
    console.log(`a ${color} car`);
  } else if (code == 2) {
    console.log(`a ${color} motorbike`);
  }
}

3 === 3 ? console.log("yes") : console.log("no");

function vehicle(color, code, age) {
  let transport = listOfVehicles.splice(code - 1, 1);
  if (age > 1) {
    console.log(`a ${color} used ${transport}`);
  } else {
    console.log(`a ${color} new ${transport}`);
  }
}

let listOfVehicles = ["motorbike", "caravan", "bike", "truck"];
const thirdElement = listOfVehicles.splice(2, 1);

function printAdvertisement(arr) {
  let advertisment = `Amazing Joe's Garage, we service`;
  for (let i = 0; i < arr.length - 1; i++) {
    advertisment += ` ${arr[i]}s,`;
  }
  advertisment = advertisment.substring(0, advertisment.length - 1);
  advertisment += ` and ${arr[arr.length - 1]}s.`;
  console.log(advertisment);
}

let emptyObject = {};
let teachers = {
  teachers: ["Tommy", "Sahin"],
  languages: ["HTML5", "CSS3", "JavaScript"],
};

let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

console.log(
  "I think x == y will be False, x === y will be False, z == y  will be True and z == x will be False"
);

let o1 = { foo: "bar" };
let o2 = { foo: "bar" };
let o3 = o2;

o2.group = "M11";
console.log(o3);
console.log("o3 had been changed");
o1.group = "M12";
console.log(o3);
console.log("o3 had not been changed");
console.log("I think order doesn't matter");

console.log(`let bar = 42;
            typeof typeof bar; 
            returns string because first we get "number" instead of "typeof bar"
            and that has a type of string.`);
