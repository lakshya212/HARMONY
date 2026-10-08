import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Ensure output directory exists
os.makedirs("diagrams", exist_ok=True)

# Set global styles
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Helvetica']

def save_fig(fig, filename):
    filepath = os.path.join("diagrams", filename)
    fig.savefig(filepath, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Generated: {filepath}")

# ==============================================================================
# 1. ARCHITECTURE DIAGRAM (3-TIER ARCHITECTURE)
# ==============================================================================
def create_architecture_diagram():
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 96, "HARMONY - High-Level 3-Tier System Architecture", 
            ha='center', va='center', fontsize=15, fontweight='bold', color='#1e3a8a')

    # Tier 1: Client Presentation Tier
    tier1 = patches.FancyBboxPatch((5, 68), 90, 22, boxstyle="round,pad=1.5", 
                                   facecolor="#eff6ff", edgecolor="#3b82f6", linewidth=2)
    ax.add_patch(tier1)
    ax.text(8, 86, "TIER 1: CLIENT PRESENTATION TIER (Hosted on Vercel Edge CDN)", 
            fontsize=10, fontweight='bold', color='#1d4ed8')
    
    # Sub-boxes in Tier 1
    comps_t1 = [
        (10, 71, 22, 11, "React.js 18 SPA\n(Vite Tooling)", "#dbeafe", "#2563eb"),
        (38, 71, 24, 11, "Tailwind CSS\n(Responsive UI/UX)", "#dbeafe", "#2563eb"),
        (68, 71, 23, 11, "Recharts Visuals\n(Effort & Balances)", "#dbeafe", "#2563eb")
    ]
    for x, y, w, h, text, fc, ec in comps_t1:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", facecolor=fc, edgecolor=ec, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1e293b')

    # Tier 2: Application Tier
    tier2 = patches.FancyBboxPatch((5, 36), 90, 24, boxstyle="round,pad=1.5", 
                                   facecolor="#f0fdf4", edgecolor="#22c55e", linewidth=2)
    ax.add_patch(tier2)
    ax.text(8, 56, "TIER 2: APPLICATION LOGIC & API TIER (Hosted on Render Cloud Services)", 
            fontsize=10, fontweight='bold', color='#15803d')

    comps_t2 = [
        (8, 39, 18, 12, "Express.js API\n(REST Controller)", "#dcfce7", "#16a34a"),
        (30, 39, 20, 12, "Auth Middleware\n(Session / JWT)", "#dcfce7", "#16a34a"),
        (54, 39, 20, 12, "Chore Calculator\n(Points Aggregation)", "#dcfce7", "#16a34a"),
        (77, 39, 16, 12, "Split Engine\n(T / N Equal Math)", "#dcfce7", "#16a34a")
    ]
    for x, y, w, h, text, fc, ec in comps_t2:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", facecolor=fc, edgecolor=ec, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=8, fontweight='bold', color='#1e293b')

    # Tier 3: Database Persistence Tier
    tier3 = patches.FancyBboxPatch((5, 4), 90, 24, boxstyle="round,pad=1.5", 
                                   facecolor="#faf5ff", edgecolor="#a855f7", linewidth=2)
    ax.add_patch(tier3)
    ax.text(8, 24, "TIER 3: DATA PERSISTENCE TIER (Managed PostgreSQL on Supabase)", 
            fontsize=10, fontweight='bold', color='#7e22ce')

    comps_t3 = [
        (10, 7, 24, 12, "PostgreSQL 15 DB\n(ACID Relational Core)", "#f3e8ff", "#9333ea"),
        (38, 7, 24, 12, "Row-Level Security\n(Tenant Flat Isolation)", "#f3e8ff", "#9333ea"),
        (68, 7, 23, 12, "In-Memory Fallback\n(Zero-Failure Viva Mode)", "#f3e8ff", "#9333ea")
    ]
    for x, y, w, h, text, fc, ec in comps_t3:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", facecolor=fc, edgecolor=ec, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=8, fontweight='bold', color='#1e293b')

    # Connecting Arrows
    ax.annotate('', xy=(30, 60), xytext=(30, 68), arrowprops=dict(arrowstyle="<->", color="#3b82f6", lw=2))
    ax.text(32, 64, "HTTPS / JSON REST API", fontsize=8, fontweight='bold', color="#2563eb")

    ax.annotate('', xy=(70, 60), xytext=(70, 68), arrowprops=dict(arrowstyle="<->", color="#3b82f6", lw=2))
    ax.text(72, 64, "Async Client State Sync", fontsize=8, fontweight='bold', color="#2563eb")

    ax.annotate('', xy=(30, 28), xytext=(30, 36), arrowprops=dict(arrowstyle="<->", color="#22c55e", lw=2))
    ax.text(32, 32, "SQL Queries & Transactions", fontsize=8, fontweight='bold', color="#16a34a")

    ax.annotate('', xy=(70, 28), xytext=(70, 36), arrowprops=dict(arrowstyle="<->", color="#22c55e", lw=2))
    ax.text(72, 32, "Supabase Realtime / Fallback", fontsize=8, fontweight='bold', color="#16a34a")

    save_fig(fig, "diagram_architecture.png")

# ==============================================================================
# 2. PROJECT FLOW DIAGRAM
# ==============================================================================
def create_flow_diagram():
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 95, "HARMONY - Operational Lifecycle & User Journey Flow", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#1e3a8a')

    steps = [
        (8, 55, 14, 26, "Step 1\nPublic Landing &\nAuthentication\n(Sign In / Up)", "#dbeafe", "#3b82f6"),
        (26, 55, 14, 26, "Step 2\nHousehold Setup\n(Create Flat or\nEnter Invite Code)", "#e0e7ff", "#6366f1"),
        (44, 55, 14, 26, "Step 3\nTask Allocation\n(Log Chores &\nAssign Points)", "#dcfce7", "#22c55e"),
        (62, 55, 14, 26, "Step 4\nExpense Logging\n(Split Bills\nEqually: T / N)", "#fef3c7", "#f59e0b"),
        (80, 55, 14, 26, "Step 5\nDashboard Review\n(Effort Charts &\nNet Balances)", "#fee2e2", "#ef4444"),
    ]

    for x, y, w, h, text, fc, ec in steps:
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=1.2", facecolor=fc, edgecolor=ec, linewidth=2)
        ax.add_patch(box)
        ax.text(x + w/2, y + h/2, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1e293b')

    # Arrows between main steps
    for i in range(len(steps)-1):
        x1 = steps[i][0] + steps[i][2]
        x2 = steps[i+1][0]
        y = 68
        ax.annotate('', xy=(x2, y), xytext=(x1, y), arrowprops=dict(arrowstyle="->", color="#475569", lw=2))

    # Admin sub-flow below
    admin_box = patches.FancyBboxPatch((35, 12), 30, 22, boxstyle="round,pad=1.2", 
                                      facecolor="#f3e8ff", edgecolor="#a855f7", linewidth=2)
    ax.add_patch(admin_box)
    ax.text(50, 23, "Administrative Control (Privileged)\n• Manage Flatmates\n• Audit Ledger Records\n• Reset Invite Code", 
            ha='center', va='center', fontsize=9, fontweight='bold', color='#6b21a8')

    ax.annotate('', xy=(50, 34), xytext=(50, 55), arrowprops=dict(arrowstyle="<->", color="#a855f7", lw=2, linestyle="dashed"))
    ax.text(52, 44, "Admin Authority", fontsize=8.5, fontweight='bold', color="#7e22ce")

    save_fig(fig, "diagram_flow.png")

# ==============================================================================
# 3. LEVEL 0 DFD (CONTEXT DIAGRAM)
# ==============================================================================
def create_dfd0_diagram():
    fig, ax = plt.subplots(figsize=(9, 6.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 95, "DFD Level 0: Context Diagram for HARMONY System", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#1e3a8a')

    # Central System Circle
    circle = patches.Circle((50, 50), 16, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=2.5)
    ax.add_patch(circle)
    ax.text(50, 52, "0.0", ha='center', va='center', fontsize=12, fontweight='bold', color='#1e4ed8')
    ax.text(50, 46, "HARMONY\nShared Living System", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#1e293b')

    # External Entity: Roommate (User)
    box_user = patches.Rectangle((6, 60), 20, 18, facecolor="#f8fafc", edgecolor="#334155", linewidth=2)
    ax.add_patch(box_user)
    ax.text(16, 69, "Roommate\n(Flat Member)", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#0f172a')

    # External Entity: Household Admin
    box_admin = patches.Rectangle((6, 20), 20, 18, facecolor="#f8fafc", edgecolor="#334155", linewidth=2)
    ax.add_patch(box_admin)
    ax.text(16, 29, "Household\nAdministrator", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#0f172a')

    # External Entity: Database / Cloud Services
    box_db = patches.Rectangle((74, 40), 20, 20, facecolor="#faf5ff", edgecolor="#9333ea", linewidth=2)
    ax.add_patch(box_db)
    ax.text(84, 50, "Supabase Cloud\n(PostgreSQL / Auth)", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#581c87')

    # Data flows: User <-> System
    ax.annotate('', xy=(38, 58), xytext=(26, 66), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.8))
    ax.text(32, 67, "Chores / Bills / Logins", fontsize=8, fontweight='bold', color="#1e40af", rotation=15)

    ax.annotate('', xy=(26, 62), xytext=(38, 54), arrowprops=dict(arrowstyle="->", color="#059669", lw=1.8))
    ax.text(26, 54, "Dashboards / Balances", fontsize=8, fontweight='bold', color="#047857", rotation=15)

    # Data flows: Admin <-> System
    ax.annotate('', xy=(38, 44), xytext=(26, 32), arrowprops=dict(arrowstyle="->", color="#2563eb", lw=1.8))
    ax.text(26, 38, "Admin Directives", fontsize=8, fontweight='bold', color="#1e40af", rotation=-15)

    ax.annotate('', xy=(26, 26), xytext=(38, 38), arrowprops=dict(arrowstyle="->", color="#059669", lw=1.8))
    ax.text(32, 26, "Audit Logs / Reports", fontsize=8, fontweight='bold', color="#047857", rotation=-15)

    # Data flows: System <-> DB
    ax.annotate('', xy=(74, 54), xytext=(66, 54), arrowprops=dict(arrowstyle="->", color="#9333ea", lw=1.8))
    ax.text(67, 56, "SQL Writes", fontsize=8, fontweight='bold', color="#7e22ce")

    ax.annotate('', xy=(66, 46), xytext=(74, 46), arrowprops=dict(arrowstyle="->", color="#9333ea", lw=1.8))
    ax.text(67, 42, "SQL Reads", fontsize=8, fontweight='bold', color="#7e22ce")

    save_fig(fig, "diagram_dfd0.png")

# ==============================================================================
# 4. LEVEL 1 DFD (DECOMPOSITION)
# ==============================================================================
def create_dfd1_diagram():
    fig, ax = plt.subplots(figsize=(10, 7.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "DFD Level 1: Sub-System Functional Decomposition", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#1e3a8a')

    # Processes
    procs = [
        (35, 78, "1.0", "Authentication\n& Profiles"),
        (35, 60, "2.0", "Household &\nMembership"),
        (35, 42, "3.0", "Chore & Effort\nEngine"),
        (35, 24, "4.0", "Expense Split\nEngine"),
        (35, 6, "5.0", "Dashboard &\nReporting")
    ]

    for x, y, num, name in procs:
        circ = patches.Circle((x, y), 6, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.8)
        ax.add_patch(circ)
        ax.text(x, y + 1.5, num, ha='center', va='center', fontsize=9, fontweight='bold', color='#1d4ed8')
        ax.text(x, y - 2, name, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1e293b')

    # External Entity: User / Admin
    user_box = patches.Rectangle((6, 35), 16, 30, facecolor="#f8fafc", edgecolor="#334155", linewidth=2)
    ax.add_patch(user_box)
    ax.text(14, 50, "Roommates\n&\nAdmin", ha='center', va='center', fontsize=10, fontweight='bold', color='#0f172a')

    # Data Stores (Right Side)
    stores = [
        (72, 74, "D1", "profiles"),
        (72, 57, "D2", "households & members"),
        (72, 40, "D3", "tasks"),
        (72, 23, "D4", "expenses"),
        (72, 6, "D5", "expense_splits")
    ]

    for x, y, d_id, s_name in stores:
        # Draw open-ended data store lines
        ax.plot([x, x+22], [y+5, y+5], color="#0f766e", lw=2)
        ax.plot([x, x+22], [y-5, y-5], color="#0f766e", lw=2)
        ax.plot([x, x], [y-5, y+5], color="#0f766e", lw=2)
        ax.text(x+3, y, d_id, ha='center', va='center', fontsize=8.5, fontweight='bold', color="#0f766e")
        ax.text(x+12, y, s_name, ha='center', va='center', fontsize=8, fontweight='bold', color="#134e4a")

    # Connect User to Processes
    for p_y in [78, 60, 42, 24]:
        ax.annotate('', xy=(29, p_y), xytext=(22, 50), arrowprops=dict(arrowstyle="->", color="#3b82f6", lw=1.5))
    ax.annotate('', xy=(22, 45), xytext=(29, 6), arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.5))

    # Connect Processes to Data Stores
    ax.annotate('', xy=(72, 78), xytext=(41, 78), arrowprops=dict(arrowstyle="<->", color="#475569", lw=1.5))
    ax.annotate('', xy=(72, 60), xytext=(41, 60), arrowprops=dict(arrowstyle="<->", color="#475569", lw=1.5))
    ax.annotate('', xy=(72, 42), xytext=(41, 42), arrowprops=dict(arrowstyle="<->", color="#475569", lw=1.5))
    ax.annotate('', xy=(72, 26), xytext=(41, 24), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))
    ax.annotate('', xy=(72, 10), xytext=(41, 24), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))

    # Feed Stores into Dashboard (5.0)
    ax.annotate('', xy=(39, 9), xytext=(72, 40), arrowprops=dict(arrowstyle="->", color="#9333ea", lw=1.2, linestyle="dotted"))
    ax.annotate('', xy=(39, 7), xytext=(72, 23), arrowprops=dict(arrowstyle="->", color="#9333ea", lw=1.2, linestyle="dotted"))
    ax.annotate('', xy=(39, 5), xytext=(72, 6), arrowprops=dict(arrowstyle="->", color="#9333ea", lw=1.2, linestyle="dotted"))

    save_fig(fig, "diagram_dfd1.png")

# ==============================================================================
# 5. LEVEL 2 DFD (EXPENSE TRANSACTION FLOW)
# ==============================================================================
def create_dfd2_diagram():
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "DFD Level 2: Granular Expense Calculation & Settlement Flow (Process 4.0)", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#1e3a8a')

    # Sub-processes
    p4_1 = patches.Circle((20, 68), 7, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.8)
    p4_2 = patches.Circle((50, 68), 7, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.8)
    p4_3 = patches.Circle((80, 68), 7, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.8)
    p4_4 = patches.Circle((80, 28), 7, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.8)
    p4_5 = patches.Circle((35, 28), 7, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.8)

    for p, num, text in [
        (p4_1, "4.1", "Validate Payload\n& Payer"),
        (p4_2, "4.2", "Store Master\nExpense Record"),
        (p4_3, "4.3", "Compute Equal\nSplit: T / N"),
        (p4_4, "4.4", "Persist Debt\nSplits"),
        (p4_5, "4.5", "Aggregate Net\nBalances")
    ]:
        ax.add_patch(p)
        cx, cy = p.center
        ax.text(cx, cy + 1.8, num, ha='center', va='center', fontsize=9, fontweight='bold', color='#1d4ed8')
        ax.text(cx, cy - 2.2, text, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1e293b')

    # Data stores
    # D4: expenses
    ax.plot([40, 60], [48, 48], color="#0f766e", lw=2)
    ax.plot([40, 60], [40, 40], color="#0f766e", lw=2)
    ax.plot([40, 40], [40, 48], color="#0f766e", lw=2)
    ax.text(43, 44, "D4", ha='center', va='center', fontsize=8, fontweight='bold', color="#0f766e")
    ax.text(52, 44, "expenses", ha='center', va='center', fontsize=8, fontweight='bold', color="#134e4a")

    # D5: expense_splits
    ax.plot([70, 92], [48, 48], color="#0f766e", lw=2)
    ax.plot([70, 92], [40, 40], color="#0f766e", lw=2)
    ax.plot([70, 70], [40, 48], color="#0f766e", lw=2)
    ax.text(73, 44, "D5", ha='center', va='center', fontsize=8, fontweight='bold', color="#0f766e")
    ax.text(82, 44, "expense_splits", ha='center', va='center', fontsize=8, fontweight='bold', color="#134e4a")

    # Flow arrows
    ax.annotate('', xy=(13, 68), xytext=(2, 68), arrowprops=dict(arrowstyle="->", color="#3b82f6", lw=2))
    ax.text(4, 71, "Submit Bill", fontsize=8, fontweight='bold', color="#1e40af")

    ax.annotate('', xy=(43, 68), xytext=(27, 68), arrowprops=dict(arrowstyle="->", color="#3b82f6", lw=2))
    ax.annotate('', xy=(73, 68), xytext=(57, 68), arrowprops=dict(arrowstyle="->", color="#3b82f6", lw=2))

    ax.annotate('', xy=(50, 48), xytext=(50, 61), arrowprops=dict(arrowstyle="->", color="#0f766e", lw=2))
    ax.annotate('', xy=(80, 35), xytext=(80, 61), arrowprops=dict(arrowstyle="->", color="#3b82f6", lw=2))
    ax.annotate('', xy=(80, 40), xytext=(80, 35), arrowprops=dict(arrowstyle="->", color="#0f766e", lw=2))

    ax.annotate('', xy=(42, 28), xytext=(73, 28), arrowprops=dict(arrowstyle="->", color="#3b82f6", lw=2))
    ax.text(56, 31, "Debts Array", fontsize=8, fontweight='bold', color="#1e40af")

    ax.annotate('', xy=(40, 40), xytext=(35, 35), arrowprops=dict(arrowstyle="<-", color="#0f766e", lw=1.5, linestyle="dashed"))
    ax.annotate('', xy=(70, 40), xytext=(38, 32), arrowprops=dict(arrowstyle="<-", color="#0f766e", lw=1.5, linestyle="dashed"))

    # Return to UI
    ax.annotate('', xy=(12, 28), xytext=(28, 28), arrowprops=dict(arrowstyle="->", color="#10b981", lw=2))
    ax.text(14, 31, "Net Balances to UI", fontsize=8, fontweight='bold', color="#047857")

    save_fig(fig, "diagram_dfd2.png")

# ==============================================================================
# 6. USE CASE DIAGRAM
# ==============================================================================
def create_usecase_diagram():
    fig, ax = plt.subplots(figsize=(10, 7.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "HARMONY - Use Case Diagram", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#1e3a8a')

    # System boundary box
    sys_box = patches.Rectangle((28, 6), 56, 86, facecolor="#f8fafc", edgecolor="#475569", linewidth=2, linestyle="--")
    ax.add_patch(sys_box)
    ax.text(56, 89, "HARMONY Web System Boundary", ha='center', va='center', fontsize=11, fontweight='bold', color='#334155')

    # Use cases (Ovals)
    usecases = [
        (56, 78, "Register & Sign In (Auth)"),
        (56, 67, "Create or Join Flat (Invite Code)"),
        (56, 56, "Log Chore & Assign Points"),
        (56, 45, "Mark Chore Done (Claim Points)"),
        (56, 34, "Log Expense & Split Equal (T/N)"),
        (56, 23, "View Recharts & Balance Ledger"),
        (56, 12, "Manage Members & Audit Records")
    ]

    for x, y, text in usecases:
        oval = patches.Ellipse((x, y), 38, 8, facecolor="#eff6ff", edgecolor="#2563eb", linewidth=1.5)
        ax.add_patch(oval)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#1e293b')

    # Actor: Roommate (Left)
    ax.plot([14, 14], [52, 60], color="#1e293b", lw=2) # body
    ax.plot([10, 18], [57, 57], color="#1e293b", lw=2) # arms
    ax.plot([14, 10], [52, 44], color="#1e293b", lw=2) # left leg
    ax.plot([14, 18], [52, 44], color="#1e293b", lw=2) # right leg
    head1 = patches.Circle((14, 63), 3, facecolor="#ffffff", edgecolor="#1e293b", lw=2)
    ax.add_patch(head1)
    ax.text(14, 38, "Roommate\n(User)", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#0f172a')

    # Actor: Admin (Right)
    ax.plot([92, 92], [32, 40], color="#9333ea", lw=2) # body
    ax.plot([88, 96], [37, 37], color="#9333ea", lw=2) # arms
    ax.plot([92, 88], [32, 24], color="#9333ea", lw=2) # left leg
    ax.plot([92, 96], [32, 24], color="#9333ea", lw=2) # right leg
    head2 = patches.Circle((92, 43), 3, facecolor="#ffffff", edgecolor="#9333ea", lw=2)
    ax.add_patch(head2)
    ax.text(92, 18, "Household\nAdmin", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#7e22ce')

    # Connect User to use cases
    for i in range(6):
        ax.plot([18, 38], [55, usecases[i][1]], color="#2563eb", lw=1.3)

    # Connect Admin to admin use cases
    ax.plot([88, 74], [35, usecases[6][1]], color="#9333ea", lw=1.5)
    ax.plot([88, 74], [35, usecases[1][1]], color="#9333ea", lw=1.2, linestyle="dotted")
    ax.plot([88, 74], [35, usecases[4][1]], color="#9333ea", lw=1.2, linestyle="dotted")

    save_fig(fig, "diagram_usecase.png")

# ==============================================================================
# 7. ENTITY RELATIONSHIP DIAGRAM (ERD)
# ==============================================================================
def create_erd_diagram():
    fig, ax = plt.subplots(figsize=(11, 7.5))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "HARMONY - Relational Database Schema (ERD)", 
            ha='center', va='center', fontsize=14, fontweight='bold', color='#1e3a8a')

    def draw_entity(x, y, title, fields, border_color="#3b82f6"):
        h = 5 + len(fields) * 3.5
        box = patches.FancyBboxPatch((x, y-h), 26, h, boxstyle="round,pad=0.5", 
                                     facecolor="#ffffff", edgecolor=border_color, linewidth=1.8)
        ax.add_patch(box)
        # Header banner
        header = patches.Rectangle((x, y-5), 26, 5, facecolor=border_color)
        ax.add_patch(header)
        ax.text(x+13, y-2.5, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#ffffff')
        # Field rows
        cur_y = y - 8
        for f in fields:
            ax.text(x+2, cur_y, f, fontsize=7.5, color='#1e293b')
            cur_y -= 3.5

    # Entities
    draw_entity(4, 90, "PROFILES (Users)", [
        "PK  id: UUID",
        "    email: VARCHAR(255)",
        "    full_name: VARCHAR(100)",
        "    created_at: TIMESTAMP"
    ], "#2563eb")

    draw_entity(38, 90, "HOUSEHOLDS", [
        "PK  id: UUID",
        "    name: VARCHAR(100)",
        "    invite_code: VARCHAR(10)",
        "FK  created_by: UUID",
        "    created_at: TIMESTAMP"
    ], "#0d9488")

    draw_entity(72, 90, "HOUSEHOLD_MEMBERS", [
        "PK  id: UUID",
        "FK  household_id: UUID",
        "FK  user_id: UUID",
        "    role: VARCHAR(20)",
        "    joined_at: TIMESTAMP"
    ], "#0891b2")

    draw_entity(4, 50, "TASKS (Chores)", [
        "PK  id: UUID",
        "FK  household_id: UUID",
        "    title: VARCHAR(150)",
        "    points: INTEGER",
        "FK  assigned_to: UUID",
        "FK  completed_by: UUID",
        "    status: VARCHAR(20)"
    ], "#d97706")

    draw_entity(38, 50, "EXPENSES", [
        "PK  id: UUID",
        "FK  household_id: UUID",
        "FK  paid_by: UUID",
        "    amount: DECIMAL(10,2)",
        "    category: VARCHAR(50)",
        "    expense_date: DATE"
    ], "#dc2626")

    draw_entity(72, 50, "EXPENSE_SPLITS", [
        "PK  id: UUID",
        "FK  expense_id: UUID",
        "FK  user_id: UUID",
        "    share_amount: DECIMAL",
        "    is_settled: BOOLEAN"
    ], "#7c3aed")

    # Cardinality relationship lines
    # Profiles -> Households (1:N)
    ax.annotate('', xy=(38, 82), xytext=(30, 82), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))
    ax.text(32, 84, "1 : N", fontsize=7.5, fontweight='bold', color="#334155")

    # Households -> Members (1:N)
    ax.annotate('', xy=(72, 82), xytext=(64, 82), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))
    ax.text(66, 84, "1 : N", fontsize=7.5, fontweight='bold', color="#334155")

    # Households -> Tasks (1:N)
    ax.annotate('', xy=(17, 50), xytext=(45, 68), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))

    # Households -> Expenses (1:N)
    ax.annotate('', xy=(51, 50), xytext=(51, 68), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))

    # Expenses -> Expense_Splits (1:N)
    ax.annotate('', xy=(72, 38), xytext=(64, 38), arrowprops=dict(arrowstyle="->", color="#475569", lw=1.5))
    ax.text(66, 40, "1 : N", fontsize=7.5, fontweight='bold', color="#334155")

    save_fig(fig, "diagram_erd.png")

if __name__ == "__main__":
    print("Generating academic diagram suite for HARMONY...")
    create_architecture_diagram()
    create_flow_diagram()
    create_dfd0_diagram()
    create_dfd1_diagram()
    create_dfd2_diagram()
    create_usecase_diagram()
    create_erd_diagram()
    print("All 7 academic diagrams generated successfully in diagrams/!")
