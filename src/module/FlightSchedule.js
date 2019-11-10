const Request = require('../lib/request');

const request = new Request('https://api-tokyochallenge.odpt.org/api/v4');
let originAirport, destinationAirport;

// HND離発着便
const getDepartureFlights = async () => {
    let flightData;
    try {
        flightData = await request.get('/odpt:FlightSchedule?odpt:operator=odpt.Operator:HND-JAT');
        // console.log(flightData);
        for (let i = 0; i < flightData.length; i++) {
            // 発
            let originAirport = flightData[i]['odpt:originAirport'].slice(13);
            let destinationAirport = flightData[i]['odpt:destinationAirport'].slice(13);
            let flightScheduleObj = flightData[i]['odpt:flightScheduleObject'];
            console.log(
                originAirport +
                ' → ' +
                destinationAirport
                );
            for(let i = 0;i < flightScheduleObj.length; i++){
                console.log(
                    flightScheduleObj[i]['odpt:originTime'] +
                    ' → ' +
                    flightScheduleObj[i]['odpt:destinationTime']
                    );
            }

        }
    } catch (e) {
        console.log('取得できませんでした');
        console.log(e);
        return false;
    }
}

getDepartureFlights();