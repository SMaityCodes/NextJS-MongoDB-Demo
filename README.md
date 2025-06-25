# NextJS-MongoDB-Demo

## Install Prerequisite
- NextJS
- Install MongoDB using the following shell script (if not already installed):-
```bash
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🔧 Importing MongoDB public GPG key..."
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "📦 Adding MongoDB APT repository..."
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

echo "🔄 Updating package index..."
sudo apt update

echo "⬇️ Installing MongoDB packages..."
sudo apt install -y mongodb-org

echo "✅ Enabling and starting MongoDB service..."
sudo systemctl enable mongod
sudo systemctl start mongod

echo "🟢 Checking MongoDB status..."
sudo systemctl status mongod --no-pager

echo "🚀 MongoDB installation complete. You can now run 'mongosh' to connect."
```
## To Start the Database Server:-
- sudo systemctl start mongod


## Learn MongoDB Basics:-

MongoDB is a NO-SQL database which keeps data in JSON format 'documents'. A set of documents is called a 'collection'. A set of collections are maintained by an 'database'. 

- Open a terminal and type the following commands:-
  ```bash
    mongosh
    use myDB // default database
    show collections // to see all existing collections
  ```

- Create a New Collection named “products”:-
```bash
db.createCollection("products")
```

- Insert three sample entries in it:-
```bash
db.products.insertOne({name: "Laptop", price: 1000})
db.products.insertOne({name: "Mobile", price: 2000})
db.products.insertOne({name: "TV", price: 2000})
```

- See it:-
```bash
db.products.find()
```

- To Delete an Item:-
```bash
db.products.deleteOne({name: 'Laptop'})
```

- To update:-
```bash
 db.products.updateOne({name: "Laptop"},{$set: {price: 100}})
```
- Learn more from ChatGpt (if ineretsed)
  
## How to Use this Repo?

- Create a NextJS  New Project
  ```bash
  npx create-next-app@latest my-mongo-app --javascript // with all default options
  cd my-mongo-app
  npm install mongodb

  ```
- Download this repo.
- Copy all the files and folders from the app folder to your app folder
- Copy the lib folder in your project root (same level of app)
- Copt the .env.local file to your project root
- run the following commands:-

  ```bash
  npm install
  npm run dev
  ```

- the main code is written inside 'page.js' inside the 'app' folder
- the API functions are in 'route.js' inside app/api/products
  - note that this app has been dseigned for the above database where we have already created a sample 'collection' named 'products' with three (or more) sample documents as shown in the previous step.
- if you want to change the database name ('myDB') then you have to edit the '.env/local' file

