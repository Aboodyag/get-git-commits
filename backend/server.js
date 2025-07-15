const express = require("express");
const cors = require("cors");
const simpleGit = require("simple-git");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/get-commits", async (req, res) => {
    const { folderPath, email } = req.body;

    const git = simpleGit(folderPath);

    try {
        const log = await git.log();
        const filtered = log.all.filter(commit => commit.author_email === email);

        res.json({ commits: filtered });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
