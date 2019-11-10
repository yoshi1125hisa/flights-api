import Request from 'lib/request.js';

const request = new Request('https://api-tokyochallenge.odpt.org/api/v4');

// イベントを全部取ってきて、参加できるやつのみ返す
const getFlight = async () => {
    let flightData;
    try {
        flightData = await request.get('/odpt:FlightInformationDeparture');
        ons.notification.alert(flightData);
    } catch (e) {
        ons.notification.alert('取得できませんでした');
        return false;
    }
}