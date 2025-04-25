type Transactions = {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: "Debit" | "Credit";
};

export const sampleTransactions: Transactions[] = [
  {
    id: 1,
    amount: 45.75,
    date: "2025-04-01",
    description: "Groceries",
    type: "Debit",
  },
  {
    id: 2,
    amount: 1200.0,
    date: "2025-04-02",
    description: "Salary",
    type: "Credit",
  },
  {
    id: 3,
    amount: 60.0,
    date: "2025-04-03",
    description: "Electricity Bill",
    type: "Debit",
  },
  {
    id: 4,
    amount: 25.0,
    date: "2025-04-04",
    description: "Coffee",
    type: "Debit",
  },
  {
    id: 5,
    amount: 200.0,
    date: "2025-04-05",
    description: "Freelance Project",
    type: "Credit",
  },
  {
    id: 6,
    amount: 15.0,
    date: "2025-04-06",
    description: "Spotify Subscription",
    type: "Debit",
  },
  {
    id: 7,
    amount: 90.0,
    date: "2025-04-07",
    description: "Gas Refill",
    type: "Debit",
  },
  {
    id: 8,
    amount: 300.0,
    date: "2025-04-08",
    description: "Refund",
    type: "Credit",
  },
  {
    id: 9,
    amount: 80.0,
    date: "2025-04-09",
    description: "Online Shopping",
    type: "Debit",
  },
  {
    id: 10,
    amount: 100.0,
    date: "2025-04-10",
    description: "Bonus",
    type: "Credit",
  },
  {
    id: 11,
    amount: 18.5,
    date: "2025-04-11",
    description: "Lunch",
    type: "Debit",
  },
  {
    id: 12,
    amount: 75.0,
    date: "2025-04-12",
    description: "Book Purchase",
    type: "Debit",
  },
  {
    id: 13,
    amount: 500.0,
    date: "2025-04-13",
    description: "Tax Refund",
    type: "Credit",
  },
  {
    id: 14,
    amount: 39.99,
    date: "2025-04-14",
    description: "Movie Tickets",
    type: "Debit",
  },
  {
    id: 15,
    amount: 60.0,
    date: "2025-04-15",
    description: "Gym Membership",
    type: "Debit",
  },
  {
    id: 16,
    amount: 950.0,
    date: "2025-04-16",
    description: "Monthly Salary",
    type: "Credit",
  },
  {
    id: 17,
    amount: 20.0,
    date: "2025-04-17",
    description: "Taxi",
    type: "Debit",
  },
  {
    id: 18,
    amount: 10.0,
    date: "2025-04-18",
    description: "App Purchase",
    type: "Debit",
  },
  {
    id: 19,
    amount: 35.0,
    date: "2025-04-19",
    description: "Dinner",
    type: "Debit",
  },
  {
    id: 20,
    amount: 100.0,
    date: "2025-04-20",
    description: "Cashback",
    type: "Credit",
  },
];
