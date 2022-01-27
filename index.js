// TODO: domain set up, css changes, how to plan for next trip if time is negative?

var nextDate = new Date('01-29-2022');
nextDate = new Date(nextDate.getTime() - (nextDate.getTimezoneOffset() * 60 * 1000))
document.getElementById('countdown').innerHTML = "&#128197 " + nextDate.toISOString().split('T')[0] + " &#128302"; 

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
    let flowers = [
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
const offset = today.getTimezoneOffset()
today = new Date(today.getTime() - (offset*60*1000))
let secondsDiff = (nextDate.getTime() - today.getTime()) / 1000;

function getMinMetric() {
    // only allow whole numbers
    var validMetrics = [];
    metricOptions.forEach(metric => {
        let numberOfTimes = secondsDiff / metric['duration_s'];
        if (numberOfTimes >= 1) {
            validMetrics.push([numberOfTimes, metric]);
        }
    });

    if (validMetrics.length === 0) {
        return [null, null];
    }

    return validMetrics[Math.floor(Math.random()*validMetrics.length)];
}

// just do day diff?
if (secondsDiff <= 0) {
    document.getElementById('metric').innerHTML = "OMG! That's TODAY!~";
} else {
    let metricInfo = getMinMetric();
    let numberOfTimes = metricInfo[0];
    let metric = metricInfo[1];

    if (numberOfTimes === null || metric === null) {
        document.getElementById('metric').innerHTML = 'Only ' + secondsDiff + ' seconds!';
    } else { 
        console.log('More like %s times...', numberOfTimes);
        let copy = metric['copy'] + ' ' + Math.round(numberOfTimes) + ' ' + 'times!';
        document.getElementById('metric').innerHTML = copy;
    }
}
