import mysql.connector


def write_file(data, filename):
    # Convert binary data to proper format and write it on Hard Disk
    with open(filename, 'wb') as file:
        file.write(data)


def readBLOB(emp_id, photo):
    print("Reading BLOB data from python_employee table")

    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='mydatabase',
                                             user='username',
                                             password='password')

        cursor = connection.cursor()
        sql_fetch_blob_query = """SELECT * from python_employee where id = %s"""

        cursor.execute(sql_fetch_blob_query, (emp_id,))
        record = cursor.fetchall()
        for row in record:
            print("Id = ", row[0], )
            print("Name = ", row[1])
            image = row[2]
            print("Storing image on disk \n")
            write_file(image, photo)

    except mysql.connector.Error as error:
        print("Failed to read BLOB data from MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

#the first file destination need double backslash for some reason
readBLOB(1, "E:\Media\Pictures\\brukan_photo.jpg")
readBLOB(2, "E:\Media\Pictures\eneng2_photo.jpg")