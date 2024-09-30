const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.post('/search', async (req, res) => {
  const { searchTerm } = req.body;

  const queries = [
    {
      table: 'anhey_ghorey_de_dan',
      query: 'SELECT context, time_in FROM "Anhey Ghorey De Dan" WHERE context ILIKE $1',
    },
    {
      table: 'agantuk_1',
      query: 'SELECT context, time_in FROM "Agantuk_1" WHERE context ILIKE $1',
    },
    {
      table: 'jaane_bhi_do_yaaro',
      query: 'SELECT context, time_in FROM "Jaane Bhi Do Yaaro" WHERE context ILIKE $1',
    },
    {
      table: 'the_good_road',
      query: 'SELECT context, time_in FROM "The Good Road" WHERE context ILIKE $1',
    },
    {
      table: 'bioscope',
      query: 'SELECT context, time_in FROM "Bioscope" WHERE context ILIKE $1',
    },
    // Add more tables and queries as needed
  ];

  const allResults = [];

  try {
    const client = await pool.connect();

    for (const { table, query } of queries) {
      const result = await client.query(query, [`%${searchTerm}%`]);
      if (result.rows.length > 0) {
        allResults.push({
          table,
          rows: result.rows,
        });
      }
    }

    client.release();
    res.json(allResults);
  } catch (err) {
    console.error('Error during query execution:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
