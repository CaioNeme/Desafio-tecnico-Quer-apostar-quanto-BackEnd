import express from "express";
import "express-async-errors";
import { handleApplicationErrors } from "@/middlewares/";
import router from "@/routes/index.router";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`O servidor esta logado na porta ${port}`));

export default app;
