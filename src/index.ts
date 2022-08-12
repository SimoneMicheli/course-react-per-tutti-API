import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
	res.send("Hello World 1");
});

app.listen(port, () => {
	console.log(`Express server is running on post ${port}`);
});
