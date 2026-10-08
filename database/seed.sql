-- =============================================================================
-- HARMONY: SYNTHETIC SEED DATA SCRIPT
-- Populates Demo Household 'Green Residency' with 4 Roommates, Chores & Expenses
-- =============================================================================

-- Clear existing data if resetting
DELETE FROM expense_splits;
DELETE FROM expenses;
DELETE FROM tasks;
DELETE FROM household_members;
DELETE FROM households;
DELETE FROM profiles;

-- 1. Insert 4 Demo Roommate Profiles
INSERT INTO profiles (id, email, full_name, role) VALUES
('a0000000-0000-0000-0000-000000000001', 'lakshya@harmony.app', 'Lakshya Sharma', 'admin'),
('a0000000-0000-0000-0000-000000000002', 'rahul@harmony.app', 'Rahul Verma', 'member'),
('a0000000-0000-0000-0000-000000000003', 'aman@harmony.app', 'Aman Gupta', 'member'),
('a0000000-0000-0000-0000-000000000004', 'rohit@harmony.app', 'Rohit Kumar', 'member');

-- 2. Insert 1 Demo Household (Green Residency, Invite Code: GRN101)
INSERT INTO households (id, name, invite_code, created_by) VALUES
('b0000000-0000-0000-0000-000000000001', 'Green Residency (Flat 402)', 'GRN101', 'a0000000-0000-0000-0000-000000000001');

-- 3. Associate all 4 Roommates with Green Residency
INSERT INTO household_members (household_id, user_id, role) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'admin'),
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'member'),
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'member'),
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'member');

-- 4. Insert 12 Chores (8 Completed, 4 Pending)
INSERT INTO tasks (id, household_id, title, description, category, points, assigned_to, completed_by, status, due_date) VALUES
-- Completed Chores (Provides immediate chart data)
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Deep Clean Kitchen Counters', 'Wiped down gas stove and sanitised granite top', 'Kitchen', 25, 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'COMPLETED', CURRENT_DATE - 3),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Living Room Vacuuming & Mopping', 'Vacuumed sofa and mopped common hall floor', 'Cleaning', 30, 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'COMPLETED', CURRENT_DATE - 2),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Weekly Grocery Supply Run', 'Bought milk, bread, eggs, cooking oil, spices', 'Groceries', 20, 'a0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'COMPLETED', CURRENT_DATE - 2),
('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Dispose Garbage & Segregate Waste', 'Emptied dry and wet waste bins to municipal van', 'Cleaning', 15, 'a0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'COMPLETED', CURRENT_DATE - 1),
('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'Bathroom Sanitisation (Common)', 'Scrubbed shower tiles, sink, and mirror', 'Cleaning', 35, 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'COMPLETED', CURRENT_DATE - 1),
('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'Refill Drinking Water Dispensers', 'Fetched 2x 20L water cans from society filter', 'Maintenance', 20, 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'COMPLETED', CURRENT_DATE),
('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 'Wash Cooking Vessels & Utensils', 'Cleaned dinner pots and breakfast pans', 'Kitchen', 20, 'a0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'COMPLETED', CURRENT_DATE),
('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'Clean Refrigerator Shelves', 'Disposed expired food containers and wiped trays', 'Kitchen', 25, 'a0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'COMPLETED', CURRENT_DATE),

-- Pending Chores (For live demonstration interaction)
('c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 'Restock Toiletries & Detergent', 'Purchase handwash, floor disinfectant, dish bar', 'Groceries', 15, 'a0000000-0000-0000-0000-000000000001', NULL, 'PENDING', CURRENT_DATE + 1),
('c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000001', 'Balcony Sweep & Plant Watering', 'Sweep dry leaves and water 6 flower pots', 'Cleaning', 15, 'a0000000-0000-0000-0000-000000000002', NULL, 'PENDING', CURRENT_DATE + 2),
('c0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000001', 'AC Filter Cleaning', 'Remove dust mesh from master and hall air conditioners', 'Maintenance', 30, 'a0000000-0000-0000-0000-000000000003', NULL, 'PENDING', CURRENT_DATE + 3),
('c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001', 'Sort Monthly Newspaper & Cardboard', 'Tie bundle and sell to local scrap vendor', 'Maintenance', 20, 'a0000000-0000-0000-0000-000000000004', NULL, 'PENDING', CURRENT_DATE + 4);

-- 5. Insert 5 Shared Expenses (Total: ₹9,800)
-- Expense 1: ₹2,400 Electricity Bill paid by Lakshya (split 4 ways = ₹600 each)
INSERT INTO expenses (id, household_id, paid_by, description, amount, category, expense_date) VALUES
('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'September Electricity Bill', 2400.00, 'Utilities', CURRENT_DATE - 5);

INSERT INTO expense_splits (expense_id, user_id, share_amount) VALUES
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 600.00),
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 600.00),
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 600.00),
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 600.00);

-- Expense 2: ₹1,200 High Speed Wi-Fi Fiber paid by Rahul (split 4 ways = ₹300 each)
INSERT INTO expenses (id, household_id, paid_by, description, amount, category, expense_date) VALUES
('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Airtel Xstream Fiber (300 Mbps)', 1200.00, 'Internet', CURRENT_DATE - 4);

INSERT INTO expense_splits (expense_id, user_id, share_amount) VALUES
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 300.00),
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 300.00),
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 300.00),
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 300.00);

-- Expense 3: ₹3,600 Monthly Ration & Groceries paid by Aman (split 4 ways = ₹900 each)
INSERT INTO expenses (id, household_id, paid_by, description, amount, category, expense_date) VALUES
('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'Blinkit Superstore Bulk Ration', 3600.00, 'Food', CURRENT_DATE - 3);

INSERT INTO expense_splits (expense_id, user_id, share_amount) VALUES
('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 900.00),
('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 900.00),
('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 900.00),
('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 900.00);

-- Expense 4: ₹1,100 Cooking Gas Cylinder (HP Gas) paid by Rohit (split 4 ways = ₹275 each)
INSERT INTO expenses (id, household_id, paid_by, description, amount, category, expense_date) VALUES
('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'HP Gas Cylinder Refill', 1100.00, 'Utilities', CURRENT_DATE - 2);

INSERT INTO expense_splits (expense_id, user_id, share_amount) VALUES
('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 275.00),
('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 275.00),
('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', 275.00),
('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 275.00);

-- Expense 5: ₹1,500 Cleaning Supplies & RO Water Filter Service paid by Lakshya (split 4 ways = ₹375 each)
INSERT INTO expenses (id, household_id, paid_by, description, amount, category, expense_date) VALUES
('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Urban Company RO Service & Floor Detergent', 1500.00, 'Supplies', CURRENT_DATE - 1);

INSERT INTO expense_splits (expense_id, user_id, share_amount) VALUES
('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 375.00),
('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 375.00),
('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', 375.00),
('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000004', 375.00);
