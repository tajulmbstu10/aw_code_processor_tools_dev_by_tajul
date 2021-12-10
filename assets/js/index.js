const saveAsLocalFile = (filename, html, type) => {
    const htmlTemplate = (type === 'local') ? `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${html.lineItemName}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
        <style>
            body {
                padding: 0;
                margin: 0;
                background: #ebebeb;
            }
            ${html.getCss}
        </style>
    </head>
    
    <body>
        <!-- Template Format -->
        <div class='page-subnav'></div>
        ${html.getHtml}
    </body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    <script>
        ${html.getCarouselScript}
        ${html.getApiScript}
    </script>
    </html>` :
        `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
    </head>
    
    <body>
        <!-- Template Format -->
        <div class='page-subnav'></div>
        <script>
            ${html.getScriptAsString}
        </script>
    </body>
    </html>`;
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlTemplate));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

document.getElementById("saveAsLocalFile").onclick = function () { saveAsLocalFile('index_local.html', prepareScript(), 'local') };
document.getElementById("saveAsDeliverableFile").onclick = function () { saveAsLocalFile('index_deliverable.html', prepareScript(), 'deiverable') };

const minify = (code) => {
    return code
        .replace(/([^0-9a-zA-Z\.#])\s+/g, "$1")
        .replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1")
        .replace(/;}/g, "}")
        .replace(/\/\*.*?\*\//g, "");
}

document.getElementById("htmlInput").defaultValue = document.getElementById("defaultHtmlForBasicScript").textContent;
document.getElementById("cssInput").defaultValue = document.getElementById("defaultCssForBasicScript").textContent;
document.getElementById("carouselScriptInput").style.display = 'none'
document.getElementById("apiScriptInput").style.display = 'none'
document.getElementById("animationData").classList.add('hide')

const insertHTMLCssFieldDefaultValue = (event) => {
    const splitCssByCarousel = document.getElementById("cssInput").defaultValue.split('/* carouselCss block */');
    const getCarouselCss = document.getElementById("carouselCss").textContent;
    const splitCssByStandard = document.getElementById("cssInput").defaultValue.split('/* standardCss block */');

    if (event.target.value === 'scriptWithAnimation') {
        document.getElementById("animationData").classList.remove('hide')

    }
    else {
        document.getElementById("animationData").classList.add('hide')

    }
    if (event.target.value === 'scriptWithCarousel') {
        document.getElementById("carouselScriptInput").style.display = 'block'

        document.getElementById("carouselScriptInput").defaultValue = document.getElementById("carouselDefaultScript").textContent;
        document.getElementById("cssInput").defaultValue = splitCssByCarousel.join('').concat(getCarouselCss);
        if(document.querySelector('input[name="apiType"]:checked').value ==='noapi'){
            document.getElementById("htmlInput").defaultValue = document.getElementById("defaultHTMLForCarouselScript").textContent;
        }else{
            document.getElementById("htmlInput").defaultValue = document.getElementById("defaultHTMLForCarouselScript").textContent.replaceAll("'awBnrCreativeContent'>", "'awBnrCreativeContent'><div id='apiDataArea' class='apiDataArea'></div>");
        }
    } else {
        document.getElementById("carouselScriptInput").style.display = 'none'
        document.getElementById("carouselScriptInput").defaultValue = ''
        document.getElementById("cssInput").defaultValue = splitCssByCarousel.slice(0, 1).join('');
        if(document.querySelector('input[name="apiType"]:checked').value ==='noapi'){
            document.getElementById("htmlInput").defaultValue = document.getElementById("defaultHtmlForBasicScript").textContent;
        }else{
            document.getElementById("htmlInput").defaultValue = document.getElementById("defaultHtmlForBasicScript").textContent.replaceAll("'awBnrCreativeContent'>", "'awBnrCreativeContent'><div id='apiDataArea' class='apiDataArea'></div>");
        }
    }
}
const insertApiFiedDefaultValue = (event) => {
    const splitCssByScaleAPI = document.getElementById("cssInput").defaultValue.split('/* scaleIndexAPICss block */')
    const splitCssByCurrentWeatherAPI = document.getElementById("cssInput").defaultValue.split('/* currentWeatherAPICss block */')
    const getScaleIndexAPICss = document.getElementById("scaleIndexAPICss").textContent;
    const getCurrentWeatherAPICss = document.getElementById("currentWeatherAPICss").textContent;

    document.getElementById("apiScriptInput").style.display = 'block';
    if (!document.getElementById("htmlInput").textContent.includes('apiDataArea')) {
        document.getElementById("htmlInput").defaultValue = document.getElementById("htmlInput").textContent.replaceAll("'awBnrCreativeContent'>", "'awBnrCreativeContent'><div id='apiDataArea' class='apiDataArea'></div>")
    } else { }
    // 
    if (event.target.value === 'scaleAPI') {
        if (splitCssByCurrentWeatherAPI.length > 1) {
            document.getElementById("cssInput").defaultValue = splitCssByCurrentWeatherAPI.slice(0, 1).join('').concat(getScaleIndexAPICss);
        } else {
            document.getElementById("cssInput").defaultValue = splitCssByCurrentWeatherAPI.concat(getScaleIndexAPICss).join('');
        }
        document.getElementById("cssInput").defaultValue
        document.getElementById("apiScriptInput").defaultValue = document.getElementById('scaleIndexApiDefault').textContent;
    } else if (event.target.value === 'currentWeather') {
        if (splitCssByScaleAPI.length > 1) {
            document.getElementById("cssInput").defaultValue = splitCssByScaleAPI.slice(0, 1).join('').concat(getCurrentWeatherAPICss);
        } else {
            document.getElementById("cssInput").defaultValue = splitCssByScaleAPI.concat(getCurrentWeatherAPICss).join('');
        }
        document.getElementById("apiScriptInput").defaultValue = document.getElementById('currentWeatherApiDefault').textContent;
    } else {
        document.getElementById("cssInput").defaultValue = splitCssByScaleAPI.length > 1 ? splitCssByScaleAPI.slice(0, 1).join('') : splitCssByCurrentWeatherAPI.slice(0, 1).join('');
        document.getElementById("apiScriptInput").defaultValue = '';
        document.getElementById("apiScriptInput").style.display = 'none';
        document.getElementById("htmlInput").defaultValue = document.getElementById("htmlInput").textContent.replaceAll("'awBnrCreativeContent'><div id='apiDataArea' class='apiDataArea'></div>", "'awBnrCreativeContent'>")
    }
}
document.querySelectorAll("input[name='scriptTypeRadioOptions']").forEach((input) => {
    input.addEventListener('change', insertHTMLCssFieldDefaultValue);
});
document.querySelectorAll("input[name='apiType']").forEach((input) => {
    input.addEventListener('change', insertApiFiedDefaultValue);
});


const prepareScript = () => {
    const getSelectedValue = document.querySelector('input[name="scriptTypeRadioOptions"]:checked').value;
    const getScriptAsText = (getSelectedValue === 'basicScript') ?
        document.getElementById('standardScript').textContent :
        ((getSelectedValue === 'scriptWithAnimation') ?
            document.getElementById('animationScript').textContent :
            document.getElementById('carouselScript').textContent);
    const getHtml = document.getElementById("htmlInput").value.trim();
    const getCss = document.getElementById("cssInput").value.trim();
    const lineItemName = document.getElementById("lineItemName").value.trim();
    const serverPath = document.getElementById("serverPath").value.trim();
    const getCarouselScript = document.getElementById("carouselScriptInput").value.trim();
    const getApiScript = document.getElementById("apiScriptInput").value.trim();
    const loopCountValue = document.getElementById("loopCount").value.trim();
    const loopIntervalValue = document.getElementById("loopInterval").value.trim();

    const getScriptAsString = getScriptAsText
        .replaceAll("htmlWithoutServerPath = `", "htmlWithoutServerPath =`" + minify(getHtml))
        .replaceAll("cssWithoutServerPath = `", "cssWithoutServerPath = `" + minify(getCss))
        .replaceAll("unitLineItemName = `", "unitLineItemName = `" + lineItemName)
        .replaceAll("awServerPath = `", "awServerPath = `" + serverPath)
        .replaceAll("fetchApiAndRenderData = async () => {", "fetchApiAndRenderData = async () => {" + "\n" + getApiScript)
        .replaceAll("if (isCarouselUnit) {", "if (isCarouselUnit) {" + "\n" + getCarouselScript)
        .replaceAll("expectedLoopCount = 1", "expectedLoopCount = " + loopCountValue)
        .replaceAll("totalAnimationTimeCount = 11000", "totalAnimationTimeCount = " + loopIntervalValue)
    return {
        'getScriptAsString': getScriptAsString,
        'lineItemName': lineItemName,
        'getHtml': getHtml,
        'getCss': getCss,
        'getScriptAsText': getScriptAsText,
        'getApiScript': getApiScript,
        'getCarouselScript': getCarouselScript
    };
}
function showResult() {
    document.getElementById('output')
        .textContent = prepareScript().getScriptAsString;
}