from flask import Blueprint
from controllers.dashboard import (
    get_kpi_summary,
    get_recent_orders,
    get_profit_trend
)

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/kpi')
def kpi_summary():
    return get_kpi_summary()

@dashboard_bp.route('/recent-orders')
def recent_orders():
    return get_recent_orders()

@dashboard_bp.route('/profit-trend')
def profit_trend():
    return get_profit_trend()