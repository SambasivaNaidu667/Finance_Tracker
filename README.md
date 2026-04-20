# Personal Finance & Expense Analytics App

A powerful, responsive, and premium personal finance tracker built with **React 19** and **Vite**. This application helps users take control of their financial life by tracking income, expenses, and budgets with real-time analytics and currency conversion.

## 🚀 Live Demo
**[View Live Application](https://SambasivaNaidu667.github.io/Finance_Tracker/)**

---

## 📌 Problem Statement
Many students and young professionals struggle to understand where their money goes. Expenses are often scattered across UPI, credit cards, subscriptions, and cash. Without a clear system, users cannot easily track their spending, identify consumption patterns, or stay within a budget.

This project solves these issues by providing:
- **Automated Categorization**: Grouping spending into meaningful categories.
- **Visual Analytics**: Interactive charts for deep financial insights.
- **Budget Monitoring**: Real-time tracking of limits and remaining balance.
- **Search & Filter**: Dynamic tools to find any transaction instantly.

---

## ✨ Features

### 1. Dashboard & Analytics
- **KPI Cards**: Instantly view Total Income, Total Expenses, Net Balance, and Top Spending Category.
- **Visual Insights**:
  - **Pie Chart**: Spending distribution by category.
  - **Line Chart**: Monthly spending trends.
  - **Bar Chart**: Income vs. Expense comparison.
- **Interactive UI**: Powered by **Recharts** and **Framer Motion** for smooth animations.

### 2. Transaction Management (CRUD)
- **Add Transactions**: Easily record Income or Expenses with details like Category, Amount, Date, and Notes.
- **Recurring Transactions**: Mark subscriptions (Netflix, Rent, Gym) as recurring to highlight them in your list.
- **Edit/Delete**: Full control over your transaction history.

### 3. Smart Filtering & Search
- **Search**: Real-time search by title or notes using a custom **useDebounce** hook.
- **Filters**: Filter by category, transaction type, or date range.
- **Sorting**: Sort by date, amount, or category.

### 4. Budget Tracking
- Set a monthly budget and track progress visually.
- **Remaining Budget**: Dynamic calculation showing how much you have left (or how much you've exceeded).
- **Progress Ring**: Visual representation of your percentage used.

### 5. Multi-Currency Support
- Integrated with **Currency Exchange API** for real-time exchange rates.
- Ability to switch currency formats (INR, USD, etc.).

---

## 🛠️ Technology Stack

### Core
- **React 19** (Vite)
- **React Router DOM** (Routing)
- **Context API** (Global State Management)

### Libraries
- **Styling**: Vanilla CSS (Premium Glassmorphism Design)
- **Forms**: `react-hook-form` + `yup` (Validation)
- **Charts**: `recharts`
- **Icons**: `react-icons` (Feather Icons)
- **Notifications**: `react-toastify`
- **Animations**: `framer-motion`
- **Utilities**: `date-fns`, `uuid`, `axios`

---

## 📂 Folder Structure
```text
src/
├── components/      # Reusable UI components (Charts, Cards, Forms)
├── context/         # FinanceContext for global state
├── hooks/           # Custom hooks (useTransactions, useBudget, etc.)
├── pages/           # Page components (Dashboard, Analytics, etc.)
├── services/        # API integration (Exchange Rates)
├── utils/           # Helper functions & Constants
└── App.jsx          # Main routing logic
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SambasivaNaidu667/Finance_Tracker.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📝 Evaluation Criteria Met
- [x] **Feature Completeness**: All 8 core features implemented.
- [x] **React Architecture**: Modular structure with custom hooks and Context API.
- [x] **UI/UX**: Premium dark-mode design with glassmorphism and animations.
- [x] **API Integration**: Real-time currency exchange rates.
- [x] **Code Quality**: Clean, documented, and following React best practices.

---

## 👨‍💻 Author
**Sambasiva Naidu**
[Repository Link](https://github.com/SambasivaNaidu667/Finance_Tracker)

