// current weather API
let apiKey = '103cf8ebc1de4830a8b773a59680a59d'
let cityCode = parent?.currentLocation?.key ? parent?.currentLocation?.key : `347936`;
let apiUrl = `https://api.accuweather.com/currentconditions/v1/${cityCode}.json?apikey=${apiKey}&details=true`
let renderInClassName = '#apiDataArea'

// set fetch api data in template
const dataInTemplate = ((data, renderInClass) => {
    let selectedData = data[0]
    // let template = `<div id='mWebCopyBG'></div><div class='copy'><span class='temperatureValue'>${selectedData}</span><sup class='unit'>&#8457;</sup></div><div id='logoBG'></div>`
    let template = `<div class='weatherText'>${selectedData?.WeatherText}</div><div class='weatherIcon'><img class="weatherIcon" src='https://www.accuweather.com/images/weathericons/${selectedData?.WeatherIcon}.svg' alt=""></div><div class='temperature'><div class='temperatureValue'>${selectedData?.Temperature.Imperial.Value}</div><div class='degree'>&#176;</div><div class='unit'>${selectedData?.Temperature.Imperial.Unit}</div></div><div class="realfeelText">RealFeel® ${selectedData?.RealFeelTemperature.Imperial.Value}<span>&#176;</span></div>`

    if (selectedData) {
        render(template, parent.document.querySelector(renderInClass));
    }
});
// render template in selected node
let render = function (template, givenNode) {
    givenNode.innerHTML = template;
};
// fetch api data
const fetchApiData = async (url) => {
    let response = await fetch(url);
    if (response.ok) {
        let jsonData = await response.json();
        return jsonData
    } else {
        console.log('error' + response.status);
    }
};

// Main method for loading data with template inside specific div
try {
    const response = await fetchApiData(apiUrl);
    await dataInTemplate(response, renderInClassName)
}
catch (err) {
    console.log(err)
}