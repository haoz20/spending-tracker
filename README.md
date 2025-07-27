# WAD (Section#541) Project01 - Spending Tracker

## Team Members
- Swan Htet Aung
- Thiri Htet
- Kaung Myat San

## Project Description
Spending Tracker is a responsive web application designed to help users manage their personal finances. Users can track their expenses, set budgets, and visualize their spending habits through interactive charts.

## Features
- Add, edit, and delete expenses
- Set monthly budgets
- View spending trends with charts
- Responsive design for mobile and desktop

## Screenshots
![Home Page](public/vite.svg)
![Expense Tracker](src/assets/react.svg)
![Dashboard](src/assets/screenshots/dashboard.png)
![Journal](src/assets/screenshots/journal.png)

## Pages
### Page 1: Analytics Dashboard
1. The app shows the summary of spending by selecting to show one of the three options: Daily, Weekly, and Monthly, and group by spending category.
   - Total spending of all time
   ![Total Spending of all time](src/assets/screenshots/all_time_spending.png)
   - Total spending of the selected month
   ![Monthly Spending](src/assets/screenshots/monthly_spending.png)
   - Total spending of the selected week
   ![Weekly Spending](src/assets/screenshots/weekly_spending.png)
   - Total spending of the selected daily
   ![Daily Spending](src/assets/screenshots/daily_spending.png)
   - Self-Research - Line Chart of the spending (all time, selected month)
   ![Line Chart](src/assets/screenshots/line_chart.png)
   - Self-Research - Pie Chart of the spending (all time, selected month)
   ![Pie Chart](src/assets/screenshots/pie_chart.png)
2. Can save extra spending category that is not in the list.
![Add Custom](src/assets/screenshots/custom_category.png)




### Page 2: Journal
1. A spending category is in MS Teams' File section [spending-category.json].
2. This is a single user app, there is no need to authenticate.
3. The user enters a record by providing the following at least:
   - Date (no time)
   - Spending category (from the list)
   - Amount



## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/haoz20/spending-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd spending-tracker
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm run dev
   ```


