import app from "./app";
import config from "./configs/config";

app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

app.listen(config.port, () => {
  console.log(`✅ Server running at http://localhost:${config.port}`);
});
