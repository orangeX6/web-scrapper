const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = `https://www.theguardian.com/international`;
// (`https://www.theguardian.com/international`

(async () => {
  try {
    const res = await axios(url);
    const data = res.data;
    const $ = cheerio.load(data);
    const articles = [];

    $('.fc-item__content', data).each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');

      articles.push({ title, url });
    });

    console.log(articles);
  } catch (err) {
    console.error(err);
  }
})();

app.listen(PORT, () => console.log(`server running on PORT ${PORT}...`));
