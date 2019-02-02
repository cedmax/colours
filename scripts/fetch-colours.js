const async = require("async");
const axios = require("axios");
const fs = require("fs");
const settings = require("./settings.json");

const getUrl = key => settings.baseUrl + encodeURI(key);

async.each(settings.dataSets, async key => {
  try {
    const { data } = await axios.get(getUrl(key));
    fs.writeFileSync(`${__dirname}/data/${key}.html`, data, "UTF-8");
  } catch (e) {
    console.log(e);
  }
});
