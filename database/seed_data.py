import pandas as pd
import pymysql
import os
from dotenv import load_dotenv

# Fix: load .env from root folder, not database/
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

conn = pymysql.connect(
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", 3306)),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "Pradee@2007#"),
    database=os.getenv("DB_NAME", "retail_analytics"),
    charset="utf8mb4"
)
cursor = conn.cursor()

df = pd.read_csv(
    os.path.join(os.path.dirname(__file__), "..", "Sample - Superstore.csv"),
    encoding="latin-1"
)

df.columns = df.columns.str.strip()
df["Order Date"] = pd.to_datetime(df["Order Date"], dayfirst=False)
df["Ship Date"] = pd.to_datetime(df["Ship Date"], dayfirst=False)

# --- Regions ---
for region in df["Region"].dropna().unique():
    cursor.execute("INSERT IGNORE INTO regions (region_name) VALUES (%s)", (region,))
print("Regions done")

# --- States ---
for _, row in df[["State", "Region"]].drop_duplicates().iterrows():
    cursor.execute("SELECT region_id FROM regions WHERE region_name=%s", (row["Region"],))
    region_id = cursor.fetchone()[0]
    cursor.execute("INSERT IGNORE INTO states (state_name, region_id) VALUES (%s, %s)",
                   (row["State"], region_id))
print("States done")

# --- Cities ---
for _, row in df[["City", "State"]].drop_duplicates().iterrows():
    cursor.execute("SELECT state_id FROM states WHERE state_name=%s", (row["State"],))
    result = cursor.fetchone()
    if result:
        cursor.execute("INSERT IGNORE INTO cities (city_name, state_id) VALUES (%s, %s)",
                       (row["City"], result[0]))
print("Cities done")

# --- Customers ---
for _, row in df[["Customer ID", "Customer Name", "Segment", "City", "State"]].drop_duplicates("Customer ID").iterrows():
    cursor.execute("""
        SELECT c.city_id FROM cities c
        JOIN states s ON c.state_id = s.state_id
        WHERE c.city_name=%s AND s.state_name=%s
    """, (row["City"], row["State"]))
    result = cursor.fetchone()
    city_id = result[0] if result else None
    cursor.execute("INSERT IGNORE INTO customers (customer_id, customer_name, segment, city_id) VALUES (%s, %s, %s, %s)",
                   (row["Customer ID"], row["Customer Name"], row["Segment"], city_id))
print("Customers done")

# --- Categories ---
for cat in df["Category"].dropna().unique():
    cursor.execute("INSERT IGNORE INTO categories (category_name) VALUES (%s)", (cat,))
print("Categories done")

# --- Sub Categories ---
for _, row in df[["Sub-Category", "Category"]].drop_duplicates().iterrows():
    cursor.execute("SELECT category_id FROM categories WHERE category_name=%s", (row["Category"],))
    result = cursor.fetchone()
    if result:
        cursor.execute("INSERT IGNORE INTO sub_categories (sub_category_name, category_id) VALUES (%s, %s)",
                       (row["Sub-Category"], result[0]))
print("Sub-categories done")

# --- Products ---
for _, row in df[["Product ID", "Product Name", "Sub-Category"]].drop_duplicates("Product ID").iterrows():
    cursor.execute("SELECT sub_category_id FROM sub_categories WHERE sub_category_name=%s", (row["Sub-Category"],))
    result = cursor.fetchone()
    if result:
        cursor.execute("INSERT IGNORE INTO products (product_id, product_name, sub_category_id) VALUES (%s, %s, %s)",
                       (row["Product ID"], row["Product Name"][:255], result[0]))
print("Products done")

# --- Orders ---
for _, row in df[["Order ID", "Order Date", "Ship Date", "Ship Mode", "Customer ID", "City", "State"]].drop_duplicates("Order ID").iterrows():
    cursor.execute("""
        SELECT c.city_id FROM cities c
        JOIN states s ON c.state_id = s.state_id
        WHERE c.city_name=%s AND s.state_name=%s
    """, (row["City"], row["State"]))
    result = cursor.fetchone()
    city_id = result[0] if result else None
    cursor.execute("INSERT IGNORE INTO orders (order_id, order_date, ship_date, ship_mode, customer_id, city_id) VALUES (%s, %s, %s, %s, %s, %s)",
                   (row["Order ID"], row["Order Date"].date(), row["Ship Date"].date(), row["Ship Mode"], row["Customer ID"], city_id))
print("Orders done")

# --- Order Items ---
for _, row in df.iterrows():
    cursor.execute("INSERT INTO order_items (order_id, product_id, sales, quantity, discount, profit) VALUES (%s, %s, %s, %s, %s, %s)",
                   (row["Order ID"], row["Product ID"], row["Sales"], row["Quantity"], row["Discount"], row["Profit"]))
print("Order items done")

conn.commit()
cursor.close()
conn.close()
print("Database seeded successfully!")