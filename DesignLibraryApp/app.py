from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

def load_components():
    with open("components.json", "r", encoding="utf-8") as f:
        return json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/browse")
def browse():
    components = load_components()
    return render_template("browse.html", components=components)

@app.route("/component/<int:component_id>")
def component_detail(component_id):
    components = load_components()
    component = next(c for c in components if c["id"] == component_id)
    return render_template("component.html", component=component)

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


@app.route("/api/components")
def api_components():
    return jsonify(load_components())


if __name__ == "__main__":
    app.run(debug=True)
