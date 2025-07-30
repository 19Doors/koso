"use server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { currentDateTimeTool } from "./tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
export async function chat(messages, modelName) {
  // console.log(messages);
  // console.log(modelName);

  const llm = new ChatGoogleGenerativeAI({
    model: modelName,
    temperature: 0,
  });
  // const message = await llm.invoke(messages);
  const agent = createReactAgent({
    llm: llm,
    tools: [currentDateTimeTool],
  });
  const agentFinalState = await agent.invoke({ messages: messages });
  console.log(agentFinalState);
  var currFinalMsg =
    agentFinalState.messages[agentFinalState.messages.length - 1].content;
  let aimessage = { content: currFinalMsg, role: "assistant" };
  return aimessage;
}
