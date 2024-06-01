const conversions = {
    weight: {
        units: ['lb', 'kg'],
        lb_to_kg: value => value * 0.453592,
        kg_to_lb: value => value / 0.453592
    },
    distance: {
        units: ['mi', 'km'],
        mi_to_km: value => value * 1.60934,
        km_to_mi: value => value / 1.60934
    },
    temperature: {
        units: ['c', 'f'],
        c_to_f: value => (value * 9/5) + 32,
        f_to_c: value => (value - 32) * 5/9
    }
};

// General conversion function using switch-case
const convert = type => {
    const value = parseFloat(document.getElementById(`${type}Value`).value);
    const fromUnit = document.getElementById(`${type}UnitFrom`).value;
    const toUnit = document.getElementById(`${type}UnitTo`).value;

    if (isNaN(value)) {
        document.getElementById(`${type}Result`).innerText = 'Please enter a valid number';
        return;
    }

    let result;
    switch (type) {
        case 'weight':
            result = conversions.weight[`${fromUnit}_to_${toUnit}`](value);
            break;
        case 'distance':
            result = conversions.distance[`${fromUnit}_to_${toUnit}`](value);
            break;
        case 'temperature':
            result = conversions.temperature[`${fromUnit}_to_${toUnit}`](value);
            break;
        default:
            result = 'Invalid conversion type';
    }

    const unitSymbol = type === 'temperature' ? `°${toUnit.toUpperCase()}` : toUnit;
    document.getElementById(`${type}Result`).innerText = `Result: ${result.toFixed(2)} ${unitSymbol}`;
};

// Toggle between tabs using event delegation without querySelector
document.querySelectorAll('nav ul li a').forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        document.querySelector(tab.getAttribute('href')).classList.remove('hidden');
    });
});
