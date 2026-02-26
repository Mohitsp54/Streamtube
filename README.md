# Streamtube - Video Sharing Platform

Streamtube is a premium video-sharing platform built with the MERN stack. It allows users to upload, watch, and share videos in a modern and responsive interface. The project utilizes Google Cloud Storage for efficient video hosting and MongoDB for metadata management.

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Video Management**:
  - Upload videos with custom titles and descriptions.
  - Automatic thumbnail handling (uses Unsplash placeholders by default).
  - Video streaming from GCS.
- **Modern UI**: Built with React 19, Vite, and Tailwind CSS.
- **File Security**: Strictly enforced file type filters (Videos and Images) and size limits (100MB).
- **Responsive Design**: Optimized for mobile and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Storage**: Google Cloud Storage (GCS).
- **Authentication**: JWT (JSON Web Tokens).

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Streamtube
```

### 2. Server Configuration

Navigate to the `server` directory:

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GCS_BUCKET=your_bucket_name
GCS_KEY_FILE=path_to_your_gcs_key.json
```

**Note**: The frontend is configured to communicate with the backend on port `3001`. Ensure your server's `PORT` in `.env` matches this.
Also, place your Google Cloud service account key (`gcs-key.json`) in the server root or specify its path in `.env`.

### 3. Client Configuration

Navigate to the `client` directory:

```bash
cd ../client
npm install
```

### 4. Running the Application

**Start the Backend:**

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`.

**Start the Frontend:**

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`.

## 📂 Project Structure

```
Streamtube/
├── client/          # Vite + React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   └── services/    # API integration (Axios)
├── server/          # Express + Node.js Backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   └── config/      # Database & Storage setup
```

## 🛡️ API Endpoints

### Auth

- `POST /api/auth/register` - Create a new account.
- `POST /api/auth/login` - Authenticate user and receive token.

### Videos

- `GET /api/videos` - Get all uploaded videos.
- `GET /api/videos/:id` - Get details of a specific video.
- `POST /api/videos/upload` - Upload a new video (Requires Auth).

---

Developed by **Mohit**
