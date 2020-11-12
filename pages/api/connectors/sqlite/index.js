// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Database = require('better-sqlite3');

export default (req, res) => {
  try{
    const db = new Database('/home/jccari/code/visaft/pages/api/Parlamentaries.db', { verbose: console.log });
    const stmt = db.prepare('SELECT * FROM tweets LIMIT 100');
    res.statusCode = 200
    res.json(stmt.all())
  } catch (err){
    res.statusCode = 500
    console.log(err);
    res.json([])
  }
}
