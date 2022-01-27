// TODO: how to plan for next trip if time is negative?

var nextDate = new Date('January 29, 2022');
$("#countdown").html("&#128197 " + nextDate.toISOString().split('T')[0] + " &#128302"); 

var metricOptions = [
    // paddington
    {
        'copy': "Watching Paddington",
        'duration_s': '5700'
    },
    // jbrekkie
    {
        'copy': "Listening to Jbrekkie's Jubilee",
        'duration_s': '2223'
    },
    // holst
    {
        'copy': "Listening to Holst: The Planets",
        'duration_s': '3122'
    },
    // epik high
    {
        'copy': "Listening to 'Fly' by Epik High",
        'duration_s': '201'
    },
    // flight
    {
        'copy': "Flying between JFK and LHR",
        'duration_s': '29700'
    },
    // BTS 
    {
        'copy': "Listening to BTS's 'Permission to Dance'",
        'duration_s': '187'
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
    ]
    var flower = "&#" + flowers[Math.floor(Math.random()*flowers.length)];
    document.getElementById('flowers').innerHTML = flower.repeat(6) + "<br>" + flower.repeat(6); 
}

createFlowers();
setInterval(() => { createFlowers() }, 3000);

var today = new Date();
console.log('Next date: %s', nextDate.toString());
console.log('Current date: %s', today.toString());
var secondsDiff = (nextDate.getTime() - today.getTime()) / 1000;

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
    document.getElementById('metric').innerHTML = "OMG! That's TODAY!~";
// past
} else if (secondsDiff < 0) {
    document.getElementById('metric').innerHTML = "Uh oh... time to set a date!";
} else {
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
