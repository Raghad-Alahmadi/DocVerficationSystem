# Document Verification System

This project is a Document Verification System built with Angular for the frontend and ASP.NET Core for the backend. The system allows users to upload documents, view document details, and verify documents.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload documents
- View document details
- Verify documents


## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Angular CLI](https://angular.io/cli) (v12 or higher)
- [.NET SDK](https://dotnet.microsoft.com/download) (v5.0 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or any other supported database)

## Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Raghad-Alahmadi/DocVerficationSystem.git
   cd DocVerficationSystem/DocumentVerificationBackend
   ```

2. Update the database connection string in appsettings.json:
   ```json
   "ConnectionStrings": {
   "DefaultConnection": "Server=your_server;Database=your_database;User Id=your_user;Password=your_password;"
   }
   ```

3. Run the following commands to set up the database and run the backend:
   ```bash
   dotnet restore
   dotnet ef database update
   dotnet run
   ```


1. Navigate to the frontend directory:
   ```bash
   cd ../document-management-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Update the API URL:
   ```typescript
   apiUrl: 'http://localhost:5072/api' // Update this to match your backend URL
   ```
### Backend
To run the backend, navigate to the DocumentVerificationBackend directory and run:
   ```bash
   dotnet run
   ```

### Frontend
To run the frontend, navigate to the document-management-frontend directory and run:
   ```bash
   ng serve
   ```

The frontend will be available at http://localhost:4200


## Usage
1. Open the application in your browser at http://localhost:4200.
2. Use the dashboard to upload documents, view document details, and verify documents.


