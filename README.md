## Trade Parser
  This is a Node.js application that provides an API to upload a CSV file containing cryptocurrency trade data, parses the data, and stores it in a MongoDB database.
# Prerequisites
  Node.js installed
  MongoDB Atlas account
## Installation:
  # Clone the repository:
    git clone https://github.com/your-repo/crypto-trade-api.git
    cd crypto-trade-api
  # Install dependencies:
    npm install
  ## Database Setup(Mongodb)
    # 1. Create a MongoDB Atlas Account
      Sign Up:
      Go to MongoDB Atlas.
      Sign up for an account if you don't have one. If you already have an account, log in.
    # 2. Create a New Cluster
      Create a New Cluster:
      After logging in, you'll be directed to the MongoDB Atlas dashboard.
      Click on the "Build a Cluster" button.
      Configure Cluster:
        Cloud Provider & Region: Choose your preferred cloud provider (e.g., AWS, Google Cloud, Azure) and the region closest to your location for better performance.
        Cluster Tier: Select a tier. The M0 Sandbox (Free Tier) is available if you want to start for free.
        Cluster Name: Give your cluster a name. You can leave the default name or choose a custom one.
        Create Cluster:
          Click "Create Cluster." It will take a few minutes for MongoDB to set up your cluster.
    # 3. Configure Security
      Add Your IP Address:
      Go to the "Security" section in the left-hand menu and select "Network Access."
      Click on "Add IP Address."
      You can add your current IP address, or use 0.0.0.0/0 to allow access from anywhere (not recommended for production environments).
      Create a Database User:
      Go to the "Security" section in the left-hand menu and select "Database Access."
      Click on "Add New Database User."
      Enter a username and password. You’ll use these credentials to connect to your database.
      Assign the user a role, typically "Atlas Admin" for full access.
    # 4. Connect to Your Cluster
      Get Connection String:
      Go to the "Clusters" section in the left-hand menu.
      Click on the "Connect" button for your cluster.
      Choose "Connect your application."
      Select your driver and version. For Node.js, choose the Node.js driver and version 3.6 or later.
      You'll be provided with a connection string. It looks something like this:
        mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority
      Replace it with the string on line 13.
## Usage:
# Start the server:
  node server.js
# Use an API testing tool like Postman or cURL to upload a CSV file.

## API Endpoints
# POST /upload
Upload a CSV file containing cryptocurrency trade data.
  URL: /upload
  Method: POST
  Headers: Content-Type: multipart/form-data
  Body: form-data with a key file and the CSV file as the value.
# Response
  Success: 200 OK
    Body: File successfully processed and data stored in the database.
  Failure: 400 Bad Request
    Body: No file uploaded.
  Error: 500 Internal Server Error
    Body: Error storing data in the database: <error_message>
