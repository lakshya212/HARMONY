import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs("diagrams", exist_ok=True)
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Helvetica']

def save_fig(fig, filename):
    filepath = os.path.join("diagrams", filename)
    fig.savefig(filepath, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Generated UI Wireframe: {filepath}")

# ==============================================================================
# UI 1: LANDING PAGE MOCKUP
# ==============================================================================
def create_ui_landing():
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Browser window outline
    browser = patches.FancyBboxPatch((2, 2), 96, 96, boxstyle="round,pad=1.0", facecolor="#f8fafc", edgecolor="#cbd5e1", linewidth=2)
    ax.add_patch(browser)
    # Browser header bar
    header = patches.Rectangle((2, 91), 96, 7, facecolor="#e2e8f0")
    ax.add_patch(header)
    for c_x, col in [(6, "#ef4444"), (9, "#f59e0b"), (12, "#10b981")]:
        ax.add_patch(patches.Circle((c_x, 94.5), 1.2, facecolor=col))
    # URL bar
    ax.add_patch(patches.FancyBboxPatch((20, 92), 60, 5, boxstyle="round,pad=0.5", facecolor="#ffffff", edgecolor="#cbd5e1", lw=1))
    ax.text(50, 94.5, "https://harmony-living.vercel.app/", ha='center', va='center', fontsize=8, color='#64748b', fontfamily='monospace')

    # App Navbar
    ax.add_patch(patches.Rectangle((4, 82), 92, 7, facecolor="#ffffff", edgecolor="#e2e8f0", lw=1))
    ax.text(8, 85.5, "HARMONY.", fontsize=11, fontweight='bold', color='#1d4ed8')
    ax.text(68, 85.5, "Live Demo", fontsize=8.5, fontweight='bold', color='#475569')
    # Sign In Button
    ax.add_patch(patches.FancyBboxPatch((80, 83.5), 14, 4.2, boxstyle="round,pad=0.3", facecolor="#2563eb"))
    ax.text(87, 85.6, "Sign In", ha='center', va='center', fontsize=8, fontweight='bold', color='#ffffff')

    # Hero Banner
    ax.add_patch(patches.FancyBboxPatch((28, 73), 44, 4, boxstyle="round,pad=0.3", facecolor="#eff6ff", edgecolor="#bfdbfe", lw=1))
    ax.text(50, 75, "BCA 5TH SEMESTER MINOR PROJECT (BCA-508)", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1d4ed8')

    ax.text(50, 66, "Shared Living Without The Drama.", ha='center', va='center', fontsize=16, fontweight='bold', color='#0f172a')
    ax.text(50, 60, "An integrated full-stack web platform for flatmates to track household chores,\nautomate equal expense splitting, and maintain living harmony.", ha='center', va='center', fontsize=8.5, color='#475569')

    # CTA Buttons
    ax.add_patch(patches.FancyBboxPatch((28, 49), 20, 5.5, boxstyle="round,pad=0.4", facecolor="#2563eb"))
    ax.text(38, 51.7, "Launch Dashboard →", ha='center', va='center', fontsize=8, fontweight='bold', color='#ffffff')

    ax.add_patch(patches.FancyBboxPatch((52, 49), 20, 5.5, boxstyle="round,pad=0.4", facecolor="#ffffff", edgecolor="#cbd5e1", lw=1.2))
    ax.text(62, 51.7, "Explore Chores", ha='center', va='center', fontsize=8, fontweight='bold', color='#334155')

    # Feature Cards
    f_cards = [
        (8, 12, 26, 30, "Gamified Chore Tracking", "Points-based task rotation,\nfair allocation, and effort\nleaderboards.", "#eff6ff", "#3b82f6"),
        (37, 12, 26, 30, "Algorithmic Bill Splitting", "Automated T / N equal\nsplits with net debt balances\nand ledger tracking.", "#f0fdf4", "#22c55e"),
        (66, 12, 26, 30, "Transparent Analytics", "Recharts interactive visuals,\nmember accountability, and\naudit logging.", "#faf5ff", "#a855f7")
    ]
    for x, y, w, h, title, desc, fc, ec in f_cards:
        card = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", facecolor=fc, edgecolor=ec, lw=1.5)
        ax.add_patch(card)
        ax.text(x + w/2, y + 23, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1e293b')
        ax.text(x + w/2, y + 12, desc, ha='center', va='center', fontsize=7.5, color='#475569')

    save_fig(fig, "ui_landing.png")

# ==============================================================================
# UI 2: LOGIN / REGISTER MODAL MOCKUP
# ==============================================================================
def create_ui_login():
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Background
    bg = patches.Rectangle((0, 0), 100, 100, facecolor="#f1f5f9")
    ax.add_patch(bg)

    # Centered Modal Box
    card = patches.FancyBboxPatch((25, 6), 50, 88, boxstyle="round,pad=1.2", facecolor="#ffffff", edgecolor="#cbd5e1", linewidth=2)
    ax.add_patch(card)

    # Logo & Title
    ax.add_patch(patches.FancyBboxPatch((46, 80), 8, 8, boxstyle="round,pad=0.3", facecolor="#2563eb"))
    ax.text(50, 84, "⚡", ha='center', va='center', fontsize=12, color='#ffffff')
    ax.text(50, 75, "Sign in to your household", ha='center', va='center', fontsize=12, fontweight='bold', color='#0f172a')
    ax.text(50, 71, "Or create a new household flat", ha='center', va='center', fontsize=7.5, color='#64748b')

    # Form Fields
    # Field 1: Email
    ax.text(29, 65, "College Email Address", fontsize=7.5, fontweight='bold', color='#334155')
    ax.add_patch(patches.FancyBboxPatch((29, 58), 42, 5.5, boxstyle="round,pad=0.3", facecolor="#f8fafc", edgecolor="#cbd5e1", lw=1))
    ax.text(32, 60.7, "lakshya@imsnoida.com", fontsize=8, color='#0f172a')

    # Field 2: Password
    ax.text(29, 54, "Password", fontsize=7.5, fontweight='bold', color='#334155')
    ax.add_patch(patches.FancyBboxPatch((29, 47), 42, 5.5, boxstyle="round,pad=0.3", facecolor="#f8fafc", edgecolor="#cbd5e1", lw=1))
    ax.text(32, 49.7, "••••••••••••", fontsize=8, color='#0f172a')

    # Submit Button
    ax.add_patch(patches.FancyBboxPatch((29, 38), 42, 6, boxstyle="round,pad=0.4", facecolor="#2563eb"))
    ax.text(50, 41, "Sign In →", ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')

    # Separator
    ax.plot([30, 70], [33, 33], color="#e2e8f0", lw=1)
    ax.text(50, 31, "⚡ 1-Click Demo Profiles (For Viva Evaluation)", ha='center', va='center', fontsize=7, fontweight='bold', color='#64748b')

    # 4 Quick Login Profiles
    profiles = [
        (29, 21, 20, 8, "Lakshya (Admin)\nlakshya@imsnoida.com"),
        (51, 21, 20, 8, "Rahul (Member)\nrahul@imsnoida.com"),
        (29, 11, 20, 8, "Aman (Member)\naman@imsnoida.com"),
        (51, 11, 20, 8, "Rohit (Member)\nrohit@imsnoida.com")
    ]
    for px, py, pw, ph, text in profiles:
        p_box = patches.FancyBboxPatch((px, py), pw, ph, boxstyle="round,pad=0.3", facecolor="#f8fafc", edgecolor="#94a3b8", lw=1)
        ax.add_patch(p_box)
        ax.text(px + pw/2, py + ph/2, text, ha='center', va='center', fontsize=6.8, fontweight='bold', color='#1e293b')

    save_fig(fig, "ui_login.png")

# ==============================================================================
# UI 3: MAIN DASHBOARD MOCKUP
# ==============================================================================
def create_ui_dashboard():
    fig, ax = plt.subplots(figsize=(10, 7))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Browser background
    ax.add_patch(patches.Rectangle((0, 0), 100, 100, facecolor="#f8fafc"))

    # Navbar
    ax.add_patch(patches.Rectangle((0, 91), 100, 9, facecolor="#ffffff", edgecolor="#e2e8f0", lw=1))
    ax.text(4, 95.5, "HARMONY.", fontsize=12, fontweight='bold', color='#1d4ed8')
    ax.add_patch(patches.FancyBboxPatch((18, 93.5), 24, 4.5, boxstyle="round,pad=0.3", facecolor="#f1f5f9", edgecolor="#cbd5e1", lw=1))
    ax.text(30, 95.7, "Green Residency (Code: GRN101)", ha='center', va='center', fontsize=6.8, fontweight='bold', color='#334155')

    # Nav links
    ax.text(50, 95.5, "Dashboard   Chores   Expenses   Admin", fontsize=8, fontweight='bold', color='#475569')
    # Current User badge
    ax.add_patch(patches.FancyBboxPatch((80, 93), 16, 5, boxstyle="round,pad=0.3", facecolor="#eff6ff", edgecolor="#93c5fd", lw=1))
    ax.text(88, 95.5, "Lakshya (Admin)", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1d4ed8')

    # Welcome Banner & Action Buttons
    ax.text(4, 85, "Welcome back, Lakshya!", fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(4, 82, "Household is well balanced. You are owed ₹1,450.00 across shared bills.", fontsize=8, color='#64748b')

    ax.add_patch(patches.FancyBboxPatch((70, 81), 12, 6, boxstyle="round,pad=0.3", facecolor="#2563eb"))
    ax.text(76, 84, "+ Add Chore", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#ffffff')

    ax.add_patch(patches.FancyBboxPatch((84, 81), 12, 6, boxstyle="round,pad=0.3", facecolor="#059669"))
    ax.text(90, 84, "+ Log Expense", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#ffffff')

    # 4 KPI Cards
    kpis = [
        (4, 67, 21, 11, "Pending Chores", "4 Tasks", "#eff6ff", "#3b82f6"),
        (28, 67, 21, 11, "Completed Chores", "8 Tasks", "#f0fdf4", "#16a34a"),
        (52, 67, 21, 11, "Total Monthly Bills", "₹9,800.00", "#faf5ff", "#9333ea"),
        (76, 67, 20, 11, "Your Net Balance", "+₹1,450.00", "#ecfdf5", "#059669")
    ]
    for x, y, w, h, label, val, fc, ec in kpis:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.5", facecolor=fc, edgecolor=ec, lw=1.5))
        ax.text(x + w/2, y + 8, label, ha='center', va='center', fontsize=7.2, color='#475569')
        ax.text(x + w/2, y + 3.5, val, ha='center', va='center', fontsize=10, fontweight='bold', color='#0f172a')

    # Left Analytics Card: Chore Points Bar Chart
    ax.add_patch(patches.FancyBboxPatch((4, 18), 45, 46, boxstyle="round,pad=0.8", facecolor="#ffffff", edgecolor="#e2e8f0", lw=1.5))
    ax.text(6, 60, "Chore Effort Distribution (Points)", fontsize=9, fontweight='bold', color='#0f172a')

    # Simulated Bar Chart
    bars = [
        (8, 24, 7, 30, "Lakshya\n60 pts", "#3b82f6"),
        (19, 24, 7, 25, "Rahul\n50 pts", "#10b981"),
        (30, 24, 7, 20, "Aman\n40 pts", "#f59e0b"),
        (41, 24, 7, 20, "Rohit\n40 pts", "#8b5cf6")
    ]
    for bx, by, bw, bh, btxt, bcol in bars:
        ax.add_patch(patches.Rectangle((bx, by), bw, bh, facecolor=bcol, edgecolor="#cbd5e1", lw=0.5))
        ax.text(bx + bw/2, by - 4, btxt, ha='center', va='center', fontsize=6.8, fontweight='bold', color='#334155')

    # Right Analytics Card: Net Balances Ledger
    ax.add_patch(patches.FancyBboxPatch((52, 18), 44, 46, boxstyle="round,pad=0.8", facecolor="#ffffff", edgecolor="#e2e8f0", lw=1.5))
    ax.text(54, 60, "Shared Expenses Financial Ledger", fontsize=9, fontweight='bold', color='#0f172a')

    # Table rows
    t_rows = [
        ("Lakshya Shukla", "Paid ₹3,900", "+₹1,450.00", "#059669"),
        ("Rahul Verma", "Paid ₹1,200", "-₹1,250.00", "#dc2626"),
        ("Aman Gupta", "Paid ₹3,600", "+₹1,150.00", "#059669"),
        ("Rohit Kumar", "Paid ₹1,100", "-₹1,350.00", "#dc2626")
    ]
    cur_y = 52
    for name, paid, net, col in t_rows:
        ax.add_patch(patches.Rectangle((54, cur_y - 2), 40, 6, facecolor="#f8fafc", edgecolor="#e2e8f0", lw=0.8))
        ax.text(56, cur_y + 1, name, fontsize=7.5, fontweight='bold', color='#1e293b')
        ax.text(75, cur_y + 1, paid, fontsize=7.2, color='#64748b')
        ax.text(92, cur_y + 1, net, ha='right', fontsize=7.5, fontweight='bold', color=col)
        cur_y -= 8

    # Recent items bar at bottom
    ax.add_patch(patches.FancyBboxPatch((4, 2), 92, 13, boxstyle="round,pad=0.5", facecolor="#ffffff", edgecolor="#e2e8f0", lw=1))
    ax.text(6, 11, "Recent Activity Feed: [Chore Done] Living Room Vacuuming (+30 pts by Rahul) | [Expense] Blinkit Superstore (₹3,600 split by Aman)", fontsize=7.2, color='#334155')
    ax.text(6, 6, "System Status: Online | Dual Supabase/In-Memory Mode: Active | 100% Viva Reliable", fontsize=6.8, color='#059669', fontweight='bold')

    save_fig(fig, "ui_dashboard.png")

# ==============================================================================
# UI 4: ADMIN CONTROL PANEL MOCKUP
# ==============================================================================
def create_ui_admin():
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Browser background
    ax.add_patch(patches.Rectangle((0, 0), 100, 100, facecolor="#f8fafc"))

    # Header
    ax.add_patch(patches.Rectangle((0, 91), 100, 9, facecolor="#ffffff", edgecolor="#e2e8f0", lw=1))
    ax.text(4, 95.5, "HARMONY.  [Admin Governance Portal]", fontsize=11, fontweight='bold', color='#1d4ed8')
    ax.text(80, 95.5, "Logged as Admin", fontsize=8, fontweight='bold', color='#dc2626')

    # Top Admin Card: Household Governance
    ax.add_patch(patches.FancyBboxPatch((4, 70), 92, 18, boxstyle="round,pad=0.8", facecolor="#ffffff", edgecolor="#e2e8f0", lw=1.5))
    ax.text(6, 83, "Flat Administration: Green Residency (Flat 402)", fontsize=10, fontweight='bold', color='#0f172a')
    ax.text(6, 78, "Active Invite Code: GRN101", fontsize=9, fontweight='bold', color='#2563eb')
    ax.text(6, 73, "Created by: Lakshya Shukla | Registered Members: 4 | Flat Code Status: Active", fontsize=7.5, color='#64748b')

    ax.add_patch(patches.FancyBboxPatch((74, 74), 18, 6, boxstyle="round,pad=0.3", facecolor="#475569"))
    ax.text(83, 77, "Regenerate Code", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#ffffff')

    # Roommate Roster Table
    ax.add_patch(patches.FancyBboxPatch((4, 28), 92, 39, boxstyle="round,pad=0.8", facecolor="#ffffff", edgecolor="#e2e8f0", lw=1.5))
    ax.text(6, 62, "Roommate Roster & Permission Control", fontsize=9.5, fontweight='bold', color='#0f172a')

    headers = [("Name", 6), ("College Email", 28), ("Role", 60), ("Status", 75), ("Actions", 88)]
    for h, hx in headers:
        ax.text(hx, 56, h, fontsize=7.5, fontweight='bold', color='#475569')

    members = [
        ("Lakshya Shukla", "lakshya@imsnoida.com", "Admin", "Active", "Primary Owner"),
        ("Rahul Verma", "rahul@imsnoida.com", "Member", "Active", "[Remove]"),
        ("Aman Gupta", "aman@imsnoida.com", "Member", "Active", "[Remove]"),
        ("Rohit Kumar", "rohit@imsnoida.com", "Member", "Active", "[Remove]")
    ]
    my = 50
    for name, email, role, status, action in members:
        ax.plot([5, 94], [my-1, my-1], color="#f1f5f9", lw=1)
        ax.text(6, my+1, name, fontsize=7.2, fontweight='bold', color='#1e293b')
        ax.text(28, my+1, email, fontsize=7, color='#64748b')
        ax.text(60, my+1, role, fontsize=7.2, fontweight='bold', color="#1d4ed8" if role=="Admin" else "#475569")
        ax.text(75, my+1, status, fontsize=7, color='#059669', fontweight='bold')
        ax.text(88, my+1, action, fontsize=7, color='#dc2626' if action=="[Remove]" else '#64748b', fontweight='bold')
        my -= 7

    # Audit & Record Purge Bar
    ax.add_patch(patches.FancyBboxPatch((4, 4), 92, 20, boxstyle="round,pad=0.8", facecolor="#ffffff", edgecolor="#e2e8f0", lw=1.5))
    ax.text(6, 19, "Audit Log & Disputed Record Resolution", fontsize=9.5, fontweight='bold', color='#0f172a')
    ax.text(6, 13, "Admins can override anomalous expense entries, adjust mistaken chore points, and export monthly CSV statements.", fontsize=7.5, color='#64748b')
    ax.text(6, 8, "• Cleaned duplicate entry for 'Grocery Supply' on 06-Oct-2026 | Log ID: #LOG-882194", fontsize=7, color='#059669')

    save_fig(fig, "ui_admin.png")

if __name__ == "__main__":
    print("Generating UI Wireframe Mockup Suite...")
    create_ui_landing()
    create_ui_login()
    create_ui_dashboard()
    create_ui_admin()
    print("All 4 UI mockups generated successfully in diagrams/!")
