import ps from "pg";

export const PostGress = new ps.Pool({
        connectionString : process.env.DATABASE_URL
    })
