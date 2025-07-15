const express = require("express");
const cors = require("cors");
const simpleGit = require("simple-git");

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post("/get-commits", async (req, res) => {
    const { folderPath, email } = req.body;

    console.log("Request received with:", folderPath, email);

    const git = simpleGit(folderPath);

    try {
        const log = await git.log();
        const filtered = log.all.filter(commit => commit.author_email === email);

        console.log("Filtered commits:", filtered);

        res.json({ commits: filtered });
    } catch (err) {
        console.error("Error in /get-commits:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));

