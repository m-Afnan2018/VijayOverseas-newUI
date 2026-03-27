//  Express Instance
const express = require("express");
const app = express();

//  Importing all routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

//  Importing Middlewares
const dbConnection = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//  PORT
dotenv.config();
const PORT = process.env.PORT || 4000;

//dbConnection connect
dbConnection();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true,
	})
)

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/notices", noticeRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/upload", uploadRoutes);

//define route
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at http://localhost:${PORT}/`)
})