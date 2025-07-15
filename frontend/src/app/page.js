"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [email, setEmail] = useState("");
    const [folders, setFolders] = useState([]);
    const [commits, setCommits] = useState([]);

    const handleFolderInput = (index, path) => {
        const newFolders = [...folders];
        newFolders[index] = path;
        setFolders(newFolders);
    };

    const addFolderInput = () => setFolders([...folders, ""]);

    const handleFetchCommits = async () => {
        let allCommits = [];
        for (const folderPath of folders) {
            try {
                const { data } = await axios.post("/api/get-commits", {
                    folderPath,
                    email,
                });
                allCommits = [...allCommits, ...data.commits];
            } catch (error) {
                console.error(`Error fetching from ${folderPath}:`, error);
            }
        }
        setCommits(allCommits);
    };

    return (
        <main className="p-4">
            <h1>Git Commit Tracker</h1>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border p-2 mb-4 block"
            />

            {folders.map((folder, index) => (
                <input
                    type = 'folder'
                    key={index}
                    value={folder}
                    onChange={(e) => handleFolderInput(index, e.target.value)}
                    placeholder={`Folder path ${index + 1}`}
                    className="border p-2 mb-2 block"
                />
            ))}

            <button onClick={addFolderInput} className="p-2 bg-blue-500 text-white mr-2">
                Add Folder
            </button>
            <button onClick={handleFetchCommits} className="p-2 bg-green-500 text-white">
                Get Commits
            </button>

            <div className="mt-6">
                <h2>Commits Found: {commits.length}</h2>
                <ul>
                    {commits.map((commit, i) => (
                        <li key={i}>{commit.message} — {commit.author_name}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
