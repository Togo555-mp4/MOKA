# Module Imports
import mysql.connector
import sys

# Connect to MariaDB Platform
conn = mysql.connector.connect(
        user="testing",
        password="",
        host="localhost",
        port=3306,
        database="moka_test"
)

# Get Cursor
cur = conn.cursor()

cur.execute(
    "SELECT * FROM users")

# Print Result-set
for row in cur:
   print(row)