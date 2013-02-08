var lazy = require("lazy"), //plugin to read stream line by line
    fs = require("fs"); //node plugin to read files
  
//create the array from the file
var fileToSum = function(fileName) { 
  var numbers = []; //this will be a 2D array of our triangle
  var lineNum = 0;

  var stream = fs.createReadStream(fileName);
  new lazy(stream).lines.forEach(function(line) { //for each line in the file
    //create an array of all numbers in th line, assing to numbers[lineNum]
    numbers[lineNum] = line.toString().split(' ').map(Number);
    lineNum++;
  })

  stream.on('end', function() {return createSum(numbers)}); //when file is read, send to createSum

}

//the actual code is here
var createSum = function(original) {
  for (var i = 1; i < original.length; i++) {
    for (var j = 0; j <= i; j++) { //for every number in every line

      //get maximum of either left above or right above
      var left = original[i-1][j-1] || 0; //variables defined for clarity
      var right = original[i-1][j] || 0;
      original[i][j] += Math.max(left,right); //override value to new max

    };
  }

  //math.max.apply is used to pass an array into math.max. we just pass the last row to see the totalMax
  console.log('the maximum sum possible in any path is: ' + Math.max.apply(null,original[original.length - 1]));

}

fileToSum('triangle.txt'); //run our main operation
//runs in O(n^2) time where n is the number of rows, or O(n) time where n is the number of individual elements
