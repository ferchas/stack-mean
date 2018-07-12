const router = require('express').Router();
const api = require('./api');
const fs = require('fs');
const path = require('path');
/*
* Page Router, render html
*/
router.get('/', (req, res ) => {
  const indexFile = path.join(`${__dirname}/../public/index.html`);
  fs.readFile(indexFile, 'utf8', (errRead, data) => {
    if (errRead) throw errRead;
    const fileContent = data;
    res.send(fileContent);
  });
});

/*
* Api Router, render Json
*/

router.use('/api', api);

module.exports = router;