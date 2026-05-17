import dotenv from 'dotenv';
dotenv.config();

// Dynamic imports so that dotenv is loaded BEFORE any module
// reads process.env at the top level (ES module imports are hoisted,
// so static imports would run before dotenv.config()).
const { default: connectDB } = await import('./db/index.js');
const { default: app } = await import('./app.js');

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // handle server startup errors
    server.on('error', err => {
      console.error('Server startup failed:', err.message);
      console.error(err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('Failed to connect DB:', err.message);
    console.error(err);
    process.exit(1);
  });