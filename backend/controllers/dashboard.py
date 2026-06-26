from flask import jsonify
from utils.query_runner import run_query

def get_kpi_summary():
    result = run_query("""
        SELECT
            ROUND(SUM(oi.sales), 2) AS total_sales,
            ROUND(SUM(oi.profit), 2) AS total_profit,
            COUNT(DISTINCT o.order_id) AS total_orders,
            COUNT(DISTINCT o.customer_id) AS total_customers,
            ROUND(SUM(oi.profit) / SUM(oi.sales) * 100, 2) AS profit_margin_pct
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
    """)
    return jsonify(result[0] if result else {})

def get_recent_orders():
    result = run_query("""
        SELECT
            o.order_id,
            o.order_date,
            c.customer_name,
            c.segment,
            ROUND(SUM(oi.sales), 2) AS order_value
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        GROUP BY o.order_id, o.order_date, c.customer_name, c.segment
        ORDER BY o.order_date DESC
        LIMIT 10
    """)
    return jsonify(result)

def get_profit_trend():
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