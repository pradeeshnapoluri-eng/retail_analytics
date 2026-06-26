from flask import Blueprint
from controllers.product import (
    get_product_overview,
    get_products_by_category,
    get_top_selling_products,
    get_low_profit_products
)

product_bp = Blueprint('product', __name__)

@product_bp.route('/overview')
def product_overview():
    return get_product_overview()

@product_bp.route('/by-category')
def products_by_category():
    return get_products_by_category()

@product_bp.route('/top-selling')
def top_selling():
    return get_top_selling_products()

@product_bp.route('/low-profit')
def low_profit():
    return get_low_profit_products()