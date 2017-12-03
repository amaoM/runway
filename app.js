const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const post = require('./routes/post')

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(logger('dev'));

// csrf 対策
app.use(cookieParser());
app.use(session({ secret: 'keidka283kd' }))
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrftoken = req.csrfToken();
  next();
});
app.use((err, req, res, next) => {
  res.send(err.message);
});

// routing
app.get('/', post.index);
app.route('/posts/:id([0-9]+)')
  .get(post.show)
  .put(post.update);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.delete('/posts/:id', post.destroy);

app.listen(3000);
console.log('server starting...');
