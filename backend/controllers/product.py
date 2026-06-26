from flask import jsonify
from utils.query_runner import run_query

def get_product_overview():
    result = run_query("""
        SELECT
            COUNT(DISTINCT product_id) AS total_products,
            COUNT(DISTINCT sub_category_id) AS total_sub_categories
        FROM products
    """)
    return jsonify(result[0] if result else {})

def get_products_by_category():
    result = run_query("""
        SELECT
            c.category_name,
            sc.sub_category_name,
            COUNT(DISTINCT p.product_id) AS total_products,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit
        FROM categories c
        JOIN sub_categories sc ON c.category_id = sc.category_id
        JOIN products p ON sc.sub_category_id = p.sub_category_id
        JOIN order_items oi ON p.product_id = oi.product_id
        GROUP BY c.category_name, sc.sub_category_name
        ORDER BY total_sales DESC
    """)
    return jsonify(result)

def get_top_selling_products():
    result = run_query("""
        SELECT
            p.product_name,
            c.category_name,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            SUM(oi.quantity) AS total_quantity
        FROM products p
        JOIN order_items oi ON p.product_id = oi.product_id
        JOIN sub_categories sc ON p.sub_category_id = sc.sub_category_id
        JOIN categories c ON sc.category_id = c.category_id
        GROUP BY p.product_id, p.product_name, c.category_name
        ORDER BY total_sales DESC
        LIMIT 10
    """)
    return jsonify(result)

def get_low_profit_products():
    result = run_query("""
        SELECT
            p.product_name,
            c.category_name,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit
        FROM products p
        JOIN order_items oi ON p.product_id = oi.product_id
        JOIN sub_categories sc ON p.sub_category_id = sc.sub_category_id
        JOIN categories c ON sc.category_id = c.category_id
        GROUP BY p.product_id, p.product_name, c.category_name
        HAVING total_profit < 0
        ORDER BY total_profit ASC
        LIMIT 10
    """)
    return jsonify(result)