const Request = require('./FetchWrap');
const express = require('./Express');

const request = new Request('https://api-tokyochallenge.odpt.org/api/v4');
let departureFlights = []

const getDeparture = async () => {
    try {
        let flightData = await request.get('/odpt:FlightSchedule?odpt:operator=odpt.Operator:HND-JAT');
        // console.log(flightData);
        for (let i = 0; i < flightData.length; i++) {
            // 発
            let originAirport = flightData[i]['odpt:originAirport'].slice(13);
            // 羽田発便のみ
            if (originAirport != "HND") {
                continue;
            }
            let destinationAirport = flightData[i]['odpt:destinationAirport'].slice(13);
            if ((destinationAirport).indexOf('OBO') >= 0 ||
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
                    let originTime = flightScheduleObj[j]['odpt:originTime'];
                    let destinationTime = flightScheduleObj[j]['odpt:destinationTime'];
                    departureFlights.push({
                        "origin_airport": originAirport,
                        "destination_airport": destinationAirport,
                        "origin_time": originTime,
                        "destination_time": destinationTime
                    })
                    // console.log(departureFlights)
                }
            }

            // console.log(originAirport + ' → ' + destinationAirport);
            // console.log(flightScheduleObj)
        }
        // console.log(departureFlights);
        express(departureFlights);
    } catch (e) {
        console.log('取得できませんでした');
        console.log(e);
        return false;
    }
}

getDeparture();