from flask import jsonify
from utils.query_runner import run_query

def get_sales_overview():
    result = run_query("""
        SELECT 
            ROUND(SUM(sales), 2) AS total_sales,
            ROUND(SUM(profit), 2) AS total_profit,
            SUM(quantity) AS total_quantity,
            COUNT(DISTINCT order_id) AS total_orders
        FROM order_items
    """)
    return jsonify(result[0] if result else {})

def get_sales_by_month():
    result = run_query("""
        SELECT 
            DATE_FORMAT(o.order_date, '%%Y-%%m') AS month,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        GROUP BY month
        ORDER BY month
    """)
    return jsonify(result)

def get_sales_by_category():
    result = run_query("""
        SELECT 
            c.category_name,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        JOIN sub_categories sc ON p.sub_category_id = sc.sub_category_id
        JOIN categories c ON sc.category_id = c.category_id
        GROUP BY c.category_name
        ORDER BY total_sales DESC
    """)
    return jsonify(result)

def get_sales_by_region():
    result = run_query("""
        SELECT 
            r.region_name,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.order_id
        JOIN cities ci ON o.city_id = ci.city_id
        JOIN states st ON ci.state_id = st.state_id
        JOIN regions r ON st.region_id = r.region_id
        GROUP BY r.region_name
        ORDER BY total_sales DESC
    """)
    return jsonify(result)

def get_top_products():
    result = run_query("""
        SELECT 
            p.product_name,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit,
            SUM(oi.quantity) AS total_qty
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        GROUP BY p.product_name
        ORDER BY total_sales DESC
        LIMIT 10
    """)
    return jsonify(result)