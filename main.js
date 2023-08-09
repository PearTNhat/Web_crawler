const {crawlPage}=require('./crawler.js')
const {sortPages}=require('./report.js')
async function main(){
    if(process.argv.length<3){
        console.log('No website provided');
        process.exit(1);
    }
    if(process.argv.length>3){
        console.log('Too many arguments of command line');
        process.exit(1);
    }
    const baseUrl = process.argv[2];

    console.log(`starting crawl of ${baseUrl}`);
    const pages=await crawlPage(baseUrl,baseUrl,{});
    const results =sortPages(pages);
    for(const result of results ) {
        console.log(results);
    }
    
}
main();