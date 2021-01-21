var x; // DATA GOES HERE

var trace = {
    x: x,
    type: 'histogram',
};

var layout = {
    font: {
        family: 'Serif Eczar'
    },
    title: {
        text: 'Relative differences in magnitude between modified and observed flows'
    },
    xaxis: {
        title: {
            text: 'flows'
        }
    },
    yaxis: {
        title: {
            text: 'modified divided by observed'
        }
    }
};

var data = [trace];
Plotly.newPlot('myDiv', data, layout);