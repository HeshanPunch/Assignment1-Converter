let tabSelected = "weight";

function onTabClicked(tab){
    if(tabSelected === tab) return;

    let weightTab = document.getElementById("weightTab");
    let temperatureTab = document.getElementById("temperatureTab");
    let distanceTab = document.getElementById("distanceTab");
    let otherTabs = [];
    let selectorUnitsFrom = document.getElementById("unitsFrom");
    let selectorUnitsTo = document.getElementById("unitsTo");

    if(tab === "weight"){
        otherTabs = [temperatureTab, distanceTab];
        weightTab.classList.remove("bg-blue-600");
        weightTab.classList.remove("hover:bg-blue-400");
        weightTab.classList.add("bg-amber-400");
        selectorChangeOptions(selectorUnitsFrom, ["Kg", "Lb"]);
        selectorChangeOptions(selectorUnitsTo, ["Lb"]);
    }else if(tab === "temperature"){
        otherTabs = [weightTab, distanceTab];
        temperatureTab.classList.remove("bg-blue-600");
        temperatureTab.classList.remove("hover:bg-blue-400");
        temperatureTab.classList.add("bg-amber-400");
        selectorChangeOptions(selectorUnitsFrom, ["Celsius", "Fahrenheit"]);
        selectorChangeOptions(selectorUnitsTo, ["Fahrenheit"]);
    }else if(tab === "distance"){
        otherTabs = [weightTab, temperatureTab];
        distanceTab.classList.remove("bg-blue-600");
        distanceTab.classList.remove("hover:bg-blue-400");
        distanceTab.classList.add("bg-amber-400");
        selectorChangeOptions(selectorUnitsFrom, ["Km", "Miles"]);
        selectorChangeOptions(selectorUnitsTo, ["Miles"]);
    }

    for(t of otherTabs){
        t.classList.remove("bg-amber-400");
        t.classList.remove("bg-blue-600");
        t.classList.remove("hover:bg-blue-400");

        t.classList.add("bg-blue-600");
        t.classList.add("hover:bg-blue-400");
    }

    tabSelected = tab;
}

function onConvertValuesClicked(clicker){
    let inputs = document.querySelectorAll(".valueInput");
    let valuesToConvert = []

    for(input of inputs){
        if(!stringIsNumeric(input.value.trim())){
            alert("Invalid input(s)\n\nAll values must be a valid number!\nPlease verify and try again")
            return;
        }
        valuesToConvert.push(Number.parseFloat(input.value.trim()));
    }

    let resultTitle = createElement("p", ["text-3xl", "text-center", "mt-10", "result", "font-bold"]);
    resultTitle.innerText = "Latest Result:";
    let unitsFrom = document.getElementById("unitsFrom").value;
    let unitsTo = document.getElementById("unitsTo").value;
    let mainDiv = document.getElementById("mainDiv");
    let previousResult = mainDiv.querySelector(".result");
    let separationLine = createElement("hr", ["w-140", "h-1", "mx-auto", "my-4", "bg-gray-100", "border-0", "rounded", "md:my-10", "dark:bg-gray-700"]);

    if(previousResult == null){
        mainDiv.appendChild(resultTitle);
        mainDiv.appendChild(separationLine);
    }else{
        mainDiv.insertBefore(resultTitle, previousResult);
        mainDiv.insertBefore(separationLine, previousResult);
        previousResult.innerText = "Previous Result:";
    }

    let wrapper = createElement("div", ["container", "text-black", "text-3xl", "flex", "justify-evenly", "flex-wrap"]);

    for(value of valuesToConvert){
        let innerDiv = createElement("div", ["basis-1/5", "m-4", "valueWrapper"]);
        let resultValue = createElement("p", ["text-3xl", "text-center", "text-white"]);
        resultValue.innerText = `${value} ${["celsius", "fahrenheit"].includes(unitsFrom) ? unitsFrom.toUpperCase()[0] : unitsFrom} --> ${conversion(unitsFrom, unitsTo)(value)} ${["celsius", "fahrenheit"].includes(unitsTo) ? unitsTo.toUpperCase()[0] : unitsTo}`;
        innerDiv.appendChild(resultValue);
        wrapper.appendChild(innerDiv);

        if(previousResult == null){
            mainDiv.appendChild(wrapper);
        }else{
            mainDiv.insertBefore(wrapper, previousResult);
        }
    }

    let separationLine2 = createElement("hr", ["w-140", "h-1", "mx-auto", "my-4", "bg-gray-100", "border-0", "rounded", "md:my-10", "dark:bg-gray-700"]);;

    if(previousResult == null){
        mainDiv.appendChild(separationLine2);
    }else{
        mainDiv.insertBefore(separationLine2, previousResult);
    }
    
    alert("Conversion successful");
}

function conversion(from, to){
    let output = () => {};

    if(from === "kg" && to === "lb"){
        output = (value) => (value * 2.2).toFixed(2);
    }else if(from === "lb" && to === "kg"){
        output = (value) => (value / 2.2).toFixed(2);
    }else if(from === "celsius" && to === "fahrenheit"){
        output = (value) => ((value * 9/5) + 32).toFixed(2);
    }else if(from === "fahrenheit" && to === "celsius"){
        output = (value) => ((value - 32) * 5/9).toFixed(2);
    }else if(from === "km" && to === "miles"){
        output = (value) => (value * 0.621371).toFixed(2);
    }else if(from === "miles" && to === "km"){
        output = (value) => (value * 1.609344).toFixed(2);
    }

    return output;
}

function stringIsNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function onChangeOriginUnits(selector){
    let selectorValue = selector.value;
    let selectorUnitsTo = document.getElementById("unitsTo");

    if(selectorValue === "lb"){
        selectorChangeOptions(selectorUnitsTo, ["Kg"]);
    }else if(selectorValue === "kg"){
        selectorChangeOptions(selectorUnitsTo, ["Lb"]);
    }else if(selectorValue === "celsius"){
        selectorChangeOptions(selectorUnitsTo, ["Fahrenheit"]);
    }else if (selectorValue === "fahrenheit"){
        selectorChangeOptions(selectorUnitsTo, ["Celsius"]);
    }else if (selectorValue === "km"){
        selectorChangeOptions(selectorUnitsTo, ["Miles"]);
    }else if (selectorValue === "miles"){
        selectorChangeOptions(selectorUnitsTo, ["Km"]);
    }
}

function selectorChangeOptions(selector, options){
    let optionsToRemove = [];

    for(option of selector.children){
        optionsToRemove.push(option);
    }

    for(option of options){
        let o = document.createElement("option");
        o.value = option.toLowerCase();
        o.innerText = option;
        selector.appendChild(o);
    }

    for(optionToRemove of optionsToRemove){
        optionToRemove.remove();
    }
}

function onAddClicked(clicker){
    let container = clicker.parentElement.parentElement;

    //if there was only 1 value before, enable Delete Button
    if(container.children.length === 1){
        let deleteButton = clicker.parentElement.querySelector(".deleteButton");
        deleteButton.classList.remove("bg-gray-400");
        deleteButton.classList.add("bg-red-600");
        deleteButton.classList.add("hover:bg-red-400");
    }

    let newDiv = createElement("div", ["flex-1/4", "m-4", "valueWrapper"]);
    let newInput = createElement("input", ["w-60", "valueInput"]);
    let newDeleteButton = createElement("button", ["bg-red-600", "hover:bg-red-400", "font-semibold", "ml-2", "deleteButton"]);
    newDeleteButton.innerHTML = "&nbsp&nbspX&nbsp&nbsp";
    newDeleteButton.onclick = () => onDeleteClicked(newDeleteButton);
    let newAddButton = createElement("button", ["bg-amber-400", "hover:bg-amber-200", "font-semibold", "ml-2", "addButton"]);
    newAddButton.innerHTML = "&nbsp&nbspAdd&nbsp&nbsp";
    newAddButton.onclick = () => onAddClicked(newAddButton);

    newDiv.appendChild(newInput);
    newDiv.appendChild(newDeleteButton);
    newDiv.appendChild(newAddButton);
    container.appendChild(newDiv);

    clicker.remove();
}

function onDeleteClicked(clicker){
    let container = clicker.parentElement.parentElement;

    //dont allow delete if there's only one value
    if(container.children.length <= 1){
        return;
    }

    let clickerWrapper = clicker.parentElement;
    clickerWrapper.remove();

    //if only 1 value left, disable remove button
    if(container.children.length <= 1){
        let deleteButton = container.querySelector(".valueWrapper").querySelector(".deleteButton");
        deleteButton.classList.remove("bg-red-600");
        deleteButton.classList.remove("hover:bg-red-400");
        deleteButton.classList.add("bg-gray-400");
    }

    //if deleting the value with the Add Button, this button will have to be re-rendered
    if(clicker.parentElement.querySelector(".addButton") != null){
        let newAddButton = createElement("button", ["bg-amber-400", "hover:bg-amber-200", "font-semibold", "ml-2", "addButton"]);
        newAddButton.onclick = () => onAddClicked(newAddButton);
        newAddButton.innerHTML = "&nbsp&nbspAdd&nbsp&nbsp";

        if(container.lastChild.classList != undefined){
            container.lastChild.appendChild(newAddButton);
        }else{
            container.lastChild.previousSibling.appendChild(newAddButton);
        }
    }
}

function createElement(type, classes){
    let newElement = document.createElement(type);

    for(c of classes){
        newElement.classList.add(c);
    }

    return newElement;
}
