import pypdf

reader = pypdf.PdfReader('BCA_508_Minor_Project_Synopsis_HARMONY.pdf')

def find_first_page_after(query, start_page):
    for p_idx in range(start_page - 1, len(reader.pages)):
        text = reader.pages[p_idx].extract_text() or ""
        if query.lower() in text.lower():
            return p_idx + 1
    return None

exact_pages = {
    "proforma": 2,
    "acknowledgement": 3,
    "cert_originality": 4,
    "internship": 5,
    "list_figures": 8,
    "sec1": find_first_page_after("1. Introduction / Overview of the Project", 9),
    "sec1_1": find_first_page_after("1.1 Problem Background", 9),
    "sec1_2": find_first_page_after("1.2 Real-World Relevance", 9),
    "sec1_3": find_first_page_after("1.3 Proposed Solution", 9),
    "sec1_4": find_first_page_after("1.4 Primary System Objectives", 9),
    "sec2": find_first_page_after("2. Performance of the Project", 10),
    "sec2_1": find_first_page_after("2.1 Feasibility Analysis", 10),
    "sec2_2": find_first_page_after("2.2 System Effectiveness", 10),
    "sec2_3": find_first_page_after("2.3 Scalability, Latency", 10),
    "sec3": find_first_page_after("3. Project Architecture", 12),
    "sec3_1": find_first_page_after("3.1 Presentation Tier", 12),
    "sec3_2": find_first_page_after("3.2 Application / Logic Tier", 12),
    "sec3_3": find_first_page_after("3.3 Data Tier", 12),
    "sec3_4": find_first_page_after("3.4 Security & Data Flow", 12),
    "sec4": find_first_page_after("4. Project Flow", 14),
    "sec4_1": find_first_page_after("4.1 End-to-End Lifecycle", 14),
    "sec5": find_first_page_after("5. Data Flow Diagrams (DFDs)", 15),
    "sec5_1": find_first_page_after("5.1 Level 0 DFD", 15),
    "sec5_2": find_first_page_after("5.2 Level 1 DFD", 16),
    "sec5_3": find_first_page_after("5.3 Level 2 DFD", 17),
    "sec6": find_first_page_after("6. Use Case Diagram", 18),
    "sec6_1": find_first_page_after("6.1 Actor Specifications", 18),
    "sec6_2": find_first_page_after("6.2 Use Case Diagram & Specifications", 18),
    "sec7": find_first_page_after("7. Entity Relationship Diagram (ERD)", 20),
    "sec7_1": find_first_page_after("7.1 Relational Entity Specifications", 20),
    "sec7_2": find_first_page_after("7.2 ER Diagram Schema", 20),
    "sec8": find_first_page_after("8. Hardware and Software Requirements", 22),
    "sec8_1": find_first_page_after("8.1 Hardware Requirements", 22),
    "sec8_2": find_first_page_after("8.2 Software & Technology Stack", 22),
    "sec9": find_first_page_after("9. Future Scope", 23),
    "sec9_1": find_first_page_after("9.1 Machine Learning", 23),
    "sec9_2": find_first_page_after("9.2 UPI Deep-Linking", 23),
    "sec9_3": find_first_page_after("9.3 Native Mobile Application", 23),
    "sec10": find_first_page_after("10. Limitations of the Project", 23),
    "sec10_1": find_first_page_after("1. Synthetic Financial Debt", 23),
    "sec10_2": find_first_page_after("3. Reliance on Honest", 23),
    "sec11": find_first_page_after("11. Front-End Pages", 24),
    "sec11_1": find_first_page_after("11.1 Landing / Home Page", 24),
    "sec11_2": find_first_page_after("11.2 User Login & Registration", 25),
    "sec11_3": find_first_page_after("11.3 Main User Interaction", 26),
    "sec11_4": find_first_page_after("11.4 Admin Management", 27),
    "references": find_first_page_after("References & Bibliography", 28),
    # Figures
    "fig3_1": find_first_page_after("Figure 3.1: HARMONY High-Level 3-Tier System Architecture", 12),
    "fig4_1": find_first_page_after("Figure 4.1: End-to-End System Interaction & State Flowchart", 14),
    "fig5_1": find_first_page_after("Figure 5.1: Level 0 DFD - Context Diagram for HARMONY Platform", 15),
    "fig5_2": find_first_page_after("Figure 5.2: Level 1 DFD - Sub-System Functional Decomposition", 16),
    "fig5_3": find_first_page_after("Figure 5.3: Level 2 DFD - Granular Expense Calculation & Settlement Flow", 17),
    "fig6_1": find_first_page_after("Figure 6.1: Use Case Diagram for HARMONY Shared Living System", 18),
    "fig7_1": find_first_page_after("Figure 7.1: Entity Relationship Diagram (ERD) with 3NF Normalized Entities", 20),
    "fig11_1": find_first_page_after("Figure 11.1: Landing & Public Onboarding Portal Interface Layout", 24),
    "fig11_2": find_first_page_after("Figure 11.2: Authentication & 1-Click Demo Profile Selection Screen", 25),
    "fig11_3": find_first_page_after("Figure 11.3: Main Roommate Dashboard with Effort Charts & Financial Ledger", 26),
    "fig11_4": find_first_page_after("Figure 11.4: Administrative Household Supervision & Governance Panel", 27)
}

print("EXACT_PAGE_NUMBERS = {")
for k, v in exact_pages.items():
    print(f'    "{k}": "{v}",')
print("}")
