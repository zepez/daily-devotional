
require('dotenv').config()
const cheerio = require('cheerio')
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const randomUseragent = require('random-useragent');





// takes in a headline and returns a slugified version
// removes spaces etc and replaces with = 
const slugify = (headline) => {
  if(!headline) return uuidv4()

  return headline.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '') + "-" + Math.floor(Math.random() * 10000); 
}




const main = async () => {

  // scrape home page to get the link to daily devotional
  const getPage = async () => {
    const pageOne = axios.get('https://www.upperroom.org/', { headers: {'User-Agent': randomUseragent.getRandom()}})
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    
  
    let $ = cheerio.load(await pageOne);
  
    let link = ''
    // only want the first item in carousel
    $('.carousel-indicators li').each((index, el) => {
      if(index === 0) {
        link = ("https://www.upperroom.org" + el.attribs['data-link'])
      }
    })
    return link
  }


  const pageData = axios.get(await getPage())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    })


  
  let $ = cheerio.load(await pageData);

  let headline = $('h1').text().trim()
  let byline = $('h1').next().text().trim()
  let quote = $('.quoted_scripture').html().trim()
  let body = $('.body').html().trim()
  let lede = $('.body').text().substring(0, 100).trim() + "..."
  let breakout = $('.prayer-box').html().trim()


  // compose data into single object
  let data = {
    id: uuidv4(),
    label: "DAILY DEVOTIONAL",
    headline,
    slug: slugify(headline),
    byline,
    quote,
    body,
    lede,
    breakout,
    status: "live",
    type: "article",
    categories: [{id: 'edd2d78e-f90c-4c9e-aa42-a813bd2abb6c'}],
    publications: [{id: 'bfcfb24a-fc14-47f0-b09a-21e803498434'}]
  }


  // put the data via api endpoint
  axios({
    method: "put",
    url: process.env.ENDPOINT,
    data: {
      ...data,
    },
    headers: { token: process.env.API_KEY }
  }).then((res) => {
    console.log('content uploaded')
  }).catch((e) => {
    console.error(e)
  })

  
}



// run project
main()
