import express from "express";
import accountRoutes from "./routes/account";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/account", accountRoutes);

app.get("/", (req, res, next) => {
  res.send("ECOMSTOREX is up and Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
