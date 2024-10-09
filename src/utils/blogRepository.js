import connectToDatabase from '../configDatabase.js';

// Kết nối database
const db = await connectToDatabase();

class BlogRepository {
  constructor() {
    this.db = db;
  }

  // get blog
  async getBlogs() {
    const sql = 'SELECT * FROM blogs';
    const [result] = await this.db.query(sql);
    return result;
  }

  // getBlogsById
  async getBlogById(id) {
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    const [result] = await this.db.query(sql, [id]);
    return result[0]; // return the first blog
  }

  // create a new blog
  async createBlog(body) {
    const { title, description, author } = body;
    const image = '';  // You can upda
    const sql = 'INSERT INTO blogs(title, description, author, image, created_at) VALUES(?, ?, ?, ?, NOW())';
    
    const [result] = await this.db.query(sql, [
      title, 
      description, 
      author, 
      image
    ]);

    return result;
  }
}


export default new BlogRepository();
