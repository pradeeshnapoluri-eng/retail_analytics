# retail_analytics
# 🛍️ Retail Analytics Dashboard

A full-stack Retail Analytics Dashboard built using **React, Flask, and MySQL** to analyze retail sales data from the Superstore dataset. The project provides interactive insights into sales performance, customers, products, and inventory through a modern dashboard.

---

## 🚀 Features

- 📊 Sales Overview and Analytics
- 👥 Customer Insights
- 🛒 Product Performance Analysis
- 📦 Inventory Tracking
- 📈 Dashboard KPIs and Visualizations
- 🔍 Category and Region-wise Sales Analysis
- 🗄️ MySQL Database Integration
- ⚡ REST API using Flask
- 🎨 Modern React + Vite Frontend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Recharts
- React Router DOM

### Backend
- Flask
- Flask-CORS
- PyMySQL
- Python Dotenv

### Database
- MySQL

### Dataset
- Sample Superstore Dataset

---

## 📂 Project Structure

```text
retail_analytics/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── utils/
│
├── database/
│   ├── schema.sql
│   └── seed_data.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── requirements.txt
└── .env
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pradeeshnapoluri-eng/retail_analytics.git
cd retail_analytics
```

---

### 2️⃣ Create Virtual Environment

```bash
python -m venv .venv
.venv\Scripts\activate
```

---

### 3️⃣ Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Setup MySQL Database

Create a database named:

```sql
CREATE DATABASE retail_analytics;
```

Run schema:

```bash
SOURCE database/schema.sql;
```

Seed data:

```bash
python database/seed_data.py
```

---

### 5️⃣ Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=retail_analytics

FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=1
```

---

### 6️⃣ Run Backend

```bash
cd backend
python app.py
```

Backend runs at:

```text
http://127.0.0.1:5000
```

---

### 7️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 📊 Dashboard Modules

- Dashboard KPIs
- Sales Analytics
- Customer Analytics
- Product Analytics
- Inventory Analytics
- Forecasting Module

---

## 📸 Screenshots

> Add your project screenshots here.

---

## 🎯 Learning Outcomes

- Full Stack Development
- REST API Development
- Database Design and SQL
- Data Processing and ETL
- React Dashboard Development
- Backend-Frontend Integration
- Git and GitHub Workflow

---

## 👩‍💻 Author

**Pradeeshna Poluri**

- GitHub: https://github.com/pradeeshnapoluri-eng
- LinkedIn: https://www.linkedin.com/in/pradeeshna-poluri-447b83339/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BzAuQhPJsS86H2tA1NWgKfQ%3D%3D
  

---

## ⭐ If you found this project useful, please give it a star!
