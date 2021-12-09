// click tag url
const clickTagURL = `%%CLICK_URL_UNESC%%https://www.google.com/`;
       
const unitLineItemName = ``
// server path variable. 
const awServerPath = ``; //set empty for local path
// banner Wrapper element name
const bannerWrapperName = `banner-item`;
// click tag applied element ID
const clickTagOnElementID = `banner-item`;

const expectedLoopCount = 1; // default value 1 for no loop
const totalAnimationTimeCount = 11000 // without loop, total second count like 12 second = 12000. default 0.

const isApiUnit = true; // set true if any API fetched
// minified HTML with local path call
const htmlWithoutServerPath = ``;

// minified Css with local files call
const cssWithoutServerPath = ``;

// ---------------------------------------------------------------------
// Please dont try to change the below code if you  are not a developer
// ---------------------------------------------------------------------
const additionalScript = () => {
    if (isApiUnit) {
        fetchApiAndRenderData();
    }

}
// multiple time animation loop handling function
const refreshBanner = () => {
    console.log('refresh')
    var container = parent.document.getElementById(bannerWrapperName);
    // var content = container.innerHTML;
    var content = htmlWithoutServerPath
        .replaceAll('src="', `src="${awServerPath}`)
        .replaceAll(`src='`, `src='${awServerPath}`);
    if (container.innerHTML = content) {
        additionalScript();
    }
}

const fetchApiAndRenderData = async () => {}

const setLoopOfbannerAnimation = () => {
    return new Promise((resolve, reject) => {
        if (expectedLoopCount > 1) {
            for (let i = 1; i < expectedLoopCount; i++) {
                setTimeout(() => { refreshBanner() }, totalAnimationTimeCount * i)
                expectedLoopCount === i + 1 && resolve();
            }
        } else {
            resolve()
        }
    })
}

const formatAndInjectBanner = async () => {
    const awWebsiteNav = parent.document.querySelector(".page-subnav");
    const websiteHead = parent.document.head || parent.document.getElementsByTagName('head')[0];
    // if no server path add this css
    !awServerPath && websiteHead.insertAdjacentHTML('afterend', `<style>*{ padding: 0; margin: 0;}body{background:#ebebeb;}</style>`);

    // css append/inject method
    const injectCss = (formatedCss) => {
        const bannerStyle = parent.document.createElement('style');
        bannerStyle.type = 'text/css';
        if (bannerStyle.styleSheet) {
            bannerStyle.styleSheet.cssText = formatedCss;
        } else {
            bannerStyle.appendChild(parent.document.createTextNode(formatedCss));
        }
        return websiteHead.appendChild(bannerStyle);
    }
    // HTML append/inject method
    const injectHTML = (formatedHTML) => {
        let ele = document.createElement("div");
        ele.className = bannerWrapperName;
        ele.id = bannerWrapperName;
        ele.innerHTML = formatedHTML;
        return awWebsiteNav.parentNode.insertBefore(ele, awWebsiteNav.nextSibling);
    }

    // clickTag add method
    const addClickTag = () => {
        const ClickTag = parent.document.getElementById(clickTagOnElementID);
        const formatedClickTagURL = awServerPath ? clickTagURL : clickTagURL.replaceAll('%%CLICK_URL_UNESC%%', '');
        ClickTag.onclick = () => {
            window.open(formatedClickTagURL, '_blank');
        };
    };

    try {
        // format minified HTML with serverPath
        const htmlWithServerPath = await htmlWithoutServerPath
            .replaceAll('src="', `src="${awServerPath}`)
            .replaceAll(`src='`, `src='${awServerPath}`)
            .replaceAll(`poster="`, `poster="${awServerPath}`)
            .replaceAll(`poster='`, `poster='${awServerPath}`);
        // format minified CSS with serverPath
        const cssWithServerPath = await cssWithoutServerPath
            .replaceAll(`url(`, `url(${awServerPath}`)
            .replaceAll(`url('`, `url('${awServerPath}`)
            .replaceAll(`url("`, `url("${awServerPath}`)
            .replaceAll(`@import url(${awServerPath}`, `@import url(`)
            .replaceAll(`@import url("${awServerPath}`, `@import url("`)
            .replaceAll(`@import url('${awServerPath}`, `@import url('`);
        // inject CSS
        const callInjectCss = await injectCss(cssWithServerPath)
        // preparing loader images list
        const collectImageFromCss = await cssWithoutServerPath.match(/[\w-]+\.(jpg|png|jpeg|gif)/g);
        const collectImageFromHtml = await htmlWithoutServerPath.match(/[\w-]+\.(jpg|png|jpeg|gif)/g);
        const allImageArrayWithoutServerPath = await ((collectImageFromCss, collectImageFromHtml) => { return [...new Set(collectImageFromHtml ? collectImageFromCss?.concat(collectImageFromHtml) : collectImageFromCss)] })(collectImageFromCss, collectImageFromHtml);
        const awBannerImageArrayWithPath = await allImageArrayWithoutServerPath?.map(image => awServerPath + image);
        // call image Loader and inject HTML
        const loadImagesAndInjectHTML = await ((loaderImages) => {
            let uploadImagesCount = 0;
            return new Promise((resolve, reject) => {
                loaderImages.forEach((imgSrc) => {
                    let newImgTag = parent.document.createElement('img');
                    newImgTag.src = imgSrc;
                    newImgTag.addEventListener('load', () => {
                        newImgTag.remove();
                        uploadImagesCount++;
                        if (loaderImages.length == uploadImagesCount) {
                            resolve(injectHTML(htmlWithServerPath))
                        }
                    });
                });
            })
        })(awBannerImageArrayWithPath);

        // call click Tag adder method
        const callAddClickTag = await ((injectedHtml) => {
            // console.log(injectedHtml)
            return addClickTag()
        })(loadImagesAndInjectHTML)
        const loadAditionalScript = await additionalScript();
        const callSetLoopOfbannerAnimation = await setLoopOfbannerAnimation()

        await (() => {
            // set local html title name not AW site
            !parent.document.title && (parent.document.title = unitLineItemName.replaceAll('_', ' '));
            // check the screen to load the banner again
            parent.window.addEventListener('resize', function (event) {
                var newWidth = parent.window.innerWidth;
                var newHeight = parent.window.innerHeight;
                if (newWidth === 1024 || newWidth === 768 || newWidth === 414 || newWidth === 375 || newWidth === 360 || newWidth === 320) {
                    return parent.location.reload();
                }
            });
            // additional code add below if needed
            // -----------------------------------

        })()

    } catch (error) {
        console.log(error)
    }
} // formatAndInjectBanner method end

// call inject banner method
formatAndInjectBanner();