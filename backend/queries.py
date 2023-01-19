def search_recipes_by_ingredients_query(ingredients: list[str]) -> tuple:
    return f'''SELECT r.`id`, r.`name`
FROM  recipe_ingredients AS ri
    JOIN ingredients AS i ON ri.`ingredient_id`=i.`id`
    JOIN recipes AS r ON ri.`recipe_id`=r.`id`
WHERE i.`name` IN ({','.join(['%s' for i in ingredients])})
GROUP BY r.`id`
HAVING COUNT(r.`id`)>=%s
ORDER BY ri.`id` ASC''', tuple(ingredients + [str(len(ingredients))])


def search_recipes_by_name_query(recipe_name: str, start: int = 0, limit: int = 10):
    return f'''SELECT *
FROM  recipes
WHERE `name` LIKE %s
ORDER BY `name` ASC
LIMIT %s OFFSET %s''', tuple([recipe_name + '%', limit, start])


def get_recipe_by_id_query(recipe_id: int) -> tuple:
    return f'''SELECT r.`name`, i.`name` AS ingredient, ri.quantity, ri.unit, ri.garnish
FROM  recipe_ingredients AS ri
    LEFT JOIN ingredients AS i ON ri.`ingredient_id`=i.`id`
    LEFT JOIN recipes AS r ON ri.`recipe_id`=r.`id`
WHERE r.`id`=%s
ORDER BY ri.`id` ASC''', tuple([recipe_id])


def get_recipe_by_name_query(recipe_name: str) -> tuple:
    return f'''SELECT r.`name`, i.`name` AS ingredient, ri.quantity, ri.unit, ri.garnish
FROM  recipe_ingredients AS ri
    LEFT JOIN ingredients AS i ON ri.`ingredient_id`=i.`id`
    LEFT JOIN recipes AS r ON ri.`recipe_id`=r.`id`
WHERE r.`name`=%s
ORDER BY ri.`id` ASC''', tuple([recipe_name])


def get_ingredient_by_id_query(ingredient_id: int) -> tuple:
    return f'''SELECT *
FROM  ingredients
WHERE `id`=''', tuple([ingredient_id])


def get_ingredient_by_name_query(ingredient_name: str) -> tuple:
    return f'''SELECT *
FROM  ingredients
WHERE `name`=''', tuple([ingredient_name])


def search_ingredients_by_name_query(ingredient_name: str, start: int = 0, limit: int = 10) -> tuple:
    return f'''SELECT *
FROM  ingredients
WHERE `name` LIKE %s
ORDER BY `name` ASC
LIMIT %s OFFSET %s''', tuple([ingredient_name + '%', limit, start])
