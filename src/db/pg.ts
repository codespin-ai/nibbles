import pgPromise from 'pg-promise';

// Initialize pg-promise with an empty configuration object
const pgp = pgPromise({});

/**
 * Retrieves a PostgreSQL database connection using environment variables.
 * @returns {pgPromise.IDatabase<{}, pg.IClient>} A pg-promise database connection object.
 */
export function getConnection() {
  // Read database connection details from environment variables
  const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  };

  // Create and return the database connection
  return pgp(dbConfig);
}