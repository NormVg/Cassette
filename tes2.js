import pg from "pg";

 const PgPool = new pg.Pool({

  connectionString : "postgresql://neondb_owner:npg_2O8lFujYJkGd@ep-bold-frost-a1tqjja8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});



const res = await PgPool.query('SELECT name ,email FROM "user" ')

console.log(res.rows)
