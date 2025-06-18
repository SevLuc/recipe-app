"""
Simple Flask backend serving placeholder recipe data.

Run:
    python backend/app.py
The API will be available at http://localhost:5000
"""

import json
from pathlib import Path

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "recipes.json"

# Mount built-in static files under /static to avoid clashing with /api routes
app = Flask(__name__, static_folder="../frontend", static_url_path="/static")
CORS(app)  # Allow requests from the React front-end

# Load recipe data once at startup
with DATA_FILE.open(encoding="utf-8") as fp:
    RECIPES = json.load(fp)


@app.get("/api/recipes")
def list_recipes():
    """Return the full list of recipes (basic fields)."""
    # Strip instructions for the list view to reduce payload
    summary = [
        {k: v for k, v in r.items() if k in ("id", "title", "image")}
        for r in RECIPES
    ]
    return jsonify(summary)


@app.get("/api/recipes/<int:recipe_id>")
def get_recipe(recipe_id: int):
    """Return a single recipe by ID."""
    recipe = next((r for r in RECIPES if r["id"] == recipe_id), None)
    if recipe:
        return jsonify(recipe)
    return jsonify({"error": "Recipe not found"}), 404


# -------- Frontend routes --------
@app.route("/")
def index():
    """Serve the React front-end entry point."""
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def static_proxy(path):
    """
    Serve static assets (JS/CSS/images) or fallback to index.html
    so that React Router works on page refresh.
    """
    file_path = Path(app.static_folder) / path
    if file_path.exists():
        return send_from_directory(app.static_folder, path)
    # Fallback for client-side routes
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    # Enable hot-reload for local development
    app.run(host="0.0.0.0", port=5000, debug=True)
