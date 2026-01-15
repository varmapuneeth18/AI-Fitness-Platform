from typing import TypedDict, Annotated, List, Union, Literal
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
import operator
import os
import requests
from dotenv import load_dotenv

load_dotenv()
PERPLEXITY_KEY = os.getenv("PERPLEXITY_API_KEY")

def call_llm(system_prompt: str, user_prompt: str) -> str:
    if not PERPLEXITY_KEY:
        return "⚠️ Perplexity API Key missing. Please check .env."
    
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    }
    try:
        res = requests.post("https://api.perplexity.ai/chat/completions", json=payload, headers=headers)
        if res.status_code == 200:
            return res.json()['choices'][0]['message']['content']
        return f"Error from AI: {res.text}"
    except Exception as e:
        return f"System Error: {str(e)}"

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    user_id: int
    profile_data: dict
    next_step: Literal["profile", "planner", "nutrition", "end"]

def profile_node(state: AgentState):
    # This node analyzes the user's intent
    last_msg = state["messages"][-1].content.lower()
    
    if "workout" in last_msg or "plan" in last_msg or "strength" in last_msg:
        return {"next_step": "planner", "messages": []} # No reply yet, pass to planner
    
    if "food" in last_msg or "diet" in last_msg or "calorie" in last_msg:
        return {"next_step": "nutrition", "messages": []}
    
    if "progress" in last_msg or "summary" in last_msg or "report" in last_msg:
        return {"next_step": "analyzer", "messages": []}

    # General chat
    ai_reply = call_llm(
        "You are a helpful fitness coach routing requests.",
        f"Route or answer this user: {last_msg}"
    )
    return {"next_step": "end", "messages": [AIMessage(content=ai_reply)]}
    
def planner_node(state: AgentState):
    user_req = state['messages'][-1].content
    ai_reply = call_llm(
        "You are an expert Strength Coach. Create a workout plan or answer the question.",
        f"User request: {user_req}"
    )
    return {"next_step": "end", "messages": [AIMessage(content=ai_reply)]}

def nutrition_node(state: AgentState):
    user_req = state['messages'][-1].content
    ai_reply = call_llm(
        "You are an expert Dietitian. Provide nutritional advice.",
        f"User request: {user_req}"
    )
    return {"next_step": "end", "messages": [AIMessage(content=ai_reply)]}

def analyzer_node(state: AgentState):
    # In future: fetch DB logs here
    ai_reply = call_llm(
        "You are a fitness data analyst. Give feedback.",
        "The user has trained 3 times this week. Give them a motivational summary."
    )
    return {"next_step": "end", "messages": [AIMessage(content=ai_reply)]}

workflow = StateGraph(AgentState)

workflow.add_node("profile", profile_node)
workflow.add_node("planner", planner_node)
workflow.add_node("nutrition", nutrition_node)
workflow.add_node("analyzer", analyzer_node)

workflow.set_entry_point("profile")

def router(state: AgentState):
    return state["next_step"]

workflow.add_conditional_edges("profile", router, {
    "planner": "planner",
    "nutrition": "nutrition",
    "analyzer": "analyzer",
    "end": END
})

workflow.add_edge("planner", END)
workflow.add_edge("nutrition", END)
workflow.add_edge("analyzer", END)

app = workflow.compile()
