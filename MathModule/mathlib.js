module.exports = function (){
  return {
    add: function(num1, num2) { 
        console.log(num1 + num2);
         return num1 + num2;
    },
    multiply: function(num1, num2) {
        console.log(num1 * num2);
         return num1 * num2;
    },
    square: function(num) {
        console.log(num * num);
         return num * num; 
    },
    random: function(num1, num2) {
        randnum = Math.floor(Math.random() * num2);
        while (randnum < num1) {
            randnum = Math.floor(Math.random() * num2);
        }
        console.log(randnum);
        return randnum;
    }
  }
};