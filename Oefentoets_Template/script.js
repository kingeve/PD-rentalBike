var urlParams = new URLSearchParams(window.location.search);
var rentalBikes = document.querySelector("#rentalBikes");

var options = {
  type: "regression",
  debug: true
};

var modelDetails = {
  model: "model/model.json",
  metadata: "model/model_meta.json",
  weights: "model/model.weights.bin"
};

var neuralNetwork = ml5.neuralNetwork(options);

neuralNetwork.load(modelDetails, predict);

var inputs = {
  Hour: 
  TemperatureC:
  Humidity:
  WindSpeed:
  Seasons:  
  Holiday:  
  FunctioningDay:
}

console.log(inputs);

function predict() {
  neuralNetwork.predict(inputs, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
  
  });
}

//Max 3556
//Min 0
//https://archive.ics.uci.edu/ml/datasets/Seoul+Bike+Sharing+Demand
// Hour - Hour of he day
// Temperature-Temperature in Celsius
// Humidity - %
// Windspeed - m/s
// Seasons - Winter, Spring, Summer, Autumn (1,2,3,4)
// Holiday - Holiday/No holiday (No: 0, Yes: 1)
// Functional Day - NoFunc(Non Functional Hours), Fun(Functional hours) (No: 0, Yes: 1)