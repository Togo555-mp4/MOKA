# Module Imports
import mariadb
import sys

# Connect to MariaDB Platform
def connectMariadb(sqlText):
    try:
        conn = mariadb.connect(
            user="testing",
            password="",
            host="localhost",
            port=3306,
            database="moka_test"

        )
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)

    # Get Cursor
    cur = conn.cursor()

    cur.execute(sqlText)

    # Print Result-set
    for row in cur:
        print(row)