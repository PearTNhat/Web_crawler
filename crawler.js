const {JSDOM} = require ("jsdom")
async function crawlPage(baseUrl,currentUrl,pages){

    const objBaseUrl = new URL(baseUrl);
    const objCurrentUrl = new URL(currentUrl)
    if(objBaseUrl.hostname!==objCurrentUrl.hostname) return pages;
    const normalizeCurrentUrl = normalizeURL(currentUrl);
    if(pages[normalizeCurrentUrl]>0){
        pages[normalizeCurrentUrl]++;
        return pages;
    }
    pages[normalizeCurrentUrl]=1;
    console.log(`actively crawling: ${currentUrl}`);

    try {
        const resp=await fetch(currentUrl);
        if(resp.status>399){
            console.log(`error in fetch with status ${resp.status}, on page ${currentUrl}`);
            return pages;
        }
        const contentType= resp.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`non html response, content-type ${contentType}, on page ${currentUrl}`);
            return pages;
        }
        const htmlBody=await resp.text();
        const nextUrls=getUrlFormHTML(htmlBody,baseUrl) ;
        for(const nextUrl of nextUrls){
            pages=await crawlPage(baseUrl,nextUrl,pages);
        }
    } catch (error) {
        console.log(`error in fetch: ${error.message} ,on page:${currentUrl}`);
    }
    return pages;
}
function getUrlFormHTML(htmlBody,baseUrl){
    const urls=[];
    const dom= new JSDOM(htmlBody);
    const linkElements=dom.window.document.querySelectorAll ("a");
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1)==='/'){
            //relative
            try {
                const stringURL=new URL(`${baseUrl}${linkElement.href}`) //check to valid url
                urls.push(`${baseUrl}${linkElement.href}`);
            } catch (error) {
                console.log('errors with relative link',error.message);
            }
        
        }else{
            //absolute
            try {
                const stringURL=new URL(linkElement.href) // check to valid url
                urls.push(linkElement.href);
            } catch (error) {
                console.log('errors with relative link',error.message);
            }
        
        }
    }
    return urls;
}
function normalizeURL(urlString){
    const urlObj=new URL(urlString);
    const hostPath= `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length>0 && hostPath.slice(-1)==='/'){
        return hostPath.slice(0,-1);
    }
    return hostPath;
}
module.exports = {normalizeURL,getUrlFormHTML,crawlPage}