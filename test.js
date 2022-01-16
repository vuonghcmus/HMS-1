let objArr = [
  {
    key1: "value1",
    key2: "value2",
  },
  {
    key6: "value1",
    key7: "value2",
  },
  {
    key8: "value1",
    key9: "value2",
  },
];
console.log(objArr);

for (let i = 0; i < objArr.length; i++) {
  objArr[i].key3 = "value3";
}

const a = [1, 2, 3, 4, 5];
console.log(typeof a);
console.log(Object.keys(objArr).length);
