from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, database, schemas, dependencies
from agents.graph import app as agent_app
from langchain_core.messages import HumanMessage

router = APIRouter(
    prefix="/coach",
    tags=["coach"],
)

class ChatRequest(schemas.BaseModel):
    message: str

@router.post("/chat")
async def chat_with_coach(req: ChatRequest, current_user: models.User = Depends(dependencies.get_current_user)):
    # Initialize state with history if needed
    # For MVP, we just send current message
    
    input_state = {
        "messages": [HumanMessage(content=req.message)],
        "user_id": current_user.id,
        "profile_data": {}, # Load from DB real impl
        "next_step": ""
    }
    
    result = await agent_app.ainvoke(input_state)
    
    last_message = result["messages"][-1]
    return {"reply": last_message.content}
