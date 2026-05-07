import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 * Exits the process if the env var is missing or the connection fails.
 */
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error(
      '[DB] Error: MONGO_URI environment variable is not defined. ' +
        'Please set it in your .env file before starting the server.'
    );
    process.exit(1);
  }

  try {
    // Mongoose uses a default connection pool (max 5 connections) automatically.
    // No explicit poolSize option is needed — the default is sufficient for this app.
    const conn = await mongoose.connect(uri);
    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    process.exit(1);
  }
};
