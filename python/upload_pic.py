#Inserting image and text file to database as BLOB
import mysql.connector

            
def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData


def insertBLOB(emp_id, name, photo):
    print("Inserting BLOB into python_employee table")
    try:
        connection = mysql.connector.connect(host='hostname',
                                             database='mydatabase',
                                             user='username',
                                             password='password')

        cursor = connection.cursor()
        sql_insert_blob_query = """ INSERT INTO python_employee
                          (id, name, photo) VALUES (%s,%s,%s)"""

        empPicture = convertToBinaryData(photo)

        # Convert data into tuple format
        insert_blob_tuple = (emp_id, name, empPicture)
        result = cursor.execute(sql_insert_blob_query, insert_blob_tuple)
        connection.commit()
        print("Image inserted successfully as a BLOB into python_employee table", result)

    except mysql.connector.Error as error:
        print("Failed inserting BLOB data into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

#insert id, name, photo
insertBLOB(1, "pic1", "..\pic_location\Img1.JPG")
insertBLOB(2, "pic2", "..\pic_location\Img2.JPG")