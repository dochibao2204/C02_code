import connectToDatabase from '../configDatabase.js';

// Kết nối database
const db = await connectToDatabase();

class ContactRepository {
  constructor() {
    this.db = db;
  }

  async createContact({ title, author, message }) {
    const sql = 'INSERT INTO contacts (title, author, message, createdDate) VALUES (?, ?, ?, NOW())';
    const [result] = await this.db.query(sql, [title, author, message]);
    return result;
  }
}

export default new ContactRepository();
