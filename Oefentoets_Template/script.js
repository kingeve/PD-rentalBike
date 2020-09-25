var parameters = new URLSearchParams(window.location.search);
var rentalBikes = document.querySelector("#rentalBikes");

var options = {
  type: "regression"
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
