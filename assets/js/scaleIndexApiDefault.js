// Scale index API
 let apiKey = `103cf8ebc1de4830a8b773a59680a59d`
 let cityCode = parent?.currentLocation?.key ? parent?.currentLocation?.key : `347936`;
 let apiUrl = `https://api.accuweather.com/indices/v1/daily/5day/${cityCode}/17?apikey=${apiKey}&details=true`
 let renderInClassName = `.apiDataArea`

 // set fetch api data in template
 const dataInTemplate = ((data, renderInClass) => {
     // console.log(data)
     let size = 2;
     let selectedData = data.slice(0, size)
     let template = selectedData.map((item, index) => {
         let value = Math.trunc(item.Value)
         let maxLengthOfText = 90
         let formateText = item.Text.length > maxLengthOfText ? item.Text.substring(0, maxLengthOfText) + "..." : item.Text;
         // console.log(item.Text)

         // console.log(item)
         return `<div class="single">
                     <div class="wrapSVG">
                     <ul class="scale C1 active">
                         ${value > 9 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 8 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 7 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 6 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 5 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 4 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 3 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 2 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 1 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                         ${value > 0 ? `<li style="background:#00a7e1"></li>` : `<li></li>`}
                     </ul>
                     </div>
                     <div class="details">
                     <p class="module-header">${index > 0 ? "Tomorrow" : "Today"}</p>
                     <h6>${item.Category}</h6>  <span>${formateText}</span>
                     </div>
                 </div>
                 `
     }).join("");
     if (selectedData) {
         render(template, parent.document.querySelector(renderInClass));

     }
 });
 // render template in selected node
 let render = function (template, givenNode) {
     if (template && givenNode) {
         givenNode.innerHTML = template;
     } else {
         console.log('Given node missing')
     }
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