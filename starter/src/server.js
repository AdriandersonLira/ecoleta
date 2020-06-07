const express = require('express');
const server = express();

const db = require('./database/db');

// Navegador ver a pasta public com 
// os arquivos de css, js, e img
server.use(express.static('public'));

// habilita o uso do req.body
server.use(express.urlencoded({ extended: true }));

// nunjucks - utilizando template engine
// serve para enviar dados pra o html
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true
});

// Rotas do site
// 1. index
// 2. create-point
// 3. search-results

server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/create-point', (req, res) => {
  //console.log(req.query)
  return res.render('create-point.html');
});

server.post('/savepoint', (req, res) => {
  // console.log(req.body);

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  // inserindo dados na tabela
  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro');
    }

    console.log('Cadastrado com sucesso');
    console.log(this);

    return res.render('create-point.html', { saved: true });
  });
});

server.get('/search', (req, res) => {
  const search = req.query.search

  if (search == '') return res.render('search-results.html', { total: 0 })


  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) return console.log(err);

    const total = rows.length

    return res.render('search-results.html', { places: rows, total});
  });
});

// servidor ficar escutando 
// pedidos na porta 3000
server.listen(3000);