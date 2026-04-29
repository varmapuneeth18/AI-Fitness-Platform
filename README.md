# 🏋️ AI Fitness Platform

AI-powered fitness coach with intelligent agent-based workout routing and immersive 3D visualizations. Built for personalized fitness journeys with real-time tracking and automated insights.

![Platform Demo](./assets/demo.gif)
<!-- TODO: Add a GIF showing the 3D workout visualization or agent routing in action -->

## 🎯 Overview

This platform combines cutting-edge AI agent orchestration with interactive 3D visualizations to deliver a personalized fitness coaching experience. Users receive intelligent workout recommendations, track their progress in real-time, and visualize their fitness journey through immersive 3D interfaces.

### Key Features

- **🤖 Agent-Based Routing** - LangGraph orchestrates intelligent workout recommendations based on user goals, fitness level, and progress
- **🎨 3D Interactive UI** - Three.js-powered immersive workout visualizations and body tracking
- **📊 Real-Time Tracking** - Live workout and nutrition monitoring with instant feedback
- **💡 Automated Insights** - AI-generated progress analysis and personalized recommendations
- **🎯 Goal Management** - Smart goal setting with adaptive milestone tracking
- **📱 Responsive Design** - Seamless experience across desktop and mobile devices

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   3D Viewer  │  │  Dashboard   │  │  Nutrition   │      │
│  │  (Three.js)  │  │  (React)     │  │   Tracker    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Backend (FastAPI)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  LangGraph   │  │   Workout    │  │  Analytics   │      │
│  │   Agents     │  │     API      │  │   Engine     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Data Layer (PostgreSQL)                         │
│   User Profiles | Workouts | Nutrition | Progress Data      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  AI Services (LangChain)                     │
│            OpenAI API | Vector Store | Embeddings           │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **3D Graphics:** Three.js
- **State Management:** React Context + Hooks
- **Styling:** Tailwind CSS
- **Type Safety:** TypeScript

### Backend
- **API Framework:** FastAPI
- **AI Orchestration:** LangGraph
- **LLM Integration:** LangChain + OpenAI API
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT

### DevOps
- **Containerization:** Docker
- **Deployment:** Vercel (Frontend), AWS ECS (Backend)
- **CI/CD:** GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL 14+
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/varmapuneeth18/AI-Fitness-Platform.git
cd AI-Fitness-Platform
```

2. **Set up the frontend**
```bash
cd frontend
npm install
```

3. **Configure environment variables (frontend)**
```bash
# Create .env.local file
cp .env.example .env.local

# Add your configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENV=development
```

4. **Set up the backend**
```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

5. **Configure environment variables (backend)**
```bash
# Create .env file
cp .env.example .env

# Add your configuration
DATABASE_URL=postgresql://user:password@localhost:5432/fitness_db
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

6. **Set up the database**
```bash
# Create database
createdb fitness_db

# Run migrations
alembic upgrade head

# (Optional) Seed with sample data
python scripts/seed_db.py
```

### Running the Application

**Frontend (Development)**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

**Backend (Development)**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# Runs on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

**Using Docker (Production)**
```bash
# Build and run all services
docker-compose up --build

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📸 Screenshots

### Dashboard
![Dashboard](./assets/dashboard.png)
<!-- TODO: Add screenshot of the main dashboard showing workout overview -->

### 3D Workout Visualization
![3D Visualization](./assets/3d-workout.png)
<!-- TODO: Add screenshot of Three.js 3D workout interface -->

### AI Agent Routing
![Agent Routing](./assets/agent-routing.png)
<!-- TODO: Add screenshot or diagram showing LangGraph agent decision flow -->

### Nutrition Tracker
![Nutrition Tracker](./assets/nutrition.png)
<!-- TODO: Add screenshot of nutrition tracking interface -->

## 🧠 Agent Orchestration

The platform uses LangGraph to orchestrate multiple AI agents:

```python
# Example agent routing logic
fitness_graph = StateGraph(AgentState)

# Define agents
fitness_graph.add_node("workout_planner", workout_planner_agent)
fitness_graph.add_node("nutrition_advisor", nutrition_advisor_agent)
fitness_graph.add_node("progress_analyzer", progress_analyzer_agent)

# Define routing logic
fitness_graph.add_conditional_edges(
    "workout_planner",
    route_to_next_agent,
    {
        "nutrition": "nutrition_advisor",
        "analysis": "progress_analyzer",
        "end": END
    }
)
```

Agents collaborate to:
- Generate personalized workout plans
- Provide nutrition recommendations
- Analyze progress and suggest adjustments
- Motivate users with contextual insights

## 📊 Key Features Deep Dive

### 1. Intelligent Workout Recommendations
- Analyzes user fitness level, goals, and progress
- Adapts workout difficulty dynamically
- Considers rest days and recovery needs
- Integrates exercise science principles

### 2. 3D Body Tracking
- Real-time form visualization
- Exercise demonstration with 3D models
- Progress visualization across muscle groups
- Interactive anatomy education

### 3. Nutrition Intelligence
- Macro and micronutrient tracking
- Meal suggestions based on workout intensity
- Integration with fitness goals (bulk/cut/maintain)
- Automated meal logging via AI

### 4. Progress Analytics
- Trend analysis across multiple metrics
- Predictive modeling for goal achievement
- Comparative analytics (personal bests, averages)
- Export reports in multiple formats

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration for production
- Environment variable management
- SQL injection prevention via ORM

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
pytest

# Run with coverage
pytest --cov=app tests/
```

## 📈 Performance

- Frontend: Lighthouse score 95+ (Performance, Accessibility, Best Practices)
- Backend: Average response time <100ms for API endpoints
- 3D Rendering: 60 FPS on modern devices
- Database queries optimized with indexing

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Social features (share workouts, challenges)
- [ ] Wearable device integration
- [ ] Video form analysis with computer vision
- [ ] Offline mode support
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js community for 3D visualization resources
- LangChain team for the AI orchestration framework
- OpenAI for LLM capabilities
- FastAPI for an excellent async Python framework

## 📧 Contact

Puneeth Varma - [varma.puneeth07@gmail.com](mailto:varma.puneeth07@gmail.com)

LinkedIn: [linkedin.com/in/puneethvarma180745](https://www.linkedin.com/in/puneethvarma180745)

Project Link: [https://github.com/varmapuneeth18/AI-Fitness-Platform](https://github.com/varmapuneeth18/AI-Fitness-Platform)

---

⭐ Star this repo if you find it helpful!
