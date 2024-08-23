Steps to Run the Application
-----------------------------

API Setup:
1. Open the `appsettings.json` file and update the connection string to point to your database instance.
2. Open the NuGet Package Manager Console and run the following command:
   Update-Database
   This will create the necessary table in your database based on the migrations.
3. Run the API project using Visual Studio or by running `dotnet run` in the terminal within the `OpezeeApi` project directory.

React Application Setup:
1. Open a terminal. Run the following command to install the necessary npm packages:
   npm install
2. Start the React application by running:
   npm start

Time Spent on Each Part
-----------------------
- Part 1: 2 hours
- Part 2: 2 hours
- Part 3: 5 hours

Methods I Tried
---------------
1. Uploading the `.exe` File Directly:
   - Initially, I attempted to upload the `.exe` file directly to the server, hoping to also capture the file path. However, due to browser security restrictions, the full file path isn't accessible, which required some troubleshooting and research.

2. Storing Shortcut Files on the Server:
   - As a workaround, I tried creating a server-side folder to store shortcut files (`.lnk and .exe`). The idea was to store these shortcuts in the database so that clicking an app in the UI would trigger the API to launch the shortcut. However, I discovered that when shortcut files are uploaded elsewhere, they lose their shortcut properties and become standard `.exe` files. This resulted in the applications not launching correctly, even though the API responded with a `200 OK`. This approach was tricky and consumed a significant portion of the 5 hours spent on this part.

3. The Final Approach:
   - The current working approach requires the user to manually select the application and copy the file path of the `.exe` file, which is then pasted into the corresponding field in the UI. This method proved to be the only reliable way to capture the file path and ensure the application launches correctly via the API.
