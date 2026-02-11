import os
import secrets
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from app.core.lifespan import lifespan
from app.modules.onboarding.router import router as onboarding_router
from app.modules.auth.router import router as auth_router

# =====================================================
# App Initialization
# =====================================================

app = FastAPI(
    title="Borderlink API",
    lifespan=lifespan,
    root_path="/api",          # IMPORTANTE para nginx /api/
    docs_url=None,             # Desactivamos docs automáticos
    redoc_url=None,
    openapi_url=None
)

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mentalia.borderlink.mx",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Routers
# =====================================================

app.include_router(onboarding_router)
app.include_router(auth_router)

# =====================================================
# Health Check
# =====================================================

@app.get("/health")
def health():
    return {"status": "ok"}

# =====================================================
# Protected Swagger
# =====================================================

security = HTTPBasic()

SWAGGER_USER = os.getenv("SWAGGER_USER")
SWAGGER_PASSWORD = os.getenv("SWAGGER_PASSWORD")

def verify_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    if not SWAGGER_USER or not SWAGGER_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Swagger credentials not configured"
        )

    correct_username = secrets.compare_digest(credentials.username, SWAGGER_USER)
    correct_password = secrets.compare_digest(credentials.password, SWAGGER_PASSWORD)

    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Basic"},
        )

# Swagger UI protegido
@app.get("/docs", include_in_schema=False)
def protected_swagger(credentials: HTTPBasicCredentials = Depends(verify_credentials)):
    return get_swagger_ui_html(
        openapi_url="/api/openapi.json",  # IMPORTANTE con root_path
        title="Borderlink API - Docs"
    )

# OpenAPI protegido
@app.get("/openapi.json", include_in_schema=False)
def openapi(credentials: HTTPBasicCredentials = Depends(verify_credentials)):
    return get_openapi(
        title=app.title,
        version="1.0.0",
        routes=app.routes,
    )
