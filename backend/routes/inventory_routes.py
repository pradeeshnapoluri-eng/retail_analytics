from flask import Blueprint
from controllers.inventory import (
    get_inventory_overview,
    get_stock_by_category,
    get_discount_analysis
)

inventory_bp = Blueprint('inventory', __name__)

@inventory_bp.route('/overview')
def inventory_overview():
    return get_inventory_overview()

@inventory_bp.route('/by-category')
def stock_by_category():
    return get_stock_by_category()

@inventory_bp.route('/discount-analysis')
def discount_analysis():
    return get_discount_analysis()