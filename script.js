// TODO: how to plan for next trip if time is negative?

var nextDate = new Date('July 13, 2022');
$("#countdown").html("&#127799 " + nextDate.toISOString().split('T')[0] + " &#128558;&#8205;&#128168");

var metricOptions = [
    // paddington
    {
        'copy': "Watching Paddington",
        'duration_s': '5700'
    },
    // holst
    {
        'copy': "Listening to Holst: The Planets",
        'duration_s': '3122'
    },
    // flight
    {
        'copy': "Flying between JFK and LHR",
        'duration_s': '29700'
    },
    // flight 2
    {
        'copy': "Flying to Luxembourg and back",
        'duration_s': '9000'
    },
    // DES
    {
        'copy': "Listening to all of Dear Evan Hansen",
        'duration_s': '3395'
    },
    // paddington 2
    {
        'copy': "Watching Paddington 2",
        'duration_s': '6240'
    },
    // eeaao
    {
        'copy': "Watching Everything Everywhere All at Once",
        'duration_s': '8400'
    },
    // top gun
    {
        'copy': "Watching Top Gun",
        'duration_s': '6600'
    },
    // top gun 2
    {
        'copy': "Watching Top Gun: Maverick",
        'duration_s': '7860'
    },
    // nandos
    {
        'copy': "Walking to Nando's (you know which one)",
        'duration_s': '840'
    },
    // ozone
    {
        'copy': "Walking to Ozone",
        'duration_s': '1320'
    },
];

function createFlowers() {
    var flowers = [
        "127799", //tulip
        "127801", //rose
        "127803", //sunflower
        "127802", //hawaiaan
        "127800", //pink one
        "127840", //goguma
        "129400", //disguised face
    ]
    var flower = "&#" + flowers[Math.floor(Math.random()*flowers.length)];
    document.getElementById('flowers').innerHTML = flower.repeat(6) + "<br>" + flower.repeat(6); 
}

createFlowers();
setInterval(() => { createFlowers() }, 3000);

var today = new Date();
console.log('Next date: %s', nextDate.toString());
console.log('Current date: %s', today.toString());
var secondsDiff = (nextDate - today) / 1000;

function getMinMetric() {
    // only allow whole numbers
    var validMetrics = [];
    metricOptions.forEach(metric => {
        var numberOfTimes = secondsDiff / metric['duration_s'];
        if (numberOfTimes >= 1) {
            validMetrics.push([numberOfTimes, metric]);
        }
    });

    if (validMetrics.length === 0) {
        return [null, null];
    }

    return validMetrics[Math.floor(Math.random()*validMetrics.length)];
}

// same day
if (nextDate.toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
    document.getElementById('days').innerHTML = "&#129312";
    document.getElementById('metric').innerHTML = "OMG! That's TODAY!~";
// past
} else if (secondsDiff < 0) {
    document.getElementById('days').innerHTML = "&#128560";
    document.getElementById('metric').innerHTML = "Uh oh... time to set a date!";
} else {
    // day countdown
    var dayDiff = Math.ceil((nextDate - today) / (24 * 60 * 60 * 1000));
    document.getElementById('days').innerHTML = dayDiff + " more days!";

    var metricInfo = getMinMetric();
    var numberOfTimes = metricInfo[0];
    var metric = metricInfo[1];

    if (numberOfTimes === null || metric === null) {
        document.getElementById('metric').innerHTML = 'Only ' + secondsDiff + ' seconds!';
    } else { 
        var total_s = numberOfTimes * metric['duration_s'];
        console.log('More like %s times to be exact...', numberOfTimes);
        console.log('Seconds: %s', total_s); 
        console.log('Hours: %s', total_s/60/60); 
        console.log('Days: %s', total_s/60/60/24); 
        var copy = metric['copy'] + ' ' + Math.round(numberOfTimes) + ' ' + 'times!';
        document.getElementById('metric').innerHTML = copy;
    }
}
