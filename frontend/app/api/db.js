import { Pool } from 'pg'
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:simran8199889776@db.eljhysanzgwfvzvjvtnl.supabase.co:5432/postgres"

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool
