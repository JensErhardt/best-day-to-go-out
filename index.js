const restaurants = {
  "Madame Ngo": "Monday",
  "Fresh & Easy": "Tuesday",
  "893 Ryotei": "Wednesday",
  "Kuchi": "Thursday",
  "Pastis": "Friday",
  "Golden Phoenix": "Saturday",
  "Asude": "Sunday",
}

// Normal

const trainingData = [];

for (let restaurant in restaurants) {
  const day = restaurants[restaurant];
  trainingData.push({
    input: { [day]: 1 },
    output: { [restaurant]: 1 }
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);

function chooseRestaurant(day) {
  const result = net.run({ [day]: 1 });
  let highestValue = 0;
  let highestRestaurant = "";

  for (let restaurant in result) {
    if (result[restaurant] > highestValue) {
      highestValue = result[restaurant];
      highestRestaurant = restaurant;
    }
  }
  return highestRestaurant;
}

// Inverted

const invertedTrainingData = [];

for (let restaurant in restaurants) {
  const day = restaurants[restaurant];
  invertedTrainingData.push({
    input: { [restaurant]: 1 },
    output: { [day]: 1 }
  });
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

const invertedStats = invertedNet.train(invertedTrainingData);

function chooseDay(restaurant) {
  const result = invertedNet.run({ [restaurant]: 1 });
  let highestValue = 0;
  let highestDay = "";

  for (let day in result) {
    if (result[day] > highestValue) {
      highestValue = result[day];
      highestDay = day;
    }
  }

  return highestDay;
}

// DOM manipulation

function goOutByDay() {
  const day = $("#input-day").val();
  const perfectRestaurant = chooseRestaurant(day);

  showDayResult(perfectRestaurant);
}

function showDayResult(day) {
  $("#day-perfect").html(day);
  $("#day-error").html(stats.error);
  $("#day-iterations").html(stats.iterations);
}

function goOutByRestaurant() {
  const restaurant = $("#input-restaurant").val();
  const perfectDay = chooseDay(restaurant);

  showRestaurantResult(perfectDay);
}

function showRestaurantResult(restaurant) {
  $("#restaurant-perfect").html(restaurant);
  $("#restaurant-error").html(invertedStats.error);
  $("#restaurant-iterations").html(invertedStats.iterations);
}

