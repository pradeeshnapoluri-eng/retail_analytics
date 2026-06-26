from flask import jsonify
from utils.query_runner import run_query

def get_inventory_overview():
    result = run_query("""
        SELECT
            SUM(quantity) AS total_units_sold,
            ROUND(AVG(discount) * 100, 2) AS avg_discount_pct,
            COUNT(DISTINCT product_id) AS unique_products_sold
        FROM order_items
    """)
    return jsonify(result[0] if result else {})

def get_stock_by_category():
    result = run_query("""
        SELECT
            c.category_name,
            SUM(oi.quantity) AS total_units,
            ROUND(SUM(oi.sales), 2) AS total_sales
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        JOIN sub_categories sc ON p.sub_category_id = sc.sub_category_id
        JOIN categories c ON sc.category_id = c.category_id
        GROUP BY c.category_name
        ORDER BY total_units DESC
    """)
    return jsonify(result)

def get_discount_analysis():
    result = run_query("""
        SELECT
            CASE
                WHEN discount = 0 THEN 'No Discount'
                WHEN discount <= 0.2 THEN 'Low (1-20%%)'
                WHEN discount <= 0.4 THEN 'Medium (21-40%%)'
                ELSE 'High (40%%+)'
            END AS discount_range,
            COUNT(*) AS total_items,
            ROUND(SUM(sales), 2) AS total_sales,
            ROUND(SUM(profit), 2) AS total_profit
        FROM order_items
        GROUP BY discount_range
        ORDER BY total_sales DESC
    """)
    return jsonify(result)