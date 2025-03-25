import express, { Application } from "express";

const app = express();

const PORT = 3000;


app.get('/', (req, res) => {
    res.send("ITs working")
})

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
