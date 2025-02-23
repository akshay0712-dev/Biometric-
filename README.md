# **FaceLog**

## **Description**

This biometric-based attendance management system automates student attendance tracking by integrating biometric data with user records. It ensures accuracy, prevents proxy attendance, and updates attendance records in real time. Admins can securely upload attendance files, and the system automatically matches and updates user data.

## **Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/akshay0712-dev/Biometric.git
   cd Biometric 
   ```
2. Install dependencies:
   ```bash
   cd Frontend/
   npm install  # or yarn install
   cd .. 
   cd Backend/
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```plaintext
   PORT=8000
   MONGODB_URI=
   CORS_ORIGIN=*
   ACCESS_TOKEN_SECRET= Create a access token secret 
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN=Create a refreash token secret
   REFRESH_TOKEN_EXPIRY=10d
   
   Sign in to Cloudinary
   CLOUDINARY_CLOUD_NAME= Add your Clodinary name
   CLOUDINARY_API_KEY= Your CLOUDINARY API KEY
   CLOUDINARY_API_SECRET= CLOUDINARY API SECRET
   ```

---

## **Usage**

Run the Frontend:

```bash
cd Frontend/
npm run dev  
```

For Server (backend):

```bash
cd Backend/
npm run dev  
```

---

## **Features**

- ✅ **Biometric Data Processing** – Extracts attendance data from uploaded Excel sheets.  
- ✅ **User-Biometric Integration** – Matches student roll numbers to biometric records automatically.  
- ✅ **Automated Attendance Updates** – Updates user records with `totalPresentDay` and `totalWorkingDay` fields.  
- ✅ **Secure Authentication** – Ensures only authorized admins can upload and manage attendance data.  
- ✅ **RESTful API Endpoints** – Backend routes for managing users, authentication, and biometric data.  
- ✅ **Responsive Frontend Dashboard** – Allows admins to upload attendance files and track records in real time.  

---

## **API Endpoints**

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| POST   | `/api/v1/users/login`     | User login            |
| POST   | `api/v1/users/register`   | Register new user     |
| POST   | `/api/v1/biometric/upload`| Upload biometric data |

---

## **Technologies Used**

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Cloudinary
- **Authentication:** JWT
- **Encryption:** bcrypt  

---

## **Contributing**

Feel free to contribute! Fork the repo, create a branch, and submit a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

📧 Email: [akshayrishu4@gmail.com](mailto\:akshayrishu4@gmail.com)\
🔗 GitHub: [akshay0712-dev](https://github.com/akshay0712-dev)

---

