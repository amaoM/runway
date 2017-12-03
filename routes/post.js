const posts = [
  { title: 'title0', body: 'body0' },
  { title: 'title1', body: 'body1' },
  { title: 'title2', body: 'body2' },
]

exports.index = (req, res) => {
  res.render('posts/index', { posts });
}

exports.show = (req, res) => {
  res.render('posts/show', { post: posts[req.params.id] });
}

exports.new = (req, res) => {
  res.render('posts/new');
}

exports.edit = (req, res) => {
  res.render('posts/edit', { post: posts[req.params.id], id: req.params.id });
}

exports.update = (req, res, next) => {
  if (req.body.id !== req.params.id) {
    next(new Error('ID not valid'));
  } else {
    posts[req.params.id] = {
      title: req.body.title,
      body: req.body.body,
    };
    res.redirect('/');
  }
}

exports.destroy = (req, res, next) => {
  if (req.body.id !== req.params.id) {
    next(new Error('ID not valid'));
  } else {
    posts.splice(req.params.id, 1);
    res.redirect('/');
  }
}

exports.create = (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
  };

  posts.push(post);
  res.redirect('/');
}
