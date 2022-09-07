const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const PORT = 8383;

app.use(express.static('public'));
app.use(express.json());


app.post('/info/', (req,res) => {
    let { urls } = req.body;
    urls = urls.split(/\n/);
    dataArr = [];
    urls.forEach(url => {
        scrapeUrl(url).then(data => {
            dataArr.push(data);
        });
    })
    app.get('/info/',(req,res)=> {
        res.status(200).json(dataArr);
    })
    res.status(200).send({status: 'urls received'});
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));


async function scrapeUrl(url){
        let res = await axios.get(url);
        const $ = cheerio.load(res.data);

        let cid = $('[property=property]')[0].attribs['content'];
        if(/-brandfilter/.test(cid)) cid = cid.replace(/-brandfilter/,'');
        const brandName = $('span.refinement-text-container').text();
        const salesForceSyntaxURL = `$httpsUrl('Search-Show','cgid','${cid}','prefn1','brand','prefv1','${brandName}')$`;
        const row = {url, salesForceSyntaxURL};
        return row;
 }
