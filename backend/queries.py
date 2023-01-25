def search_recipes_by_ingredients_query(ingredients: list[str]) -> tuple:
    return f'''SELECT r.id, r.name
FROM  recipe_ingredients AS ri
    JOIN ingredients AS i ON ri.ingredient_id=i.id
    JOIN recipes AS r ON ri.recipe_id=r.id
WHERE i.name IN ({','.join(['%s' for i in ingredients])})
GROUP BY r.id, r.name
HAVING COUNT(r.id)>=%s
ORDER BY r.name ASC''', tuple(ingredients + [str(len(ingredients))])


def search_recipes_by_name_query(recipe_name: str, start: int = 0, limit: int = 10):
    return f'''SELECT *
FROM  recipes
WHERE LOWER(name) LIKE LOWER(%s)
ORDER BY name ASC
LIMIT %s OFFSET %s''', tuple(['%'+recipe_name+'%', limit, start])


def get_recipe_by_id_query(recipe_id: int) -> tuple:
    return f'''SELECT *
FROM recipes AS r
WHERE r.id=%s
ORDER BY r.id ASC''', tuple([recipe_id])


def get_recipe_by_name_query(recipe_name: int) -> tuple:
    return f'''SELECT *
FROM recipes AS r
WHERE r.name=%s
ORDER BY r.id ASC''', tuple([recipe_name])


def get_recipe_ingredients_by_id_query(recipe_id: int) -> tuple:
    return f'''SELECT i.name, ri.quantity, ri.unit, ri.garnish, ri.id, i.abv
FROM recipe_ingredients AS ri
    LEFT JOIN ingredients AS i ON ri.ingredient_id=i.id
    LEFT JOIN recipes AS r ON ri.recipe_id=r.id
WHERE r.id=%s
ORDER BY ri.garnish ASC, ri.quantity DESC''', tuple([recipe_id])


def get_recipe_ingredients_by_name_query(recipe_name: str) -> tuple:
    return f'''SELECT i.name, ri.quantity, ri.unit, ri.garnish, ri.id
FROM recipe_ingredients AS ri
    LEFT JOIN ingredients AS i ON ri.ingredient_id=i.id
    LEFT JOIN recipes AS r ON ri.recipe_id=r.id
WHERE r.name=%s
ORDER BY ri.garnish ASC, ri.quantity DESC''', tuple([recipe_name])


def get_ingredient_by_id_query(ingredient_id: int) -> tuple:
    return f'''SELECT *
FROM ingredients
WHERE id=%s''', tuple([ingredient_id])


def get_ingredient_by_name_query(ingredient_name: str) -> tuple:
    return f'''SELECT *
FROM  ingredients
WHERE name=%s''', tuple([ingredient_name])


def search_ingredients_by_name_query(ingredient_name: str, start: int = 0, limit: int = 10) -> tuple:
    return f'''SELECT *
FROM  ingredients
WHERE LOWER(name) LIKE LOWER(%s)
ORDER BY name ASC
LIMIT %s OFFSET %s''', tuple(['%'+ingredient_name+'%', limit, start])
