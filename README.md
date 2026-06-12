# 📈 **Zerodha Stock Trading App Clone**

### A Full-Stack MERN Application replicating India's largest stock brokerage platform.

## Screenshots

![App Screenshot](https://github.com/user-attachments/assets/c3f7d180-fec7-4f25-b7b3-5754136bd4fe)
![App Screenshot](https://github.com/user-attachments/assets/2a23251e-466d-4503-8f16-20eb73486f1c)
![App Screenshot](https://github.com/user-attachments/assets/ec95fe7e-77bb-49f9-87f1-41cbc0530ed5)
![App Screenshot](https://github.com/user-attachments/assets/5b67fdaa-5654-4db1-95ec-c7af66385375)
![App Screenshot](https://github.com/user-attachments/assets/1ee22fc8-4e67-4b0c-8c75-ffe4b9c4635b)
![App Screenshot](https://github.com/user-attachments/assets/ca87eb56-4cfb-4299-9a5e-383d4382cb13)
![App Screenshot](https://github.com/user-attachments/assets/4a8e586d-e457-4d7e-84d4-04064d306a45)
![App Screenshot](https://github.com/user-attachments/assets/82361adb-bc70-4f99-a4bd-c2de9e6b4747)
![App Screenshot](https://github.com/user-attachments/assets/697ce793-fa52-4341-93a2-6b18f8c143a5)



## Live Demo Link: https://frontend.d2zwelb89uhnl.amplifyapp.com
## 📌 About The Project

A full-stack clone of Zerodha — India's largest discount brokerage platform — built with the MERN stack. The project is split across three branches, each representing a distinct layer of the application:

| Branch | Purpose | Deployment |
|:-------|:-------:|-----------:|
| backend-development | REST API server | Render |
| Frontend | Landing/Marketing page | AWS Amplify |
| Dashboard-development | Authenticated trading dashboard | AWS Amplify |

## 🚀 Live Deployments

| App | URL |
|:-------|:-------:|
| 🌐 Frontend (Landing Site) | https://frontend.d2zwelb89uhnl.amplifyapp.com |
| 📊 Dashboard | https://dashboard-development.d2b3b6bi15f1oq.amplifyapp.com |
| ⚙️ Backend API | https://zerodha-stock-trading-app-backend.onrender.com |

## ✨ Features
### ⚙️ Backend (backend-development branch)
 - RESTful API built with **Node.js + Express**
 - **JWT-based authentication** with **cookie-based session management**.
 - Password hashing with **bcrypt**
 - **MongoDB (ZerodhaClone Cluster)** via Mongoose with the following models & schemas:
   - Users — account credentials and profile
   - Holdings — stocks currently owned by the user
   - Positions — intraday/open positions
   - Orders — buy/sell order history
   - Stocks — stock data and metadata
- **CORS** configured for cross-origin requests between frontend apps
- Environment variables managed via **dotenv**

## 📊 Dashboard (Dashboard-development branch)
- 🗂️ **Holdings** — view current portfolio with P&L.
- 📋 **Positions** — open intraday positions overview
- 📜 **Orders** — full buy/sell order history.
- 💹 **Buy / Sell Modal** — place orders directly from the dashboard
- 📈 **Charts & Analytics** — visual stock data representations
- 💰 **Funds** — funds overview (static data)

## 🌐 Frontend (Frontend branch)
- 🏠 **Home / Landing Page** — hero section, stats, awards
- 🙋 **About Page** — company story and team
- 💸 **Pricing Page** — brokerage and fee breakdown
- 📦 **Products Page** — platform and tools showcase
- 🆘 **Support Page** — help and resources
- 🔐 **Login / Signup Pages** — authentication entry points

## 🛠️ Tech Stack
### Frontend & Dashboard
| Technology | Usage |
|:-------|:-------:|
| React19 | UI Framework |
| React Router DOM | Client-side routing |
| Axios | HTTP requests to backend API |
| Material UI/Bootstrap | UI components and styling |
| HTML5 + CSS3 | Structure and styling |

### Backend
| Technology | Usage |
|:-------|:-------:|
| Node.js | Runtime environment |
| Express.js | Web server / REST API framework |
| MongoDB + Mongoose | Database and ODM |
| JWT (jsonwebtoken) | Token based authentication |
| bcrypt | Password hashing |
| cookie-parser | Cookie-based auth sessions |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

### Devops/Deployment
| Service | Usage |
|:--------|:------:|
| AWS Amplify | Frontend + Dashboard hosting |
| Render | Backend API hosting |

## 📁 Project Structure
This project uses a **multi-branch architecture**. Each branch is a self-contained app:

````md
main
├── src/           # Base React app (CRA scaffold)
├── public/
├── package.json
└── README.md

Branches
├── backend-development
│      ├── models/      # Mongoose models
│      ├── schemas/     # Mongoose schemas
│      ├── seedStocks.js/    # Collection of stocks for watchlist
│      ├── middleware/      #JWT & cookie auth middleware
│      ├── index.js # Entry point(port 3002) & express route handlers
│      └── .env  # Environment variables
│      └── package.json
│
├── Frontend
│       ├── src/
│           ├── Landing_page/  # Navbar, Footer, Hero, About, etc
│       │   ├── test/   # Hero.test.js for testing the Hero section
│       │   └── index.js # React-router DOM & Entry point(port 3000)
│       └── package.json
│
└── Dashboard-development
        ├── src/
        │   ├── components/  # Dashboard, BuyActionWindow, Funds, Holdings, Home, Menu, Watchlist etc
        │   └── index.js  # React-router DOM which is mounting the Home component.
        └── package.json  
````

# ⚙️ Getting Started

## Prerequisites

- Node.js v16 or higher
- MongoDB Atlas account (or local MongoDB installation)
- npm
