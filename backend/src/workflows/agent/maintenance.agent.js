import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph";
import tools from "../tools/index.js";

export const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-70b-8192",
  temperature: 0
});

export const toolNode = new ToolNode(tools);
