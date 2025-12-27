import { StateGraph } from "@langchain/langgraph";
import { llm, toolNode } from "./agent/maintenance.agent.js";
import { MaintenanceState } from "./state.schema.js";
import { SYSTEM_PROMPT } from "./agent/prompt.js";

const graph = new StateGraph(MaintenanceState)
  .addNode("agent", async (state) => {
    return llm.invoke([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(state) }
    ]);
  })
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", toolNode)
  .addEdge("tools", "agent");

export const maintenanceWorkflow = graph.compile();
