-- SELECT r.`name`, i.`name` AS ingredient, ri.quantity, ri.unit, ri.garnish
-- 	FROM  recipe_ingredients AS ri
-- 		LEFT JOIN ingredients AS i ON ri.`ingredient_id`=i.`id`
-- 		LEFT JOIN recipes AS r ON ri.`recipe_id`=r.`id`
-- 	WHERE i.`name`='Tequila'
-- 	ORDER BY ri.id ASC

-- SELECT r.`id`, r.`name`
-- 	FROM  recipe_ingredients AS ri
-- 		JOIN ingredients AS i ON ri.`ingredient_id`=i.`id`
-- 	   JOIN recipes AS r ON ri.`recipe_id`=r.`id`
-- -- 		JOIN recipes AS r2 ON ri.`recipe_id`=ri.`recipe_id`
-- 	WHERE i.`name` IN ('Gin','Lime')
-- 	GROUP BY r.`id`
-- 	HAVING COUNT(r.`id`)>=2
-- 	ORDER BY ri.id ASC

SELECT r.`name`, i.`name` AS ingredient, ri.quantity, ri.unit, ri.garnish
FROM  recipe_ingredients AS ri
    LEFT JOIN ingredients AS i ON ri.`ingredient_id`=i.`id`
    LEFT JOIN recipes AS r ON ri.`recipe_id`=r.`id`
WHERE r.`id`='1'
ORDER BY ri.id ASC