const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const PORT = 8383;

app.use(express.static('public'));
app.use(express.json());

let dataArr = [];

app.post('/info/', async (req,res) => {
    let { urls } = req.body;
    //urls = urls.split(/\n/);
    //if(urls[urls.length-1] === '') urls.pop();
    
    
    
    //console.log(urls, dataArr);
    // urls.forEach(url => {
    //     scrapeUrl(url).then(data => {
    //         dataArr.push(data);
    //     });
    // })

    const promises = urls.map(async(url) => await scrapeUrl(url));

    dataArr = await Promise.all(promises);

    console.log('dataArr before app.get: ',dataArr);

    
    res.status(200).send({status: 'urls received'});
});

app.get('/info/',(req,res)=> {
    console.log('dataArr inside app.get: ',dataArr);
    res.status(200).json(dataArr);
})

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));


async function scrapeUrl(url){
        let res = await axios.get(url);
        const $ = cheerio.load(res.data);

        let cid = $('[property=property]')[0].attribs['content'];
        if(/-brandfilter/.test(cid)) cid = cid.replace(/-brandfilter/,'');
        const brandName = $('span.refinement-text-container').text();
        let salesForceSyntaxURL = '';
        if(brandName === '' || cid === '') {
            salesForceSyntaxURL = 'No combination page found';
        } else {
            salesForceSyntaxURL = `$httpsUrl('Search-Show','cgid','${cid}','prefn1','brand','prefv1','${brandName}')$`;
        }
        const row = {url, salesForceSyntaxURL};
        return row;
 }
