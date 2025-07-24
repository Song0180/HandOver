from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI()

origins = [
    "http://localhost:5173",
]

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],  # Allows all headers
)

print("haha", settings.SQLALCHEMY_DATABASE_URI)


@app.get("/")
def read_root():
    return {"Hello": "World"}
