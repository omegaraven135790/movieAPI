import express from 'express'
import movieRoutes from './routes/movieRoutes.js'
import {config} from 'dotenv'
import {connectDB,disconnectDB} from './config/db.js'
import authRoutes from './routes/authRoutes.js'
config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5001
//bpdy parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//api routes:
app.use('/movies', movieRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend!' })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
})

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
    await disconnectDB();
  process.exit(1);
})

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received. Closing server...");
  await disconnectDB();
  process.exit(0);
});