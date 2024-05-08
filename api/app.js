import express from "express"
import initRouter from "./routes/router.js";
import { initDb } from "./db/db.js";

initDb()
const app = express();
initRouter(app)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
