import { promises as fs } from "fs";

// Define an async function to read JSON from a file
export async function readJson(filename: string): Promise<any> {
  try {
    // Read the file content
    const content = await fs.readFile(filename, "utf8");

    // Parse and return the content as JSON
    return JSON.parse(content);
  } catch (error) {
    // Handle errors (e.g., file not found, invalid JSON)
    console.error("Error reading or parsing file:", error);
    throw error;
  }
}
