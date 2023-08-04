const {JSDOM} = require ("jsdom")
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
module.exports = {normalizeURL,getUrlFormHTML}