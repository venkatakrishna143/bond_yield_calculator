# Bond Yield Calculator

A **full-stack Bond Yield Calculator** built using **NestJS** for the backend and **React** for the frontend.  
This project calculates bond yields, total interest, premium/discount status, and generates a cash flow schedule.

---

## 💻 Tech Stack

- **Backend:** NestJS (TypeScript)  
- **Frontend:** React (TypeScript)  
- **HTTP Client:** Axios (frontend → backend)  
- **Styling:** CSS (simple, clean, blue/white theme)

---

## 📂 Project Structure

```

bond_yield_calculator/
│
├── backend/           → NestJS API
│   ├── src/
│   ├── package.json
│   └── ...
│
├── frontend/          → React UI
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md

````

---

## ⚙️ Features

- Calculate **Annual Coupon Payment**
- Calculate **Current Yield**
- Calculate **Yield to Maturity (YTM)**
- Detect **Premium / Discount** (trading above/below face value)
- Generate **Cash Flow Schedule** with:
  - Period
  - Payment Date
  - Coupon Payment
  - Cumulative Interest
  - Remaining Principal
- Support **Annual** and **Semi-Annual** coupon frequency

---

## 📝 Notes for Users

- **Face Value** = Capital amount of the bond  
- **Coupon Rate** = Yearly interest rate on the bond  
- **Market Price** = Current price bond is trading at  
- **Years to Maturity** = Time left until bond matures  
- **Premium / Discount**:
  - **Premium** → Market price > Face value  
  - **Discount** → Market price < Face value  

---

## 🚀 How to Run

### Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
````

* Runs backend API on: `http://localhost:3000/bond/calculate`

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

* Opens UI on: `http://localhost:3001` (or default React port)

---

## 📸 Screenshots (Optional)

*Add screenshots of your calculator here to make README more visual and professional.*

---

## ✅ Recommendations for Interview

* Understand **bond terms**: face value, coupon, market price, YTM
* Be ready to **explain calculations** in the backend
* Walkthrough **cash flow table generation**
* Show **professional UI**: results load after submission, table is visible initially, clean colors

---

## 🛠 License

This project is licensed under MIT License.
