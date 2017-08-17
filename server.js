var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'sajeethhussain',
    database: 'sajeethhussain',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title: 'Article One | MSH',
        heading: 'Articel One',
        date: 'Aug 13, 2017',
        content: ` <p>
                    This is the article one which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>
                <p>
                    Section 2: This is the article one which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>
                <p>
                    Section 3: This is the article one which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>`
    },
    'article-two' : {
        title: 'Article Two | MSH',
        heading: 'Articel Two',
        date: 'Aug 13, 2017',
        content: ` <p>
                    This is the article two which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>
                <p>
                    Section 2: This is the article two which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>
                <p>
                    Section 3: This is the article two which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>`
    },
    'article-three' : {
        title: 'Article Three | MSH',
        heading: 'Articel Three',
        date: 'Aug 13, 2017',
        content: ` <p>
                    This is the article three which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>
                <p>
                    Section 2: This is the article three which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>
                <p>
                    Section 3: This is the article three which i created as a part of exercise for my cource.
                    I love this course since i am refreshing my knowledge and getting to know new terms and technical key words.
                </p>`
    }
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = 
    `<html>
        <head>
            <title>${title}</title>
            <meta none="viewport" content="width=device.width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date}
                    </div>
                    <div>
                        ${content}
                    </div>
                </div>
            </body>
    </html>`;
    return htmlTemplate;
    
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//DB test case
var pool = new Pool(config);
app.get('/test-db', function(req, res){
    // make a select request
    
    // return a response with the results
    pool.query('SELECT * FROM test', function (err, result) {
      if(err){
          res.status(500).send(err.toString());
      }  else {
          res.send(JSON.stringify(result.rows));
      }
    
    });
});

app.get('/articlefromDB/:articleName', function (req,res){
    //var articleName = req.params.articleName
    // SELECT * FROM article WHERE title= ' article-one'
    pool.query("SELECT * FROM article WHERE title= '"+req.params.articleName + "'", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length ==0) {
                res.status(404).send('Article not found');
            }else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});
//DB ends
//counter
var counter =0;
app.get('/counter', function (req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

//name list on submit 
var names = [];
app.get('/submit-name', function (req, res) { // /submit-name?name-xxxx
    
    var name = req.query.name;
    
    names.push(name);
    //JSON = Javacript Object Notation
    console.log("server.js names - "+names)
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
