const express = require('express')
const app = express()
const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let url = `https://codequiz.azurewebsites.net/`;
let obj = {}
axios
.get(url, { headers: { Cookie: "hasCookie=true;" }})
.then((html) => {
    let xml = html.data;
    const dom = new JSDOM(xml);
    let doc = dom.window.document;
    let rows = doc.getElementsByTagName('tr');
    for(var i=1 ; i< rows.length ; i++){
        let fundName = rows[i].getElementsByTagName('td')[0].textContent.trim()
        let Nav = rows[i].getElementsByTagName('td')[1].textContent
        obj[i] = {
            fundName,
            Nav
        }
    }
    // console.log(obj);
    let argument = process.argv[2];
    if(argument){
        for(var j in obj){
            if(obj[j].fundName == argument){
                console.log(obj[j].Nav);
            }
        }
    }
})

app.listen(3000, () => {
    console.log(`server start on port 3000`)
})