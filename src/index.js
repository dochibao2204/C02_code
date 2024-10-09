import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import blogRepo from './utils/blogRepository.js';
import contactRepo from './utils/contactRepository.js';
const app = express();

// Handlebars
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Middleware
app.use(express.static(path.resolve('src/public'))); /// static file
app.use(express.urlencoded({ extended: true })); // note
app.use(express.json());

// View list on default page
app.get('/', async (req, res) => {
  try {
    const blogs = await blogRepo.getBlogs();
    res.render('home', { blogs });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to load blogs',
      error: error.message,
    });
  }
});

// detail blogs
app.get('/blog/:id', async (req, res) => {
  try {
    const blog = await blogRepo.getBlogById(req.params.id);
    if (blog) {
      res.render('blogDetail', { blog });
    } else {
      res.status(404).send({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Failed to load blog detail',
      error: error.message,
    });
  }
});

// Post method
app.post('/contact', async (req, res) => {
  const { title, author, message } = req.body;

  // Validate data
  if (!title || title.length <= 5) {
    return res.status(400).send({ message: 'Title is required and should be longer than 5 characters' });
  }
  if (!author || author.length <= 3) {
    return res.status(400).send({ message: 'Author is required and should be longer than 3 characters' });
  }


// save in database
  try {
    await contactRepo.createContact({ title, author, message });
    res.status(201).send({ message: 'Contact information submitted successfully' });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to submit contact information',
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

// app.get('/', async (req, res) => {
//   const result = await userRepo.getUsers();
//   res.render('home', { users: result });
// });

// 500 => chet call
