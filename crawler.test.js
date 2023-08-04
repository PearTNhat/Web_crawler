const {test,expect}  = require ('@jest/globals')
const {normalizeURL,getUrlFormHTML}=require('./crawler.js')
test('normalizeURL strip protocol',()=>{
    const input='https://tuannhat/path'
    const actual=normalizeURL(input);
    const expected='tuannhat/path'
    expect(actual).toEqual(expected);
})
test('normalizeURL strip protocol',()=>{
    const input='https://tuannhat/path/'
    const actual=normalizeURL(input);
    const expected='tuannhat/path'
    expect(actual).toEqual(expected);
})
test('normalizeURL strip capital',()=>{
    const input='https://Tuannhat/path/'
    const actual=normalizeURL(input);
    const expected='tuannhat/path'
    expect(actual).toEqual(expected);
})
test('normalizeURL strip htpp',()=>{
    const input='https://Tuannhat/path/'
    const actual=normalizeURL(input);
    const expected='tuannhat/path'
    expect(actual).toEqual(expected);
})
test('getUrlFormHTML absolute ',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="https://tuannhat/path/">Tuan Nhat</a>
        </body>
    </html>
    `
    const inputHTMLBaseUrl='https://tuannhat'
    const actual=getUrlFormHTML(inputHTMLBody,inputHTMLBaseUrl);
    const expected=["https://tuannhat/path/"]
    expect(actual).toEqual(expected);
})
test('getUrlFormHTML relatitive ',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="/path/">Tuan Nhat</a>
        </body>
    </html>
    `
    const inputHTMLBaseUrl='https://tuannhat'
    const actual=getUrlFormHTML(inputHTMLBody,inputHTMLBaseUrl);
    const expected=["https://tuannhat/path/"]
    expect(actual).toEqual(expected);
})
test('getUrlFormHTML multive ',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="/path1/">Tuan Nhat 1</a>
            <a href="https://tuannhat/path2/">Tuan Nhat 2</a>
        </body>
    </html>
    `
    const inputHTMLBaseUrl='https://tuannhat'
    const actual=getUrlFormHTML(inputHTMLBody,inputHTMLBaseUrl);
    const expected=["https://tuannhat/path1/","https://tuannhat/path2/"]
    expect(actual).toEqual(expected);
})
test('getUrlFormHTML invalid ',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="invalid">Tuan Nhat</a>
        </body>
    </html>
    `
    const inputHTMLBaseUrl='https://tuannhat'
    const actual=getUrlFormHTML(inputHTMLBody,inputHTMLBaseUrl);
    const expected=[]
    expect(actual).toEqual(expected);
})