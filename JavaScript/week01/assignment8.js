let num = 23;
let str = "asdf";
let bool = false;
let arr = [1, 2, 3];
console.log(num);
console.log(str);
console.log(bool);
console.log(arr);
console.log("The value of my variable num is: " + num);
console.log("The value of my variable str is: " + str);
console.log("The value of my variable bool is: " + bool);
console.log("The value of my variable arr is: " + arr);
console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);
console.log(typeof arr);
if (
  typeof num == typeof str ||
  typeof str == typeof bool ||
  typeof bool == typeof arr ||
  typeof arr == typeof num ||
  typeof num == typeof bool ||
  typeof str == typeof arr
) {
  console.log("Same type!");
} else {
  console.log("types are different");
}
