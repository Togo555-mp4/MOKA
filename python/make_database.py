import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="username",
  password="password",
  #access "mydatabase" database
  #database="mydatabase"
)
#cursor
mycursor = mydb.cursor()

#create a new database
mycursor.execute("CREATE DATABASE mydatabase")
#Create a table named "users":
mycursor.execute("CREATE TABLE users ( userid INT PRIMARY KEY, username VARCHAR(255), point int)")
#Create a table named "comments":
mycursor.execute("CREATE TABLE comments ( userid INT PRIMARY KEY, comment VARCHAR(255))")
#Create a table named "pictures":
mycursor.execute("CREATE TABLE pictures ( userid INT PRIMARY KEY, pict VARCHAR(255))")

#Listing every database in mydb
mycursor.execute("SHOW DATABASES")
for x in mycursor:
  print(x)

#Return a list of your system's databases
mycursor.execute("SHOW TABLES")
for x in mycursor:
  print(x)
