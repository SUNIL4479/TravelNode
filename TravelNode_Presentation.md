# 🌍 TravelNode
### **AI-Powered Smart Travel & Tour Management Platform**
**MERN Stack | Google Gemini AI | Google Maps**

---

## 📋 Table of Contents

1. Introduction
2. Problem Statement
3. Objectives
4. Technologies Used
5. Modules Overview
6. Features
7. Results and Performance
8. AI Based Trip Planning
9. Language Mediator (Translation System)
10. Conclusion
11. Motivation

---

## 🧭 Introduction

- Full-stack travel platform built on **MERN Stack**
- **Google Gemini AI** for personalized trip itinerary generation
- **Language Mediator System** — marketplace of multilingual guides for bookings
- **Three user roles** — Traveler, Mediator, Admin with dedicated dashboards
- **Two-way Customer Support chat** + automated email notifications

---

## ❗ Problem Statement

- **Language Barriers** — travelers can't communicate with locals/guides abroad
- **Manual Trip Planning** — hours spent researching, budgeting, building itineraries
- **Fragmented Booking** — tour search, booking, payment, support scattered across platforms
- **No Real-Time Support** — most platforms only offer one-way contact forms
- **No Business Intelligence** — operators lack dashboards for revenue and booking trends

---

## 🎯 Objectives

- Build **end-to-end travel platform** — discovery, booking, payment, support in one app
- Integrate **AI trip planning** via Gemini AI for budget-aware itineraries
- Implement **Language Mediator management** — admin-controlled multilingual guide system
- Create **two-way support chat** with threads, file sharing, ticket management
- Develop **role-based dashboards** with analytics for Users, Mediators, Admins
- Ensure **secure payment workflows** with proof upload and admin verification

---

## ⚙️ Technologies Used

- **Frontend** — React 18, Vite, TailwindCSS, React Router v6, Recharts, Swiper.js, Google Maps API
- **Backend** — Node.js, Express.js, MongoDB/Mongoose, JWT, bcryptjs, Multer, Nodemailer
- **AI & APIs** — Google Gemini AI, Unsplash API, Cloudinary
- **Architecture** — RESTful API, 40+ endpoints, 12 route modules, 10 MongoDB collections
- **Security** — JWT auth, bcrypt hashing, role-based route protection, OTP email verification

---

## 📦 Modules Overview

- **Authentication** — Registration, JWT login, password hashing, OTP reset, role-based protection
- **Tour & Booking** — CRUD tours, auto-image fetch, search/filter, booking with mediator assignment
- **Payment** — Proof upload, admin verify/reject, transaction tracking, auto status sync
- **Language Mediator** — Profile management, admin promote/demote, availability toggle, 95/5 revenue split
- **Customer Support** — Thread-based chat, 10s polling, file attachments (10MB), ticket management, user blocking
- **Analytics & Email** — Revenue/trend dashboards, mediator earnings, newsletter system, automated OTP/welcome emails

---

## ✨ Features

- **User** — Browse/search tours, Google Maps view, AI trip plans, book with mediator, upload payment, support chat
- **Admin** — CRUD tours with auto-images, verify payments, manage reviews/mediators, revenue analytics, support management
- **Mediator** — Dashboard with bookings, profile management, availability toggle, earnings analytics
- **AI** — Day-by-day itinerary, budget pie chart, accommodation picks, weather forecast, Unsplash images
- **Communication** — Threaded support chat, file sharing, newsletter emails, OTP & welcome emails

---

## 📈 Results and Performance

- **API Speed** — CRUD under 200ms, AI generation 3–8s, image fetch under 1s
- **Scale** — 10 DB models, 40+ endpoints, 12 controllers, 18+ pages, 12 admin panels
- **Unified Experience** — discover, plan, book, pay, communicate — all in one platform
- **AI Accuracy** — Structured JSON output, retry logic, budget validation
- **Business Intelligence** — Revenue tracking, booking trends, tour rankings, mediator leaderboards

---

## 🤖 AI Based Trip Planning

- **Input** — Destination, dates, group size, travel style, budget (auto-calculated)
- **Engine** — Gemini AI generates structured JSON with itinerary, budget, weather, recommendations
- **Output** — Day-wise activities (morning/afternoon/evening), costs, weather, accommodation
- **Visualization** — Budget pie chart, Unsplash images, premium card-based UI
- **Reliability** — 2 retries, regex JSON extraction, field validation, graceful error handling

---

## 🗣️ Language Mediator (Translation System)

- **Purpose** — Solves language barriers with managed multilingual guide marketplace
- **Profile** — Languages, bio, experience, certifications, hourly rate, ratings, availability
- **Admin Control** — Promote/demote users, configure rates, assign to bookings, toggle availability
- **Revenue** — Cost = Rate × Hours; split 95% mediator / 5% platform
- **User Side** — Browse mediators by language, view profiles/ratings, see assigned mediator on booking
- **Analytics** — Net earnings, platform fees, monthly trends, trip stats

---

## 🏁 Conclusion

- **Eliminates language barriers** through managed Mediator system
- **AI Trip Planner** generates itineraries in seconds — replaces hours of manual research
- **Unified workflow** — discovery → planning → booking → payment → support in one app
- **Role-based dashboards** with analytics for admins, mediators, and users
- **Future scope** — WebSocket chat, Razorpay/Stripe, React Native app, multi-language UI, AI recommendations

---

## 💡 Motivation

- **Language shouldn't be a barrier** — human guidance beats translation apps
- **Planning should be effortless** — AI generates itineraries in seconds
- **Tech should connect, not complicate** — one platform for everything
- **Data drives better decisions** — visual analytics for operators
- **Academic meets Practical** — MERN, REST, AI, RBAC in a deployable product

---

### 📌 Project Summary

| Aspect | Detail |
|--------|--------|
| **Project Name** | TravelNode |
| **Architecture** | MERN Stack (MongoDB, Express, React, Node.js) |
| **AI Engine** | Google Gemini AI (gemini-3-flash-preview) |
| **Frontend** | Vite + React 18 + TailwindCSS |
| **Database** | MongoDB (10 collections) |
| **Authentication** | JWT + bcryptjs + OTP Email |
| **External APIs** | Gemini AI, Unsplash, Google Maps, Nodemailer |
| **User Roles** | User, Admin, Mediator |
| **Key Innovation** | AI Trip Planning + Language Mediator System |

---

*Built with ❤️ using the MERN Stack*
