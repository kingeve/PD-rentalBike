const urlParams = new URLSearchParams(window.location.search);
const rentalBikes = document.querySelector("#rentalBikes");
const slider = document.querySelector("#slider");
const descript = document.querySelector("#description");

const options = {
  type: "regression",
  debug: true
};

const modelDetails = {
  model: "model/model.json",
  metadata: "model/model_meta.json",
  weights: "model/model.weights.bin"
};

const neuralNetwork = ml5.neuralNetwork(options);

neuralNetwork.load(modelDetails, predict);

const inputs = {
  Hour: parseInt(urlParams.get('day')),
  TemperatureC: parseFloat(urlParams.get('tmp')),
  Humidity: parseInt(urlParams.get('hmd')),
  WindSpeed: parseFloat(urlParams.get('wind')),
  Seasons:  parseInt(urlParams.get('ssn')),
  Holiday:  parseInt(urlParams.get('hld')),
  FunctioningDay: parseInt(urlParams.get('fcd'))
}

console.log(inputs);

function predict() {
  console.log("predicting");
  neuralNetwork.predict(inputs, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    const targetActive = results[0].RentedBikeCounted.toFixed(0);
    // descript.innerHTML+=targetActive;
    descript.innerHTML+="<br><br>"+"Hour: " + inputs.Hour;
    descript.innerHTML+="<br><br>"+"Temperature: " + inputs.Temperature + "°C";
    descript.innerHTML+="<br><br>"+"Humidity " + inputs.Humidity + "%";
    descript.innerHTML+="<br><br>"+"WindSpeed: " + inputs.WindSpeed;
    descript.innerHTML+="<br><br>"+"Seasons: " + inputs.Seasons;
    descript.innerHTML+="<br><br>"+"Holiday: " + inputs.Holiday;
    descript.innerHTML+="<br><br>"+"Functioning Day: " + inputs.FunctioningDay;

    
    if (targetActive < 1000) {
      descript.innerHTML += "<br><br><b>"+"There are enough bikes for rent.</b>";
      descript.style.backgroundColor = "green";
    } else if (targetActive>1000 && targetActive <2000){
      descript.innerHTML += "<br><br><b>"+"You must hurry. The bike could rent out soon.</b>";
      descript.style.backgroundColor = "yellow";
    } else {
      descript.innerHTML += "<br><br><b>"+"Only few bikes are left. It is possible that you cannot rent one.<b>";
      descript.style.backgroundColor = "red";
    }
    
    console.log(results[0]);
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