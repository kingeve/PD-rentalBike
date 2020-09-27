var parameters = new URLSearchParams(window.location.search);
var rentalBikes = document.querySelector("#rentalBikes");
var slider = document.querySelector("#slider");
var descript = document.querySelector("#description");
var enough=document.querySelector("#enough");
var stillEnough=document.querySelector("#stillEnough");
var onlyFew=document.querySelector("#onlyFew");
var options = {
  type: "regression",
};

var modelDetails = {
  model: "model/model.json",
  metadata: "model/model_meta.json",
  weights: "model/model.weights.bin"
};

var neuralNetwork = ml5.neuralNetwork(options);

neuralNetwork.load(modelDetails, predict);

var inputs = {
  Hour: parseInt(parameters.get('hour')),
  TemperatureC: parseFloat(parameters.get('tmp')),
  Humidity: parseInt(parameters.get('hmd')),
  WindSpeed: parseFloat(parameters.get('wind')),
  Seasons:  parseInt(parameters.get('ssn')),
  Holiday:  parseInt(parameters.get('hld')),
  FunctioningDay: parseInt(parameters.get('fcd'))
}

console.log(inputs);

function predict() {
  neuralNetwork.predict(inputs, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results[0]);
    var targetActive = results[0].RentedBikeCounted.toFixed(0);
    // descript.innerHTML+=targetActive;
    descript.innerHTML+="<br><br>"+"Hour: " + inputs.Hour;
    descript.innerHTML+="<br><br>"+"Temperature: " + inputs.Temperature + "°C";
    descript.innerHTML+="<br><br>"+"Humidity " + inputs.Humidity + "%";
    descript.innerHTML+="<br><br>"+"WindSpeed: " + inputs.WindSpeed;
    descript.innerHTML+="<br><br>"+"Seasons: " + inputs.Seasons;
    descript.innerHTML+="<br><br>"+"Holiday: " + inputs.Holiday;
    descript.innerHTML+="<br><br>"+"Functioning Day: " + inputs.FunctioningDay;

  
    if (targetActive < 1000) {
      enough.style.display = "block";
      descript.style.backgroundColor = "green";
    } else if (targetActive>1000 && targetActive <3000){
      stillEnough.style.display = "block";
      descript.style.backgroundColor = "yellow";
    } else {
      onlyFew.style.display = "block";
      descript.style.backgroundColor = "red";
    }
    

    rentalBikes.innerHTML = results[0].value.toFixed(0);
    slider.style.height = results[0].value.toFixed(0) / 6 + "px";
    slider.innerHTML = results[0].value.toFixed(0);
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
