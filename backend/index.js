import express from 'express'
import dotenv from "dotenv"
import connectedDB from "./database/db.js"
import cors from 'cors'

import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import newsRoute from "./routes/news.route.js"
import swaggerRoute from "./routes/swagger.route.js"

dotenv.config()



const app = express()
const port = process.env.PORT || 3000

connectedDB()
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    cors()
    next();
})
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/news", newsRoute)
// app.use("/documentation", swaggerRoute)


const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
};

app.use(notFound);



app.listen(port, () => console.log(`Server running on port ${port}`))