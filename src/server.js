import app from "./app.js";
import connectDB from "./config/db.config.js";
import { NODE_ENV, PORT } from "./config/env.confing.js";

if(NODE_ENV == "production"){
    console.log("env == ",NODE_ENV)
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
    console.info = () => {};
}
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {

            console.log(`🚀 Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

console.log("This should NOT print in production");
startServer();
