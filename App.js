/* 
This is a simple conversion app that converts between weight, temperature, and distance
User can select the type of conversion and the units to convert from and to
They simply enter a value in one of the input fields and the other field will automatically update
Input can be a single value or a comma separated list of values
They can also clear the fields if they want to start over
*/
const Measurement = {
    WEIGHT: "weight",
    TEMPERATURE: "temperature",
    DISTANCE: "distance",
  };
  
  const UnitLabels = {
    WEIGHT: {
      LB: "LB",
      KG: "KG",
    },
    TEMPERATURE: {
      F: "°F",
      C: "°C",
    },
    DISTANCE: {
      MI: "MI",
      KM: "KM",
    },
  };
  
  const InputMap = {
    A: {
      WEIGHT: UnitLabels.WEIGHT.LB,
      TEMPERATURE: UnitLabels.TEMPERATURE.F,
      DISTANCE: UnitLabels.DISTANCE.MI,
    },
    B: {
      WEIGHT: UnitLabels.WEIGHT.KG,
      TEMPERATURE: UnitLabels.TEMPERATURE.C,
      DISTANCE: UnitLabels.DISTANCE.KM,
    },
  };
  
  var selectedMeasurement = Measurement.WEIGHT; //default to weight
  var convertFromUnit = "";
  
  /* 
  Button selections have some UI feedback to show the selected one
  */
  document.getElementById("weight-btn").addEventListener("click", function () {
    selectedMeasurement = Measurement.WEIGHT;
    updateUIState();
  });
  
  document
    .getElementById("temperature-btn")
    .addEventListener("click", function () {
      selectedMeasurement = Measurement.TEMPERATURE;
      updateUIState();
    });
  
  document.getElementById("distance-btn").addEventListener("click", function () {
    selectedMeasurement = Measurement.DISTANCE;
    updateUIState();
  });
  
  /* 
  I thought it would be cool to have the conversion happen as the user types in the input fields
  There is no need for submit button
  */
  document.getElementById("input-A").addEventListener("keyup", function () {
    document.getElementById("input-B").value = "";
    let inputValue = document.getElementById("input-A").value.split(",");
    let convertedValues = [0];
  
    switch (selectedMeasurement) {
      case Measurement.WEIGHT:
        convertFromUnit = InputMap.A.WEIGHT;
        convertedValues = convertHandler(InputMap.A.WEIGHT, inputValue);
        break;
      case Measurement.TEMPERATURE:
        convertFromUnit = InputMap.A.TEMPERATURE;
        convertedValues = convertHandler(InputMap.A.TEMPERATURE, inputValue);
  
        break;
      case Measurement.DISTANCE:
        convertFromUnit = InputMap.A.DISTANCE;
        convertedValues = convertHandler(InputMap.A.DISTANCE, inputValue);
        break;
    }
    document.getElementById("input-B").value = convertedValues;
  });
  
  document.getElementById("input-B").addEventListener("keyup", function () {
    let convertedValues = 0;
    let inputValue = document.getElementById("input-B").value.split(",");
    document.getElementById("input-A").value = "";
    switch (selectedMeasurement) {
      case Measurement.WEIGHT:
        convertFromUnit = InputMap.B.WEIGHT;
        convertedValues = convertHandler(InputMap.B.WEIGHT, inputValue);
        break;
      case Measurement.TEMPERATURE:
        convertFromUnit = InputMap.B.TEMPERATURE;
        convertedValues = convertHandler(InputMap.B.TEMPERATURE, inputValue);
  
        break;
      case Measurement.DISTANCE:
        convertFromUnit = InputMap.B.DISTANCE;
        convertedValues = convertHandler(InputMap.B.DISTANCE, inputValue);
        break;
    }
    document.getElementById("input-A").value = convertedValues;
  });
  
  //The conversion function should take in a single value or an array of values
  const convertHandler = (converFrom, values) => {
    console.log("converFrom", converFrom, "values", values);
    let convertedValues = [];
    if (Array.isArray(values)) {
      convertedValues = values.map((value) => {
        return convertValue(converFrom, value);
      });
    } else {
      convertedValues = convertValue(converFrom, values);
    }
    return convertedValues;
  };
  /* 
  Helper function so the array can be mapped easier
  */
  const convertValue = (converFrom, value) => {
    let convertedValue = 0;
    switch (selectedMeasurement) {
      case Measurement.WEIGHT:
        convertedValue = convertWeight(converFrom, value);
        break;
      case Measurement.TEMPERATURE:
        convertedValue = convertTemperature(converFrom, value);
        break;
      case Measurement.DISTANCE:
        convertedValue = convertDistance(converFrom, value);
        break;
    }
    return convertedValue.toFixed(2);
  };
  
  const convertWeight = (converFrom, value) => {
    let convertedValue = 0;
    switch (converFrom) {
      case UnitLabels.WEIGHT.LB:
        convertedValue = value / 2.20462;
        break;
      case UnitLabels.WEIGHT.KG:
        convertedValue = value * 2.20462;
        break;
    }
    return convertedValue;
  };
  
  const convertTemperature = (converFrom, value) => {
    let convertedValue = 0;
    switch (converFrom) {
      case UnitLabels.TEMPERATURE.F:
        convertedValue = (value - 32) * (5 / 9);
        break;
      case UnitLabels.TEMPERATURE.C:
        convertedValue = value * (9 / 5) + 32;
        break;
    }
    return convertedValue;
  };
  
  const convertDistance = (converFrom, value) => {
    let convertedValue = 0;
    switch (converFrom) {
      case UnitLabels.DISTANCE.MI:
        convertedValue = value * 1.60934;
        break;
      case UnitLabels.DISTANCE.KM:
        convertedValue = value / 1.60934;
        break;
    }
    return convertedValue;
  };
  
  const updateUIState = () => {
    updateButtons();
    updateUnits();
  };
  
  /* 
  Buttons are highlighted based on whats selected
  I am not sure to how to do this in Tailwinds without all the code duplucation
  */
  const updateButtons = () => {
    document.getElementById("input-A").value = "";
    document.getElementById("input-B").value = "";
    document.getElementById("weight-btn").className =
      selectedMeasurement === Measurement.WEIGHT
        ? "rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-28 m-2"
        : "rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-28 m-2";
    document.getElementById("temperature-btn").className =
      selectedMeasurement === Measurement.TEMPERATURE
        ? "rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-28 m-2"
        : "rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-28 m-2";
    document.getElementById("distance-btn").className =
      selectedMeasurement === Measurement.DISTANCE
        ? "rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-28 m-2"
        : "rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-28 m-2";
  };
  /* 
  This is for the input labels where it shows the units
  */
  const updateUnits = () => {
    var unitA = document.getElementById("unitA");
    var unitB = document.getElementById("unitB");
  
    switch (selectedMeasurement) {
      case Measurement.WEIGHT:
        unitA.textContent = InputMap.A.WEIGHT;
        unitB.textContent = InputMap.B.WEIGHT;
        break;
      case Measurement.TEMPERATURE:
        unitA.textContent = InputMap.A.TEMPERATURE;
        unitB.textContent = InputMap.B.TEMPERATURE;
        break;
      case Measurement.DISTANCE:
        unitA.textContent = InputMap.A.DISTANCE;
        unitB.textContent = InputMap.B.DISTANCE;
        break;
    }
  };
  
  /* 
  Easy way to clear, without backspace
  */
  document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("input-A").value = "";
    document.getElementById("input-B").value = "";
  });
  
  /* 
  Just in case of any weirdness, I want to make sure the UI is in the correct state
  */
  window.onload = function () {
    updateUIState();
  };
