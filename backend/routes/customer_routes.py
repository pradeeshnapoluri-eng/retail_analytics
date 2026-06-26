from flask import Blueprint
from controllers.customer import (
    get_customer_overview,
    get_customers_by_segment,
    get_top_customers,
    get_customer_growth
)

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/overview')
def customer_overview():
    return get_customer_overview()

@customer_bp.route('/by-segment')
def customer_segment():
    return get_customers_by_segment()

@customer_bp.route('/top')
def top_customers():
    return get_top_customers()

@customer_bp.route('/growth')
def customer_growth():
    return get_customer_growth()