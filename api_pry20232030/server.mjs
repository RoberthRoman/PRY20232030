import express from "express";
import cors from "cors";

import runPrediction from "./tensorflow.mjs";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/predict", async (req, res) => {
  try {
    const { sales } = req.body;

    if (!sales) return res.status(400).json({ message: "Sales is required" });

    console.log("sales: ", sales);
    const result = await runPrediction(sales);

    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Prediction app listening at http://localhost:${port}`);
});
