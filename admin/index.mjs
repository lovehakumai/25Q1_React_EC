import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";

const app = express(); // ルーティング処理を簡潔にするライブラリ
const port = process.env.port || 8000;
app.use(cors()); // 他ドメインからのリクエストを許可する
app.use(express.json()); // リクエストがjsonの時にjson形式としてparseする(リクエストは全て文字列だから)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.resolve(__dirname, "./routes");
const routeFiles = readdirSync(routesPath);

routeFiles.map(async(file)=>{
    const routeModule = await import(`./routes/${file}`);
    app.use('/', routeModule.default)
})

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})