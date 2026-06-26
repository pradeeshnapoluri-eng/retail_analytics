from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

from routes.sales_routes import sales_bp
from routes.customer_routes import customer_bp
from routes.product_routes import product_bp
from routes.inventory_routes import inventory_bp
from routes.dashboard_routes import dashboard_bp

app = Flask(__name__)

# Fix CORS completely
CORS(app)

app.register_blueprint(sales_bp, url_prefix='/api/sales')
app.register_blueprint(customer_bp, url_prefix='/api/customers')
app.register_blueprint(product_bp, url_prefix='/api/products')
app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')

@app.route('/')
def index():
    return {"message": "Retail Analytics API running ✅"}

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')