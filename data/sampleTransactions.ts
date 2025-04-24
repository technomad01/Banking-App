type Transactions = {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
};

export const sampleTransactions: Transactions[] = [
  {
    id: 1,
    amount: 45.75,
    date: "2025-04-01",
    description: "Groceries",
    type: "debit",
  },
  {
    id: 2,
    amount: 1200.0,
    date: "2025-04-02",
    description: "Salary",
    type: "credit",
  },
  {
    id: 3,
    amount: 60.0,
    date: "2025-04-03",
    description: "Electricity Bill",
    type: "debit",
  },
  {
    id: 4,
    amount: 25.0,
    date: "2025-04-04",
    description: "Coffee",
    type: "debit",
  },
  {
    id: 5,
    amount: 200.0,
    date: "2025-04-05",
    description: "Freelance Project",
    type: "credit",
  },
  {
    id: 6,
    amount: 15.0,
    date: "2025-04-06",
    description: "Spotify Subscription",
    type: "debit",
  },
  {
    id: 7,
    amount: 90.0,
    date: "2025-04-07",
    description: "Gas Refill",
    type: "debit",
  },
  {
    id: 8,
    amount: 300.0,
    date: "2025-04-08",
    description: "Refund",
    type: "credit",
  },
  {
    id: 9,
    amount: 80.0,
    date: "2025-04-09",
    description: "Online Shopping",
    type: "debit",
  },
  {
    id: 10,
    amount: 100.0,
    date: "2025-04-10",
    description: "Bonus",
    type: "credit",
  },
  {
    id: 11,
    amount: 18.5,
    date: "2025-04-11",
    description: "Lunch",
    type: "debit",
  },
  {
    id: 12,
    amount: 75.0,
    date: "2025-04-12",
    description: "Book Purchase",
    type: "debit",
  },
  {
    id: 13,
    amount: 500.0,
    date: "2025-04-13",
    description: "Tax Refund",
    type: "credit",
  },
  {
    id: 14,
    amount: 39.99,
    date: "2025-04-14",
    description: "Movie Tickets",
    type: "debit",
  },
  {
    id: 15,
    amount: 60.0,
    date: "2025-04-15",
    description: "Gym Membership",
    type: "debit",
  },
  {
    id: 16,
    amount: 950.0,
    date: "2025-04-16",
    description: "Monthly Salary",
    type: "credit",
  },
  {
    id: 17,
    amount: 20.0,
    date: "2025-04-17",
    description: "Taxi",
    type: "debit",
  },
  {
    id: 18,
    amount: 10.0,
    date: "2025-04-18",
    description: "App Purchase",
    type: "debit",
  },
  {
    id: 19,
    amount: 35.0,
    date: "2025-04-19",
    description: "Dinner",
    type: "debit",
  },
  {
    id: 20,
    amount: 100.0,
    date: "2025-04-20",
    description: "Cashback",
    type: "credit",
  },
];
