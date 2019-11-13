const Request = require('./lib/FetchWrap');
const express = require('./lib/Express');

const request = new Request('https://api-tokyochallenge.odpt.org/api/v4');
let flights = []

const getFlights = async () => {
    try {
        let flightData = await request.get('/odpt:FlightSchedule?odpt:operator=odpt.Operator:HND-JAT');
        // console.log(flightData);
        for (let i = 0; i < flightData.length; i++) {
            // 発
            let originAirport = flightData[i]['odpt:originAirport'].slice(13);
            let destinationAirport = flightData[i]['odpt:destinationAirport'].slice(13);
            // 羽田発便のみ
            if (originAirport != "HND" && destinationAirport != "HND") {
                continue;
            }
            if ((originAirport).indexOf('OBO') >= 0 ||
                (originAirport).indexOf('KMQ') >= 0 ||
                (originAirport).indexOf('KIX') >= 0 ||
                (originAirport).indexOf('IZO') >= 0 ||
                (originAirport).indexOf('TKS') >= 0 ||
                (originAirport).indexOf('HIJ') >= 0 ||
                (originAirport).indexOf('KMJ') >= 0 ||
                (originAirport).indexOf('OKA') >= 0 ||
                (destinationAirport).indexOf('OBO') >= 0 ||
                (destinationAirport).indexOf('KMQ') >= 0 ||
                (destinationAirport).indexOf('KIX') >= 0 ||
                (destinationAirport).indexOf('IZO') >= 0 ||
                (destinationAirport).indexOf('TKS') >= 0 ||
                (destinationAirport).indexOf('HIJ') >= 0 ||
                (destinationAirport).indexOf('KMJ') >= 0 ||
                (destinationAirport).indexOf('OKA') >= 0
            ) {
                let flightScheduleObj = flightData[i]['odpt:flightScheduleObject']
                for (let j = 0; j < flightScheduleObj.length; j++) {
                    let airline = flightScheduleObj[j]['odpt:airline'].slice(14);
                    let flightNum = flightScheduleObj[j]['odpt:flightNumber'][0];
                    let originTime = flightScheduleObj[j]['odpt:originTime'];
                    let destinationTime = flightScheduleObj[j]['odpt:destinationTime'];
                    flights.push({
                        "airline": airline,
                        "flight_number": flightNum,
                        "origin_airport": originAirport,
                        "destination_airport": destinationAirport,
                        "origin_time": originTime,
                        "destination_time": destinationTime
                    })
                    // console.log(flights)
                }
            }

            // console.log(originAirport + ' → ' + destinationAirport);
            // console.log(flightScheduleObj)
        }
        // console.log(flights);
        express(flights);
        // return flights;
    } catch (e) {
        console.log('取得できませんでした');
        console.log(e);
        return false;
    }
}

getFlights();