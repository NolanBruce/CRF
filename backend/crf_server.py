# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from secrets import choice
import string
import os
from queries import get_recipe_by_id_query, get_recipe_by_name_query, search_recipes_by_ingredients_query, \
    get_ingredient_by_name_query, get_ingredient_by_id_query, search_ingredients_by_name_query, \
    search_recipes_by_name_query


# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY') or \
                 ''.join(choice(string.ascii_uppercase + string.digits) for _ in range(36))
# CORS
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# SQL
db_host = os.environ.get('DB_HOST') or 'localhost'
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME') or 'crf'
db_port = os.environ.get('DB_PORT') or 5432
connection = psycopg2.connect(database=db_name,
                              host=db_host,
                              user=db_user,
                              password=db_password,
                              port=db_port)


@app.route('/recipes', methods=['POST'])
def search_recipes():
    data = request.json
    if 'ingredients' in data.keys():
        result = search_recipes_by_ingredients(data['ingredients'])
        return jsonify(result)
    elif 'recipe_name' in data.keys():
        recipe_name = data['recipe_name']
        start = data.get('start', 0)
        limit = data.get('limit', 10)
        result = search_recipes_by_name(recipe_name, start=start, limit=limit)
        return jsonify(result)

    return 'Invalid request. Ingredients or recipe name must be provided.', 400


@app.route('/recipes/<int:recipe_id>/', methods=['GET'])
def get_recipe_by_id(recipe_id):
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = get_recipe_by_id_query(recipe_id)
        cursor.execute(query, parameters)
        return jsonify(convert_sql_recipe_results_to_dict(cursor))


@app.route('/recipes/<string:recipe_name>/', methods=['GET'])
def get_recipe_by_name(recipe_name):
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = get_recipe_by_name_query(recipe_name)
        cursor.execute(query, parameters)
        return jsonify(convert_sql_recipe_results_to_dict(cursor))


@app.route('/ingredients/', methods=['POST'])
def search_ingredients_by_name():
    data = request.json
    if 'ingredient' not in data.keys():
        return 'Invalid request. Missing ingredient.', 400

    result: list[dict] = []
    ingredient = data['ingredient']
    start = data.get('start', 0)
    limit = data.get('limit', 10)
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = search_ingredients_by_name_query(ingredient, start=start, limit=limit)
        cursor.execute(query, parameters)
        for row in cursor:
            result.append(row)
    return jsonify(result)


@app.route('/ingredients/<int:ingredient_id>/', methods=['GET'])
def get_ingredient_by_id(ingredient_id):
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = get_ingredient_by_id_query(ingredient_id)
        cursor.execute(query, parameters)
        return jsonify(cursor.fetchone())


@app.route('/ingredients/<string:ingredient_name>/', methods=['GET'])
def get_ingredient_by_name(ingredient_name):
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = get_ingredient_by_name_query(ingredient_name)
        cursor.execute(query, parameters)
        return jsonify(cursor.fetchone())


def convert_sql_recipe_results_to_dict(cursor) -> dict:
    result: dict = {}
    ingredients: list = []
    for row in cursor:
        if 'name' not in result:
            result['name'] = row['name']
        row.pop('name', None)
        ingredients.append(row)
    result['ingredients'] = ingredients
    return result


def search_recipes_by_ingredients(ingredients: list[str]) -> list[dict]:
    result: list[dict] = []
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = search_recipes_by_ingredients_query(ingredients)
        cursor.execute(query, parameters)
        for row in cursor:
            result.append(row)
    return result


def search_recipes_by_name(recipe_name: str, start: int = 0, limit: int = 0) -> list[dict]:
    result: list[dict] = []
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    with cursor:
        query, parameters = search_recipes_by_name_query(recipe_name, start=start, limit=limit)
        cursor.execute(query, parameters)
        for row in cursor:
            result.append(row)
    return result


if __name__ == '__main__':
    app.run(debug=True)
