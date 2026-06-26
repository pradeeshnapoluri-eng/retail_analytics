from flask import jsonify
from utils.query_runner import run_query

def get_customer_overview():
    result = run_query("""
        SELECT
            COUNT(DISTINCT customer_id) AS total_customers,
            COUNT(DISTINCT segment) AS total_segments
        FROM customers
    """)
    return jsonify(result[0] if result else {})

def get_customers_by_segment():
    result = run_query("""
        SELECT
            segment,
            COUNT(DISTINCT c.customer_id) AS total_customers,
            ROUND(SUM(oi.sales), 2) AS total_sales
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        GROUP BY segment
        ORDER BY total_sales DESC
    """)
    return jsonify(result)

def get_top_customers():
    result = run_query("""
        SELECT
            c.customer_name,
            c.segment,
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit,
            COUNT(DISTINCT o.order_id) AS total_orders
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        GROUP BY c.customer_id, c.customer_name, c.segment
        ORDER BY total_sales DESC
        LIMIT 10
    """)
    return jsonify(result)

def get_customer_growth():
    result = run_query("""
        SELECT
            DATE_FORMAT(o.order_date, '%%Y-%%m') AS month,
            COUNT(DISTINCT o.customer_id) AS active_customers
        FROM orders o
        GROUP BY month
        ORDER BY month
    """)
    return jsonify(result)