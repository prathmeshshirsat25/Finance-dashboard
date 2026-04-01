# FinDash - Premium Finance Dashboard

A clean, interactive, and responsive finance dashboard built with **React** and **Vite**. This dashboard allows users to track their financial activity, visualize spending trends, and manage transactions with a role-based UI.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation
1. Navigate to the project directory:
   ```bash
   cd finance_dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## ✨ Key Features

### 1. Dashboard Overview
- **Summary Cards**: Real-time calculation of Total Balance, Income, and Expenses.
- **Trend Visualization**: Interactive `AreaChart` (Recharts) showing balance over time.
- **Spending Breakdown**: `PieChart` showing expenses categorized by type.

### 2. Transaction Management
- Search and filter transactions by category and type.
- View detailed transaction history in a clean, interactive table.
- **Admin Actions**: Admins can add new transactions and delete existing ones.

### 3. Role-Based UI (RBAC Simulation)
- Switch between **Admin** and **Viewer** roles using the sidebar toggle.
- **Admin**: Full access (Add/Delete transactions).
- **Viewer**: Read-only access (Cannot add or delete entries).

### 4. Smart Insights
- Dynamically calculated insights:
  - **Highest Spending Category**: Identifies where most money is going.
  - **Savings Rate**: Calculates the percentage of income saved this month.
  - **Budget Status**: Friendly reminders on budget adherence.

### 5. UI/UX Excellence
- **Premium Aesthetics**: Glassmorphism effects, vibrant gradients, and a sleek dark mode.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- **Micro-Animations**: Smooth entry transitions and interactive feedback using `Framer Motion`.

## 🛠️ Technology Stack
- **Framework**: React (Vite)
- **State Management**: Zustand (with Persistence)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS (CSS Variables)

## 📁 Project Structure
- `src/components`: Reusable UI components (Sidebar, Dashboard, TransactionList, Modal).
- `src/store`: Application state and logic (Zustand).
- `src/styles`: Global CSS and design tokens.
- `src/data`: Mock data for demonstration.

---
*Built for the Finance Dashboard UI Assessment.*
