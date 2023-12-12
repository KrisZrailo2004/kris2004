const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http')
const server = http.createServer(app)
function readPosts() {
  try {
    const data = fs.readFileSync('posts.json');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Запис постів до local storage
function writePosts(posts) {
  fs.writeFileSync('posts.json', JSON.stringify(posts));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Отримання списку постів
app.get('/api/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// Отримання даних поста для редагування
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Пост не знайдено' });
  }
});

// Створення нового поста
app.post('/api/posts', (req, res) => {
  const { title, body } = req.body;
  const posts = readPosts();
  const postId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
  const newPost = { id: postId, title, body };
  posts.push(newPost);
  writePosts(posts);
  res.json(newPost);
});

// Редагування поста
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, body } = req.body;
  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.title = title;
    post.body = body;
    writePosts(posts);
    res.json(post);
  } else {
    res.status(404).json({ message: 'Пост не знайдено' });
  }
});

// Видалення поста
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const posts = readPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
    writePosts(posts);
    res.json({ message: 'Пост видалено' });
  } else {
    res.status(404).json({ message: 'Пост не знайдено' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'posts.html'));
});

app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'posts.html'));
});
app.get('/add_post', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'add_post.html'));
});
app.get('/edit/:id', (req, res) => {
  console.log("edit")
  res.sendFile(path.join(__dirname, 'views', 'edit_post.html'));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
