const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.listen(3000, () => {
    console.log('port: 3000');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `./index.html`)); 
})

app.get('/api/products', (req, res) => {
    readJSON(`products.json`)
    .then(data => res.send(data))
    .catch(error => res.send(error))
})

const readJSON = (file)=> {
  return new Promise((resolve, reject)=> {
    fs.readFile(file, (err, data)=> {
      if(data){
        try {
          resolve(JSON.parse(data.toString()));
        }
        catch(ex){
          reject(ex);
        }
      }
      else {
        reject(err);
      }
    });
  });
};

module.exports = {
  readJSON
};
