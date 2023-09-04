import app from "./app.js";

const PORT = process.env.PORT || 9090;

app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`);
});
