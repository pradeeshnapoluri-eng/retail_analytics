from flask import Blueprint
from controllers.sales import (
    get_sales_overview,
    get_sales_by_month,
    get_sales_by_category,
    get_sales_by_region,
    get_top_products
)

sales_bp = Blueprint('sales', __name__)

@sales_bp.route('/overview')
def sales_overview():
    return get_sales_overview()

@sales_bp.route('/monthly')
def sales_monthly():
    return get_sales_by_month()

@sales_bp.route('/by-category')
def sales_category():
    return get_sales_by_category()

@sales_bp.route('/by-region')
def sales_region():
    return get_sales_by_region()

@sales_bp.route('/top-products')
def top_products():
    return get_top_products()