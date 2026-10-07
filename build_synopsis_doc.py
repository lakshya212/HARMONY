import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def add_callout_box(doc, text, title="ACADEMIC NOTE"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "F1F5F9")
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    run_t = p.add_run(f"[{title}] ")
    run_t.bold = True
    run_t.font.color.rgb = RGBColor(30, 58, 138)
    run_t.font.size = Pt(10)
    run_m = p.add_run(text)
    run_m.font.size = Pt(10)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def create_document():
    doc = docx.Document()
    
    # Page setup - Standard 1 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
    # Styles
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(12)
    normal_style.paragraph_format.line_spacing = 1.15
    normal_style.paragraph_format.space_after = Pt(6)
    
    # =========================================================================
    # PAGE 1: TITLE / COVER PAGE
    # =========================================================================
    p1 = doc.add_paragraph()
    p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p1.paragraph_format.space_before = Pt(12)
    p1.paragraph_format.space_after = Pt(12)
    
    r_title = p1.add_run('“HARMONY: ROOMMATE CONFLICT RESOLUTION AND SHARED LIVING MANAGEMENT SYSTEM”\n')
    r_title.bold = True
    r_title.underline = True
    r_title.font.size = Pt(16)
    r_title.font.color.rgb = RGBColor(17, 24, 39)
    
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(14)
    r_sub = p_sub.add_run("MINOR PROJECT (BCA-508)\nSUBMITTED TO\n")
    r_sub.bold = True
    r_sub.font.size = Pt(13)
    r_sub.font.color.rgb = RGBColor(17, 24, 39)
    
    p_sub2 = doc.add_paragraph()
    p_sub2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub2.paragraph_format.space_after = Pt(20)
    r_sub2 = p_sub2.add_run("Chaudhary Charan Singh University, Meerut\n\nFor the partial fulfillment of the degree of the Bachelor’s in Computer Application\n(2024–27).\n")
    r_sub2.bold = True
    r_sub2.font.size = Pt(12)
    
    # Official CCSU Logo Image
    p_emblem = doc.add_paragraph()
    p_emblem.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_emblem.paragraph_format.space_after = Pt(36)
    if os.path.exists("plan/ccsu_logo.png"):
        p_emblem.add_run().add_picture("plan/ccsu_logo.png", width=Inches(2.2))
    else:
        r_emb = p_emblem.add_run("[ AFFIX CCSU EMBLEM HERE ]\n")
        r_emb.bold = True
        r_emb.font.size = Pt(12)
        r_emb.font.color.rgb = RGBColor(100, 116, 139)
    
    # Bottom Guidance / Submission Table
    tbl_sub = doc.add_table(rows=1, cols=2)
    tbl_sub.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell_l = tbl_sub.cell(0, 0)
    cell_r = tbl_sub.cell(0, 1)
    
    p_l = cell_l.paragraphs[0]
    p_l.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r_gl = p_l.add_run("UNDER THE GUIDANCE OF:\n")
    r_gl.bold = True
    r_gl.font.size = Pt(11)
    p_l.add_run("Mr. Nihal Kumar / Mr. Anushrav Mudgal\nAssistant Professor, SOIT\nIMS NOIDA")
    
    p_r = cell_r.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r_gr = p_r.add_run("SUBMITTED BY:\n")
    r_gr.bold = True
    r_gr.font.size = Pt(11)
    p_r.add_run("[STUDENT NAME]\nUniversity Roll No.: [ROLL NO.]\nBCA 5th Semester, Sec: [A/B/C/D]")
    
    doc.add_page_break()
    
    # =========================================================================
    # PAGE 2: PROFORMA FOR APPROVAL
    # =========================================================================
    p_prof_head = doc.add_paragraph()
    p_prof_head.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_ph1 = p_prof_head.add_run("INSTITUTE OF MANAGEMENT STUDIES, NOIDA\n")
    r_ph1.bold = True
    r_ph1.font.size = Pt(14)
    r_ph2 = p_prof_head.add_run("SCHOOL OF INFORMATION TECHNOLOGY (SOIT)\nPROFORMA FOR APPROVAL OF BCA MINOR PROJECT (BCA-508)\n")
    r_ph2.bold = True
    r_ph2.font.size = Pt(12)
    r_ph2.font.color.rgb = RGBColor(30, 58, 138)
    
    tbl_proforma = doc.add_table(rows=6, cols=2)
    tbl_proforma.alignment = WD_TABLE_ALIGNMENT.CENTER
    prof_data = [
        ("Roll No. / University Enrollment No.", "[ENTER YOUR UNIVERSITY ROLL NUMBER]"),
        ("Student Name", "[ENTER YOUR FULL NAME]"),
        ("Official College Email ID", "[USERNAME]@imsnoida.com"),
        ("Mobile Number", "[ENTER YOUR CONTACT NUMBER]"),
        ("Title of the MINOR Project", "HARMONY: ROOMMATE CONFLICT RESOLUTION AND SHARED LIVING MANAGEMENT SYSTEM"),
        ("Name of the Project Guide / Mentor", "Mr. Nihal Kumar / Mr. Anushrav Mudgal (IMS Noida)")
    ]
    for idx, (label, val) in enumerate(prof_data):
        c0 = tbl_proforma.cell(idx, 0)
        c1 = tbl_proforma.cell(idx, 1)
        c0.width = Inches(2.8)
        c1.width = Inches(3.7)
        set_cell_margins(c0, 80, 80, 100, 100)
        set_cell_margins(c1, 80, 80, 100, 100)
        set_cell_background(c0, "F8FAFC")
        
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(label)
        r0.bold = True
        r0.font.size = Pt(10.5)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(val)
        r1.font.size = Pt(10.5)
        
    doc.add_paragraph().paragraph_format.space_after = Pt(12)
    
    p_app_block = doc.add_paragraph()
    r_ab = p_app_block.add_run("OFFICIAL EVALUATION & APPROVAL BLOCK\n")
    r_ab.bold = True
    r_ab.font.size = Pt(11)
    
    tbl_app = doc.add_table(rows=3, cols=2)
    tbl_app.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_app.cell(0, 0).width = Inches(3.2)
    tbl_app.cell(0, 1).width = Inches(3.3)
    
    p_status = tbl_app.cell(0, 0).paragraphs[0]
    p_status.add_run("Status of Project Proposal:\n[   ] APPROVED\n[   ] NOT APPROVED / RESUBMIT").bold = True
    
    p_sig = tbl_app.cell(0, 1).paragraphs[0]
    p_sig.add_run("\n\n___________________________________\nSignature of the Project Mentor / Guide\nDate: _____ / _____ / 2026")
    
    cell_sug = tbl_app.cell(1, 0)
    tbl_app.rows[1].cells[0].merge(tbl_app.rows[1].cells[1])
    p_sug = cell_sug.paragraphs[0]
    p_sug.add_run("Suggestions / Recommendations for Improvement by Evaluation Panel:\n"
                  "1. _____________________________________________________________________________\n"
                  "2. _____________________________________________________________________________\n"
                  "3. _____________________________________________________________________________\n"
                  "4. _____________________________________________________________________________\n"
                  "5. _____________________________________________________________________________")
    
    doc.add_page_break()
    
    # =========================================================================
    # PAGE 3: ACKNOWLEDGMENT
    # =========================================================================
    p_ack_h = doc.add_paragraph()
    p_ack_h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_ah = p_ack_h.add_run("ACKNOWLEDGMENT\n")
    r_ah.bold = True
    r_ah.font.size = Pt(15)
    
    p_ack_body = doc.add_paragraph()
    p_ack_body.paragraph_format.space_before = Pt(14)
    p_ack_body.paragraph_format.line_spacing = 1.25
    p_ack_body.add_run(
        "I would like to express my profound gratitude and heartfelt appreciation to our respected Head of Department (HOD SOIT), "
        "Ms. Monika Dixit Bajpai, for providing an academically stimulating environment, constant encouragement, and administrative "
        "facilities essential for the development of our Minor Project.\n\n"
        "I am deeply indebted to my project coordinator and esteemed mentor, Mr. Nihal Kumar / Mr. Anushrav Mudgal, "
        "School of Information Technology (SOIT), IMS Noida, for his invaluable guidance, continuous technical mentorship, constructive "
        "critiques, and meticulous scrutiny throughout the conceptualization and documentation of this project. His practical insights "
        "in modern web development and software architecture have been instrumental in shaping this project.\n\n"
        "I also extend my sincere thanks to the panel members, Dr. Ajay Gupta and Ms. Shaili Nigam, as well as the faculty members "
        "and lab staff of the School of Information Technology, IMS Noida, for their continuous support, technical assistance, and insightful suggestions.\n\n"
        "Lastly, I extend my heartfelt thanks to my parents and peers whose constant encouragement, patience, and cooperation provided the strength "
        "to bring this project synopsis to successful completion."
    )
    
    p_ack_sig = doc.add_paragraph()
    p_ack_sig.paragraph_format.space_before = Pt(40)
    p_ack_sig.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_ack_sig.add_run(
        "_________________________\n"
        "[Student Full Name]\n"
        "Roll No.: [University Roll Number]\n"
        "BCA 5th Semester (Batch 2024–2027)\n"
        "School of Information Technology (SOIT)\n"
        "IMS Noida"
    )
    
    doc.add_page_break()
    
    # =========================================================================
    # PAGE 4: CERTIFICATE OF ORIGINALITY
    # =========================================================================
    p_cert_h = doc.add_paragraph()
    p_cert_h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_ch = p_cert_h.add_run("CERTIFICATE OF ORIGINALITY\n")
    r_ch.bold = True
    r_ch.font.size = Pt(15)
    
    p_cert_body = doc.add_paragraph()
    p_cert_body.paragraph_format.space_before = Pt(18)
    p_cert_body.paragraph_format.line_spacing = 1.25
    p_cert_body.add_run(
        "This is to certify that the Minor Project Synopsis report entitled \"HARMONY: ROOMMATE CONFLICT RESOLUTION AND SHARED LIVING MANAGEMENT SYSTEM\", "
        "submitted by [STUDENT NAME], University Roll Number: [ROLL NO.], in partial fulfillment of the requirements for the award of the degree of "
        "Bachelor of Computer Applications (BCA) from Chaudhary Charan Singh University (CCSU), Meerut, is a bonafide record of original work carried out "
        "at the School of Information Technology (SOIT), Institute of Management Studies (IMS), Noida, under my supervision and guidance.\n\n"
        "To the best of my knowledge and belief, the matter embodied in this synopsis report has not formed the basis for the award of any other Degree, "
        "Diploma, Fellowship, or any other similar title in this or any other University or Institution of higher learning.\n\n"
        "The project demonstrates sound software engineering principles, full-stack architectural design, and is approved for presentation and development "
        "during the academic session 2024–2027."
    )
    
    tbl_cert_sig = doc.add_table(rows=1, cols=2)
    tbl_cert_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell_cs_l = tbl_cert_sig.cell(0, 0)
    cell_cs_r = tbl_cert_sig.cell(0, 1)
    cell_cs_l.width = Inches(3.2)
    cell_cs_r.width = Inches(3.3)
    
    p_cs_l = cell_cs_l.paragraphs[0]
    p_cs_l.paragraph_format.space_before = Pt(36)
    p_cs_l.add_run("Date: ____ / ____ / 2026\nPlace: IMS Noida, Sector-62\n\n\n___________________________\nSignature of Student\n([STUDENT NAME])")
    
    p_cs_r = cell_cs_r.paragraphs[0]
    p_cs_r.paragraph_format.space_before = Pt(36)
    p_cs_r.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_cs_r.add_run("\n\n\n___________________________\nSignature of Project Guide\n(Mr. Nihal Kumar / Mr. Anushrav Mudgal)\nAssistant Professor, SOIT\nIMS Noida")
    
    doc.add_page_break()
    
    # =========================================================================
    # PAGE 5: MANDATORY INTERNSHIP COMPLETION CERTIFICATE
    # =========================================================================
    p_int_h = doc.add_paragraph()
    p_int_h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_ih = p_int_h.add_run("INTERNSHIP / TECHNICAL TRAINING COMPLETION CERTIFICATE\n")
    r_ih.bold = True
    r_ih.font.size = Pt(14)
    
    p_int_sub = doc.add_paragraph()
    p_int_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_is = p_int_sub.add_run("(Mandatory Document as per SOIT Project Guidelines)\n")
    r_is.italic = True
    r_is.font.size = Pt(11)
    
    tbl_box = doc.add_table(rows=1, cols=1)
    tbl_box.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell_box = tbl_box.cell(0, 0)
    cell_box.width = Inches(6.5)
    set_cell_margins(cell_box, top=600, bottom=600, left=300, right=300)
    set_cell_background(cell_box, "FAFAFA")
    p_box = cell_box.paragraphs[0]
    p_box.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_inbox = p_box.add_run(
        "\n\n[ ATTACH PHOTOCOPY / PRINTED COLOR COPY OF YOUR\n"
        "OFFICIAL TECHNICAL INTERNSHIP / INDUSTRY TRAINING CERTIFICATE HERE ]\n\n"
        "Organization: IBM Skills Network / Internshala / Edureka / Infosys Springboard / Company Name\n"
        "Domain / Technology: Full Stack Web Development / MERN / Python / Cloud Computing\n"
        "Duration: 4 to 8 Weeks (Summer Internship 2026)\n"
        "Candidate Name: [STUDENT NAME]\n"
        "Roll No.: [ROLL NUMBER]\n\n"
    )
    r_inbox.font.color.rgb = RGBColor(100, 116, 139)
    r_inbox.bold = True
    
    p_box_foot = doc.add_paragraph()
    p_box_foot.paragraph_format.space_before = Pt(14)
    p_box_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_box_foot.add_run("Verified by Project Coordinator: _________________________     Date: _____ / _____ / 2026")
    
    doc.add_page_break()
    
    # =========================================================================
    # PAGE 6: TABLE OF CONTENTS / INDEX
    # =========================================================================
    p_idx_h = doc.add_paragraph()
    p_idx_h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_idx = p_idx_h.add_run("TABLE OF CONTENTS / INDEX\n")
    r_idx.bold = True
    r_idx.font.size = Pt(15)
    
    tbl_idx = doc.add_table(rows=17, cols=3)
    tbl_idx.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_idx.cell(0, 0).width = Inches(0.8)
    tbl_idx.cell(0, 1).width = Inches(4.7)
    tbl_idx.cell(0, 2).width = Inches(1.0)
    
    idx_headers = ["S.No.", "Topic / Chapter Title", "Page No."]
    for c_i, h_text in enumerate(idx_headers):
        c = tbl_idx.cell(0, c_i)
        set_cell_background(c, "E2E8F0")
        set_cell_margins(c, 80, 80, 80, 80)
        p = c.paragraphs[0]
        r = p.add_run(h_text)
        r.bold = True
        r.font.size = Pt(11)
        if c_i == 2:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
            
    index_rows = [
        ("—", "Proforma for Approval of BCA Minor Project", "ii"),
        ("—", "Acknowledgment", "iii"),
        ("—", "Certificate of Originality", "iv"),
        ("—", "Internship Completion Letter / Certificate", "v"),
        ("1", "Introduction / Overview of the Project", "1"),
        ("2", "Performance of the Project", "3"),
        ("3", "Project Architecture", "5"),
        ("4", "Project Flow", "7"),
        ("5", "Data Flow Diagrams (DFDs) - Overview", "8"),
        ("   5.1", "Level 0 DFD (Context Diagram) [Separate Page]", "9"),
        ("   5.2", "Level 1 DFD (Sub-System Functional Decomposition) [Separate Page]", "10"),
        ("   5.3", "Level 2 DFD (Transaction & Calculation Processing) [Separate Page]", "11"),
        ("6", "Use Case Diagram", "12"),
        ("7", "Entity Relationship Diagram (ERD)", "14"),
        ("8", "Hardware and Software Requirements", "16"),
        ("9", "Future Scope", "18"),
    ]
    for r_i, (sno, title, pageno) in enumerate(index_rows, start=1):
        c0 = tbl_idx.cell(r_i, 0)
        c1 = tbl_idx.cell(r_i, 1)
        c2 = tbl_idx.cell(r_i, 2)
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)
        set_cell_margins(c2, 60, 60, 80, 80)
        c0.paragraphs[0].add_run(sno).font.size = Pt(10.5)
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(title)
        r1.font.size = Pt(10.5)
        if sno.strip() in ["1","2","3","4","5","6","7","8","9"]:
            r1.bold = True
        p2 = c2.paragraphs[0]
        p2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p2.add_run(pageno).font.size = Pt(10.5)
        
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 1: INTRODUCTION / OVERVIEW OF THE PROJECT
    # =========================================================================
    h1 = doc.add_heading("1. Introduction / Overview of the Project", level=1)
    h1.style.font.color.rgb = RGBColor(17, 24, 39)
    
    doc.add_heading("1.1 Problem Background", level=2)
    doc.add_paragraph(
        "In shared residential accommodations such as student flats, paying guest (PG) apartments, and shared bachelor homes, "
        "interpersonal conflicts frequently arise over two core issues: the division of household chores and the equitable splitting of shared living expenses. "
        "Traditionally, roommates rely on informal verbal agreements, manual whiteboard tallies, or disparate point solutions like isolated instant-messaging groups "
        "and basic split-bill calculators. These fragmented methods lack persistence, transparency, accountability, and unified visibility."
    )
    doc.add_paragraph(
        "Over time, subtle cognitive biases emerge: individuals routinely overestimate their own contributions to household maintenance while underestimating the efforts of others. "
        "Similarly, shared bills (such as broadband internet, electricity, domestic gas cylinders, and bulk grocery purchases) paid by a single individual frequently lead to "
        "unsettled dues, disputed amounts, and uncomfortable personal confrontations. The resulting friction causes domestic toxicity and social disputes."
    )
    
    doc.add_heading("1.2 Solution Overview", level=2)
    doc.add_paragraph(
        "\"HARMONY\" is an integrated, full-stack shared-household management web platform engineered to eliminate domestic roommate friction through computational transparency. "
        "The system provides a unified digital ecosystem where roommates join a dedicated private household space using a unique cryptographic invite code. "
        "Within this shared workspace, members log chores, earn verified contribution points upon task completion, register common shared expenditures, "
        "and automatically calculate exact mathematical allocations."
    )
    doc.add_paragraph(
        "Rather than relying on ungrounded psychological claims or opaque machine learning models, HARMONY resolves conflicts through algorithmic accountability: "
        "all household operations are persisted in a relational PostgreSQL database and aggregated on an intuitive dashboard. By rendering an objective, visual comparison "
        "of physical effort (chore points) and financial contribution (net monetary balance), the platform replaces subjective emotional disputes with indisputable empirical records."
    )
    
    doc.add_heading("1.3 Primary Objectives of the Project", level=2)
    objs = [
        ("Centralized Household Onboarding: ", "To provide a secure multi-tenant household system enabling users to establish or join shared living groups via automated invite tokens."),
        ("Gamified Chore Accountability: ", "To engineer a chore management engine supporting task creation, point weighting, assignment, and verified completion tracking."),
        ("Automated Relational Expense Splitting: ", "To implement an exact mathematical splitting model utilizing a relational junction table structure, computing net debits and credits per roommate."),
        ("Dual-Metric Visual Dashboard: ", "To deliver an interactive, responsive dashboard offering real-time analytical charts that separate financial contributions from domestic labor effort."),
        ("Role-Based Administrative Governance: ", "To establish granular role-based access control (RBAC), enabling household administrators to manage memberships, arbitrate disputed entries, and curate categories."),
        ("Production Cloud Deployment at Zero Cost: ", "To construct an enterprise-grade three-tier architecture fully deployable on public free-tier cloud infrastructure (Vercel, Render, Supabase) with zero financial expenditure.")
    ]
    for b_title, b_desc in objs:
        p = doc.add_paragraph(style='List Bullet')
        r_t = p.add_run(b_title)
        r_t.bold = True
        p.add_run(b_desc)
        
    # =========================================================================
    # SECTION 2: PERFORMANCE OF THE PROJECT
    # =========================================================================
    doc.add_heading("2. Performance of the Project", level=1)
    
    doc.add_heading("2.1 Feasibility Analysis", level=2)
    doc.add_paragraph(
        "Prior to software engineering development, a four-dimensional feasibility study was conducted to guarantee academic viability and technical robustness:"
    )
    feasList = [
        ("Technical Feasibility: ", "The platform is constructed with modern, industry-standard web technologies: React.js (Vite), Node.js, Express.js REST APIs, and PostgreSQL managed by Supabase. These technologies possess comprehensive documentation, robust open-source ecosystems, extensive community troubleshooting resources, and native compatibility with modern cloud virtualization."),
        ("Operational Feasibility: ", "The target audience (college students, working roommates) requires minimal onboarding friction. The user interface utilizes responsive mobile-first Tailwind CSS components, standard email authentication, and one-click invite code joining, guaranteeing zero administrative training requirements."),
        ("Economic Feasibility (Target Cost = ₹0): ", "The architectural design strictly leverages non-commercial free-tier tiers: Vercel Hobby (frontend hosting), Render Web Services (Node.js API hosting), Supabase Free Tier (PostgreSQL and managed authentication), and GitHub Free. No capital outlay, licensing fees, or third-party API subscriptions are incurred."),
        ("Scheduling Feasibility: ", "The development lifecycle is strategically phased across the official 17-day development window (October 7–23, 2026), incorporating strict MVP freeze milestones prior to the October 24th live deployment review.")
    ]
    for f_title, f_desc in feasList:
        p = doc.add_paragraph(style='List Bullet')
        r = p.add_run(f_title)
        r.bold = True
        p.add_run(f_desc)
        
    doc.add_heading("2.2 Operational Benefits and Impact", level=2)
    doc.add_paragraph(
        "By migrating shared living chores and bills to HARMONY, residential groups experience significant measurable improvements: "
        "(1) 100% elimination of bill-splitting arithmetic errors; (2) Instant dispute resolution via permanent transactional audit trails; "
        "(3) Equitable distribution of domestic maintenance tasks through publicly visible chore points; and (4) Proactive warning of asymmetric financial dues before month-end lease settlement."
    )
    
    doc.add_heading("2.3 User Capacity, Latency, and Scalability Benchmarks", level=2)
    tbl_perf = doc.add_table(rows=6, cols=3)
    tbl_perf.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_perf.cell(0, 0).width = Inches(2.2)
    tbl_perf.cell(0, 1).width = Inches(2.0)
    tbl_perf.cell(0, 2).width = Inches(2.3)
    p_headers = ["Performance Metric", "Measured / Target Value", "Architectural Benchmark Justification"]
    for c_i, h_text in enumerate(p_headers):
        c = tbl_perf.cell(0, c_i)
        set_cell_background(c, "E2E8F0")
        set_cell_margins(c, 80, 80, 80, 80)
        p = c.paragraphs[0]
        r = p.add_run(h_text)
        r.bold = True
        r.font.size = Pt(10.5)
        
    perf_metrics = [
        ("Client Page Render (LCP)", "< 1.2 seconds", "Vite build tree-shaking and Vercel Global Edge CDN caching"),
        ("API Response Time (Warm)", "< 250 milliseconds", "Stateless Express middleware and optimized indexed PostgreSQL queries"),
        ("Render Cold-Start Latency", "45 - 60 seconds", "Render Free tier spin-down after 15 min idle (mitigated via pre-warm ping)"),
        ("Database Transaction Latency", "< 80 milliseconds", "Supabase PostgreSQL hosted in Asia-South (Mumbai) cloud region"),
        ("Concurrent User Capacity", "50+ concurrent users", "Single Node.js asynchronous event loop; adequate for collegiate scale")
    ]
    for r_i, (m, v, j) in enumerate(perf_metrics, start=1):
        c0 = tbl_perf.cell(r_i, 0)
        c1 = tbl_perf.cell(r_i, 1)
        c2 = tbl_perf.cell(r_i, 2)
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)
        set_cell_margins(c2, 60, 60, 80, 80)
        c0.paragraphs[0].add_run(m).bold = True
        c1.paragraphs[0].add_run(v)
        c2.paragraphs[0].add_run(j)
        
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 3: PROJECT ARCHITECTURE
    # =========================================================================
    doc.add_heading("3. Project Architecture", level=1)
    doc.add_paragraph(
        "HARMONY is engineered following the classical, robust Three-Tier Architectural Pattern. "
        "This structural separation isolates presentation concerns from application business logic and data persistence, "
        "ensuring modularity, maintainability, and academic defensibility during viva examination."
    )
    
    arch_tiers = [
        ("Tier 1: Client Presentation Tier (Frontend)",
         "Implemented using React.js 18 bootstrapped with Vite and styled via Tailwind CSS. "
         "This tier runs entirely inside the user's web browser, executing client-side routing (React Router DOM), "
         "managing transient state (React Hooks / Context), handling form validation, and rendering interactive data visualizations via Recharts. "
         "It communicates strictly with Tier 2 over secure HTTPS using asynchronous REST calls (Fetch / Axios). Hosted on Vercel Edge Network."),
        ("Tier 2: Application Logic & API Tier (Backend)",
         "Implemented as a Node.js runtime executing an Express.js web server. This tier acts as the centralized controller and security gatekeeper. "
         "Key responsibilities include: JWT authentication verification middleware, request payload sanitization and validation, "
         "mathematical computation of equal and custom expense splits, chore point aggregation, role-based authorization verification, "
         "and structured JSON API delivery. Hosted on Render Web Services."),
        ("Tier 3: Database & Persistence Tier (Data Layer)",
         "Implemented using PostgreSQL 15 managed via Supabase. This relational tier guarantees strict ACID compliance. "
         "It enforces referential integrity via primary and foreign key constraints, resolves M:N entity relationships through normalized junction tables, "
         "and executes low-latency query indexing. Sensitive user authentication credentials are securely managed via Supabase Auth's Bcrypt hashing mechanism.")
    ]
    for t_name, t_desc in arch_tiers:
        p_t = doc.add_paragraph()
        r_t = p_t.add_run(t_name + "\n")
        r_t.bold = True
        r_t.font.color.rgb = RGBColor(30, 58, 138)
        p_t.add_run(t_desc)
        
    doc.add_heading("3.1 Architectural Flow Diagram (Mermaid Syntax)", level=2)
    doc.add_paragraph("The interaction between the three independent architectural layers is formally represented below:")
    
    arch_mermaid = (
        "graph TD\n"
        "    subgraph Client [Tier 1: Presentation Tier - Vercel]\n"
        "        UI[Browser Client / React.js SPA]\n"
        "        Tailwind[Tailwind CSS UI Components]\n"
        "        Recharts[Recharts Analytics Engine]\n"
        "    end\n\n"
        "    subgraph Server [Tier 2: Application Tier - Render]\n"
        "        API[Express.js REST API Server]\n"
        "        AuthMid[Auth & Token Verification Middleware]\n"
        "        SplitCalc[Expense Split & Balance Calculator]\n"
        "        ChoreEng[Chore & Points Aggregation Engine]\n"
        "    end\n\n"
        "    subgraph Database [Tier 3: Data Persistence Tier - Supabase]\n"
        "        SupaAuth[(Supabase Auth Service)]\n"
        "        Postgres[(PostgreSQL Relational DB)]\n"
        "        Tables[profiles | households | tasks | expenses | expense_splits]\n"
        "    end\n\n"
        "    UI -->|HTTPS / JSON REST API| API\n"
        "    API --> AuthMid\n"
        "    AuthMid --> SplitCalc\n"
        "    AuthMid --> ChoreEng\n"
        "    API -->|Auth Verification| SupaAuth\n"
        "    SplitCalc -->|Parameterized SQL Queries| Postgres\n"
        "    ChoreEng -->|CRUD Operations| Postgres\n"
    )
    p_code = doc.add_paragraph()
    r_code = p_code.add_run(arch_mermaid)
    r_code.font.name = 'Consolas'
    r_code.font.size = Pt(9.5)
    
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 4: PROJECT FLOW
    # =========================================================================
    doc.add_heading("4. Project Flow", level=1)
    doc.add_paragraph(
        "The operational lifecycle of HARMONY guides users through a structured state progression, "
        "from initial registration to collaborative household task execution and financial reconciliation."
    )
    
    flow_steps = [
        ("Step 1: Public Onboarding & Authentication: ", "A visitor lands on the public home page and accesses the authentication portal. They register with full name, email, and password. The system calls Supabase Auth, securely hashing the credentials and establishing a verified session token."),
        ("Step 2: Household Initialization or Association: ", "Upon initial login, the user is prompted to either (a) Create a new household (system auto-generates a unique 6-character alphanumeric invite code, assigning the creator the 'Admin' role), or (b) Join an existing household by entering a valid invite code."),
        ("Step 3: Chore Management & Verification Workflow: ", "Any household member can post a domestic task specifying category (Kitchen, Cleaning, Grocery), point weight (e.g., 20 pts), and due date. When completed, the member marks the task done, instantly updating individual contribution points."),
        ("Step 4: Shared Expense Logging & Split Computation: ", "When a shared purchase occurs (e.g., ₹2,400 monthly electricity), the paying roommate logs the bill, attaches category, and designates participating roommates. The backend instantly calculates equal allocations (₹600 per person) and persists discrete debt records."),
        ("Step 5: Dashboard Balance Aggregation & Visual Rendering: ", "The dashboard queries the database to compute net balances (Total Paid - Expected Share) and render chore contribution charts, visually indicating whether the living space is balanced or skewed."),
        ("Step 6: Administrative Supervision & Record Archival: ", "The household admin accesses the control panel to view audit logs, adjust membership, manage chore categories, or remove inactive roommates.")
    ]
    for st_title, st_desc in flow_steps:
        p = doc.add_paragraph(style='List Bullet')
        r = p.add_run(st_title)
        r.bold = True
        p.add_run(st_desc)
        
    doc.add_heading("4.1 End-to-End System Flowchart (Mermaid Syntax)", level=2)
    flow_mermaid = (
        "flowchart TD\n"
        "    Start([User Visits Application]) --> AuthCheck{Authenticated?}\n"
        "    AuthCheck -- No --> AuthModal[Register / Login via Supabase]\n"
        "    AuthModal --> AuthCheck\n"
        "    AuthCheck -- Yes --> HouseCheck{Belongs to Household?}\n"
        "    HouseCheck -- No --> HouseChoice{Create or Join?}\n"
        "    HouseChoice -- Create --> GenCode[Create Household & Generate Invite Code]\n"
        "    HouseChoice -- Join --> InputCode[Enter Invite Code & Join Household]\n"
        "    GenCode --> MainDash[Access Main Household Dashboard]\n"
        "    InputCode --> MainDash\n"
        "    HouseCheck -- Yes --> MainDash\n\n"
        "    MainDash --> ActionChoice{Select Operation}\n"
        "    ActionChoice -- Log Chore --> CreateChore[Create Chore Task & Set Points]\n"
        "    CreateChore --> CompleteChore[Mark Complete -> Update User Points]\n"
        "    CompleteChore --> RefreshDash[Recalculate Dashboard Stats]\n\n"
        "    ActionChoice -- Log Expense --> AddExpense[Enter Amount, Payer & Participants]\n"
        "    AddExpense --> ExecSplit[Backend Computes Equal Split: T / N]\n"
        "    ExecSplit --> StoreSplits[Persist Records in expense_splits Table]\n"
        "    StoreSplits --> RefreshDash\n\n"
        "    ActionChoice -- View Admin --> CheckAdmin{Role == Admin?}\n"
        "    CheckAdmin -- Yes --> AdminPanel[Manage Members, Tasks & Audit Records]\n"
        "    CheckAdmin -- No --> AccessDenied[Display 403 Forbidden Toast]\n"
        "    RefreshDash --> MainDash\n"
    )
    p_fcode = doc.add_paragraph()
    r_fcode = p_fcode.add_run(flow_mermaid)
    r_fcode.font.name = 'Consolas'
    r_fcode.font.size = Pt(9.5)
    
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 5: DATA FLOW DIAGRAMS (MANDATORY: EACH ON A SEPARATE PAGE)
    # =========================================================================
    # 5.1 Level 0 DFD (Page 9)
    doc.add_heading("5. Data Flow Diagrams (DFDs)", level=1)
    doc.add_heading("5.1 Level 0 DFD (Context Diagram)", level=2)
    add_callout_box(doc, "Per college examination guidelines, each DFD level is presented on an isolated page to facilitate physical verification and examiner review.", "MANDATORY EXAM REQUIREMENT")
    
    doc.add_paragraph(
        "The Level 0 Context Diagram establishes the foundational boundaries of HARMONY. "
        "It models the entire platform as a single centralized software entity (Process 0.0) interacting with external real-world actors: "
        "the Roommate (Normal User), the Household Administrator, and the External Cloud Services (Supabase Auth / PostgreSQL)."
    )
    
    dfd0_mermaid = (
        "graph TD\n"
        "    User[Roommate / User] <-->|Credentials / Tasks / Expenses / View Dashboard| System((0.0 HARMONY Shared Living System))\n"
        "    Admin[Household Admin] <-->|Admin Commands / Membership Controls / Audit Requests| System\n"
        "    System <-->|Auth Tokens / SQL Queries / State Persistence| DB[(Supabase PostgreSQL Data Store)]\n"
    )
    p_d0 = doc.add_paragraph()
    r_d0 = p_d0.add_run(dfd0_mermaid)
    r_d0.font.name = 'Consolas'
    r_d0.font.size = Pt(10)
    
    doc.add_paragraph(
        "Data Inflow: User credentials, task completion flags, bill amounts, category designations, invite codes.\n"
        "Data Outflow: Authenticated session state, chore point tallies, mathematical split debts, visual charts, system audit summaries."
    )
    
    doc.add_page_break()
    
    # 5.2 Level 1 DFD (Page 10)
    doc.add_heading("5.2 Level 1 DFD (Sub-System Decomposition)", level=2)
    doc.add_paragraph(
        "The Level 1 Data Flow Diagram decomposes the root system into four foundational functional subsystems: "
        "(1.0) Authentication & Profile Management, (2.0) Household & Membership Management, "
        "(3.0) Chore Tracking & Point Allocation Engine, and (4.0) Expense Allocation & Financial Balance Engine. "
        "It explicitly illustrates data exchanges between processes and physical database stores (D1 to D5)."
    )
    
    dfd1_mermaid = (
        "graph TD\n"
        "    User[Roommate / Admin]\n\n"
        "    subgraph Processes\n"
        "        P1((1.0 Auth & Profile Engine))\n"
        "        P2((2.0 Household & Member Engine))\n"
        "        P3((3.0 Chore & Point Engine))\n"
        "        P4((4.0 Expense Split Engine))\n"
        "        P5((5.0 Dashboard Aggregator))\n"
        "    end\n\n"
        "    subgraph Data Stores\n"
        "        D1[(D1: profiles)]\n"
        "        D2[(D2: households & members)]\n"
        "        D3[(D3: tasks)]\n"
        "        D4[(D4: expenses)]\n"
        "        D5[(D5: expense_splits)]\n"
        "    end\n\n"
        "    User -->|Sign In / Sign Up| P1\n"
        "    P1 <-->|Read / Write Profiles| D1\n"
        "    P1 -->|User Context| P2\n"
        "    User -->|Create / Join Household| P2\n"
        "    P2 <-->|Manage Group Data| D2\n"
        "    User -->|Log / Complete Chore| P3\n"
        "    P3 <-->|Record Tasks & Points| D3\n"
        "    User -->|Submit Bill & Participants| P4\n"
        "    P4 -->|Write Expense Header| D4\n"
        "    P4 -->|Compute & Write Splits| D5\n"
        "    D3 -.->|Chore Points Data| P5\n"
        "    D4 -.->|Expense Totals| P5\n"
        "    D5 -.->|User Debits/Credits| P5\n"
        "    P5 -->|Render Charts & Stats| User\n"
    )
    p_d1 = doc.add_paragraph()
    r_d1 = p_d1.add_run(dfd1_mermaid)
    r_d1.font.name = 'Consolas'
    r_d1.font.size = Pt(9.5)
    
    doc.add_page_break()
    
    # 5.3 Level 2 DFD (Page 11)
    doc.add_heading("5.3 Level 2 DFD (Expense Calculation & Balance Processing)", level=2)
    doc.add_paragraph(
        "The Level 2 Data Flow Diagram provides an exhaustive functional explosion of the system's core business transaction: "
        "Process 4.0 (Expense Allocation & Balance Engine). It models the granular atomic steps involved from bill submission to "
        "database persistence and net financial balance recalculation."
    )
    
    dfd2_mermaid = (
        "graph TD\n"
        "    User[Payer / Roommate]\n"
        "    P4_1((4.1 Validate Bill Payload & Participants))\n"
        "    P4_2((4.2 Store Master Expense Header))\n"
        "    P4_3((4.3 Compute Equal Share: T / N))\n"
        "    P4_4((4.4 Persist Individual Splits))\n"
        "    P4_5((4.5 Aggregate Net Balances))\n"
        "    \n"
        "    D4[(D4: expenses Table)]\n"
        "    D5[(D5: expense_splits Table)]\n"
        "    Dash[Dashboard View Engine]\n\n"
        "    User -->|Amount, Description, Member IDs| P4_1\n"
        "    P4_1 -->|Sanitized Master Data| P4_2\n"
        "    P4_2 -->|Insert Record -> Return expense_id| D4\n"
        "    P4_2 -->|Trigger Computation| P4_3\n"
        "    P4_3 -->|Array of {user_id, share_amount}| P4_4\n"
        "    P4_4 -->|Batch Insert Split Rows| D5\n"
        "    D4 -->|Total Paid by User| P4_5\n"
        "    D5 -->|Total Expected Share of User| P4_5\n"
        "    P4_5 -->|Net Balance = Paid - Expected| Dash\n"
    )
    p_d2 = doc.add_paragraph()
    r_d2 = p_d2.add_run(dfd2_mermaid)
    r_d2.font.name = 'Consolas'
    r_d2.font.size = Pt(9.5)
    
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 6: USE CASE DIAGRAM
    # =========================================================================
    doc.add_heading("6. Use Case Diagram", level=1)
    doc.add_paragraph(
        "The Use Case Diagram defines the behavioral capabilities of HARMONY, capturing the functional interactions "
        "between the primary human actors (Roommate and Household Admin) and the automated background system services."
    )
    
    doc.add_heading("6.1 Actor Specifications", level=2)
    actors = [
        ("Roommate (Standard User): ", "Authenticated flat resident capable of joining a household, logging tasks, completing chores, creating shared expenses, and viewing the personal dashboard."),
        ("Household Admin (Privileged User): ", "Creator/Manager of the household possessing elevated permissions to generate/regenerate invite codes, remove members, delete anomalous expense records, and edit chore categories."),
        ("System / Cloud Services: ", "Automated background processes handling session token lifecycle, database constraint validation, and aggregate mathematical calculations.")
    ]
    for a_t, a_d in actors:
        p = doc.add_paragraph(style='List Bullet')
        r = p.add_run(a_t)
        r.bold = True
        p.add_run(a_d)
        
    doc.add_heading("6.2 Use Case Diagram (Mermaid Syntax)", level=2)
    uc_mermaid = (
        "graph LR\n"
        "    subgraph Actors\n"
        "        User[Standard Roommate]\n"
        "        Admin[Household Admin]\n"
        "        Sys[System / Supabase]\n"
        "    end\n\n"
        "    subgraph HARMONY Platform Use Cases\n"
        "        UC1((Register & Login))\n"
        "        UC2((Join Household via Code))\n"
        "        UC3((Create Household))\n"
        "        UC4((Post Domestic Chore))\n"
        "        UC5((Mark Chore Complete))\n"
        "        UC6((Submit Shared Expense))\n"
        "        UC7((Compute & View Splits))\n"
        "        UC8((View Dual-Metric Dashboard))\n"
        "        UC9((Remove Inactive Member))\n"
        "        UC10((Arbitrate Disputed Records))\n"
        "        UC11((Enforce Relational Integrity))\n"
        "    end\n\n"
        "    User --> UC1\n"
        "    User --> UC2\n"
        "    User --> UC4\n"
        "    User --> UC5\n"
        "    User --> UC6\n"
        "    User --> UC7\n"
        "    User --> UC8\n\n"
        "    Admin --> UC1\n"
        "    Admin --> UC3\n"
        "    Admin --> UC8\n"
        "    Admin --> UC9\n"
        "    Admin --> UC10\n\n"
        "    UC1 -.-> Sys\n"
        "    UC6 -.->|<<include>>| UC7\n"
        "    UC7 -.-> Sys\n"
        "    UC11 -.-> Sys\n"
    )
    p_uc = doc.add_paragraph()
    r_uc = p_uc.add_run(uc_mermaid)
    r_uc.font.name = 'Consolas'
    r_uc.font.size = Pt(9.5)
    
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 7: ENTITY RELATIONSHIP DIAGRAM (ERD)
    # =========================================================================
    doc.add_heading("7. Entity Relationship Diagram (ERD)", level=1)
    doc.add_paragraph(
        "The relational database schema is modeled to third normal form (3NF), ensuring zero redundant data anomalies "
        "while supporting fast transactional reads. The schema consists of six core entities, including junction tables "
        "specifically engineered to resolve Many-to-Many (M:N) relational mappings."
    )
    
    doc.add_heading("7.1 Relational Entity Specifications", level=2)
    tbl_erd_desc = doc.add_table(rows=7, cols=3)
    tbl_erd_desc.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_erd_desc.cell(0, 0).width = Inches(1.8)
    tbl_erd_desc.cell(0, 1).width = Inches(1.8)
    tbl_erd_desc.cell(0, 2).width = Inches(2.9)
    for c_i, h in enumerate(["Entity / Table", "Keys & Constraints", "Semantic Description"]):
        c = tbl_erd_desc.cell(0, c_i)
        set_cell_background(c, "E2E8F0")
        set_cell_margins(c, 80, 80, 80, 80)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.bold = True
        r.font.size = Pt(10.5)
        
    erd_specs = [
        ("profiles", "PK: id (UUID)\nFK: id references auth.users", "Stores user profile metadata (full name, email, avatar, system role)."),
        ("households", "PK: id (UUID)\nFK: created_by -> profiles(id)\nUnique: invite_code", "Defines the shared living collective, house name, and unique access code."),
        ("household_members", "PK: id (UUID)\nFK1: household_id -> households\nFK2: user_id -> profiles\nUnique: (household_id, user_id)", "Junction table resolving M:N relationship between users and households; assigns roles."),
        ("tasks", "PK: id (UUID)\nFK1: household_id\nFK2: assigned_to -> profiles\nFK3: completed_by -> profiles", "Chore entity storing title, point weight, category, status (PENDING/COMPLETED), and due date."),
        ("expenses", "PK: id (UUID)\nFK1: household_id\nFK2: paid_by -> profiles", "Master bill record storing description, total monetary amount, payment date, and paying user."),
        ("expense_splits", "PK: id (UUID)\nFK1: expense_id -> expenses\nFK2: user_id -> profiles", "Junction table resolving M:N relationship between expenses and roommates; records individual owed debt.")
    ]
    for r_i, (ent, keys, desc) in enumerate(erd_specs, start=1):
        c0 = tbl_erd_desc.cell(r_i, 0)
        c1 = tbl_erd_desc.cell(r_i, 1)
        c2 = tbl_erd_desc.cell(r_i, 2)
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)
        set_cell_margins(c2, 60, 60, 80, 80)
        c0.paragraphs[0].add_run(ent).bold = True
        c1.paragraphs[0].add_run(keys)
        c2.paragraphs[0].add_run(desc)
        
    doc.add_heading("7.2 ER Diagram Schema (Mermaid Syntax)", level=2)
    erd_mermaid = (
        "erDiagram\n"
        "    PROFILES ||--o{ HOUSEHOLD_MEMBERS : \"belongs to\"\n"
        "    HOUSEHOLDS ||--|{ HOUSEHOLD_MEMBERS : \"has members\"\n"
        "    HOUSEHOLDS ||--o{ TASKS : \"contains chores\"\n"
        "    PROFILES ||--o{ TASKS : \"assigned / completed\"\n"
        "    HOUSEHOLDS ||--o{ EXPENSES : \"registers bills\"\n"
        "    PROFILES ||--o{ EXPENSES : \"paid by\"\n"
        "    EXPENSES ||--|{ EXPENSE_SPLITS : \"split into\"\n"
        "    PROFILES ||--o{ EXPENSE_SPLITS : \"allocated share to\"\n\n"
        "    PROFILES {\n"
        "        uuid id PK\n"
        "        string email\n"
        "        string full_name\n"
        "        string role\n"
        "        timestamp created_at\n"
        "    }\n"
        "    HOUSEHOLDS {\n"
        "        uuid id PK\n"
        "        string name\n"
        "        string invite_code UK\n"
        "        uuid created_by FK\n"
        "        timestamp created_at\n"
        "    }\n"
        "    HOUSEHOLD_MEMBERS {\n"
        "        uuid id PK\n"
        "        uuid household_id FK\n"
        "        uuid user_id FK\n"
        "        string role\n"
        "        timestamp joined_at\n"
        "    }\n"
        "    TASKS {\n"
        "        uuid id PK\n"
        "        uuid household_id FK\n"
        "        string title\n"
        "        string category\n"
        "        integer points\n"
        "        uuid assigned_to FK\n"
        "        uuid completed_by FK\n"
        "        string status\n"
        "        timestamp due_date\n"
        "    }\n"
        "    EXPENSES {\n"
        "        uuid id PK\n"
        "        uuid household_id FK\n"
        "        uuid paid_by FK\n"
        "        string description\n"
        "        decimal amount\n"
        "        string category\n"
        "        timestamp expense_date\n"
        "    }\n"
        "    EXPENSE_SPLITS {\n"
        "        uuid id PK\n"
        "        uuid expense_id FK\n"
        "        uuid user_id FK\n"
        "        decimal share_amount\n"
        "    }\n"
    )
    p_erd = doc.add_paragraph()
    r_erd = p_erd.add_run(erd_mermaid)
    r_erd.font.name = 'Consolas'
    r_erd.font.size = Pt(9)
    
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 8: HARDWARE AND SOFTWARE REQUIREMENTS
    # =========================================================================
    doc.add_heading("8. Hardware and Software Requirements", level=1)
    doc.add_paragraph(
        "To establish complete reproducibility across both development workstations and production deployment targets, "
        "the exact hardware and software specifications are tabulated below."
    )
    
    doc.add_heading("8.1 Hardware Specifications", level=2)
    tbl_hw = doc.add_table(rows=5, cols=3)
    tbl_hw.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_hw.cell(0, 0).width = Inches(2.0)
    tbl_hw.cell(0, 1).width = Inches(2.2)
    tbl_hw.cell(0, 2).width = Inches(2.3)
    for c_i, h in enumerate(["Component", "Development Machine Minimum", "Target User Client Minimum"]):
        c = tbl_hw.cell(0, c_i)
        set_cell_background(c, "E2E8F0")
        set_cell_margins(c, 80, 80, 80, 80)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.bold = True
        r.font.size = Pt(10.5)
        
    hw_rows = [
        ("Processor", "Intel Core i5 / AMD Ryzen 5 (4 Cores / 8 Threads+)", "Dual-Core 1.5 GHz or modern smartphone CPU"),
        ("System RAM", "8 GB DDR4 (16 GB Recommended for Docker/VMs)", "2 GB RAM (Any modern device)"),
        ("Hard Disk Storage", "256 GB NVMe SSD (Minimum 5 GB free space)", "Standard browser cache (< 50 MB)"),
        ("Network Connectivity", "Broadband Internet (10 Mbps+ continuous uplink)", "Standard 4G / 5G / Wi-Fi Internet connectivity")
    ]
    for r_i, (comp, dev, client) in enumerate(hw_rows, start=1):
        c0 = tbl_hw.cell(r_i, 0)
        c1 = tbl_hw.cell(r_i, 1)
        c2 = tbl_hw.cell(r_i, 2)
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)
        set_cell_margins(c2, 60, 60, 80, 80)
        c0.paragraphs[0].add_run(comp).bold = True
        c1.paragraphs[0].add_run(dev)
        c2.paragraphs[0].add_run(client)
        
    doc.add_heading("8.2 Software & Technology Stack Specifications", level=2)
    tbl_sw = doc.add_table(rows=9, cols=3)
    tbl_sw.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sw.cell(0, 0).width = Inches(1.8)
    tbl_sw.cell(0, 1).width = Inches(2.2)
    tbl_sw.cell(0, 2).width = Inches(2.5)
    for c_i, h in enumerate(["Layer / Tool", "Selected Technology", "Role / Academic Justification"]):
        c = tbl_sw.cell(0, c_i)
        set_cell_background(c, "E2E8F0")
        set_cell_margins(c, 80, 80, 80, 80)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.bold = True
        r.font.size = Pt(10.5)
        
    sw_rows = [
        ("Operating System", "Windows 11 / Ubuntu 22.04 LTS / macOS", "Cross-platform development environments"),
        ("Frontend Framework", "React.js 18.x + Vite", "High-performance Single Page Application (SPA) architecture"),
        ("Styling Framework", "Tailwind CSS v3.x", "Utility-first responsive design framework"),
        ("Data Visualization", "Recharts Library", "SVG-based interactive charts for contributions & debts"),
        ("Backend Runtime & API", "Node.js (v20.x LTS) + Express.js", "Asynchronous, event-driven REST API server"),
        ("Database Engine", "PostgreSQL 15 (Supabase Hosted)", "ACID-compliant relational database management"),
        ("Authentication Engine", "Supabase Auth (Bcrypt + JWT)", "Secure session lifecycle and identity verification"),
        ("Deployment Targets", "Vercel (UI) + Render (API) + Supabase", "100% Free-tier public HTTPS cloud deployment infrastructure")
    ]
    for r_i, (layer, tech, role) in enumerate(sw_rows, start=1):
        c0 = tbl_sw.cell(r_i, 0)
        c1 = tbl_sw.cell(r_i, 1)
        c2 = tbl_sw.cell(r_i, 2)
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)
        set_cell_margins(c2, 60, 60, 80, 80)
        c0.paragraphs[0].add_run(layer).bold = True
        c1.paragraphs[0].add_run(tech)
        c2.paragraphs[0].add_run(role)
        
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 9: FUTURE SCOPE
    # =========================================================================
    doc.add_heading("9. Future Scope", level=1)
    doc.add_paragraph(
        "While the current Minimum Viable Product (MVP) deliberately freezes scope to guarantee flawless deployment "
        "and viva performance, the underlying modular architecture supports several high-impact engineering expansions:"
    )
    
    future_items = [
        ("1. Cross-Platform Mobile Application (React Native / Flutter): ",
         "Developing native mobile applications for iOS and Android, taking advantage of push notifications to alert roommates when chores are due or shared bills are generated."),
        ("2. Automated UPI Deep-Linking & Instant Debt Settlement: ",
         "Integrating Indian Unified Payments Interface (UPI) deep-linking (e.g., `upi://pay?pa=...&am=...`), allowing indebted roommates to clear balances directly through Google Pay, PhonePe, or Paytm with automatic cryptographic receipt verification."),
        ("3. AI-Powered Fair Chore Recommendation & Predictive Scheduling: ",
         "Implementing machine learning models that analyze historical completion velocity, exam schedules, and user preferences to dynamically assign chores, preventing burnout and chore neglect."),
        ("4. Optical Character Recognition (OCR) Bill Scanning: ",
         "Integrating computer vision APIs (e.g., Tesseract OCR or Google Cloud Vision) to extract total amounts, merchant names, and itemized splits automatically from physical receipts and grocery bills."),
        ("5. Automated WhatsApp & Telegram Bot Notifications: ",
         "Integrating webhook-driven messaging bots to dispatch unobtrusive, friendly reminders to roommates regarding pending chores or overdue rent balances without direct personal confrontation."),
        ("6. Multi-Household & Tenancy Support for Landlords / PG Owners: ",
         "Extending the multi-tenant architecture to allow property managers, paying guest owners, and hostel wardens to oversee multiple flats from a single consolidated administrative portal."),
        ("7. Gamification Badges & House Harmony Leaderboard: ",
         "Introducing monthly gamified badges (\"Master Chef\", \"Cleanliness Champion\", \"Prompt Payer\") to positively reinforce collaborative household behavior.")
    ]
    for ft_t, ft_d in future_items:
        p = doc.add_paragraph(style='List Bullet')
        r = p.add_run(ft_t)
        r.bold = True
        p.add_run(ft_d)
        
    # =========================================================================
    # SECTION 10: LIMITATIONS OF THE PROJECT
    # =========================================================================
    doc.add_heading("10. Limitations of the Project", level=1)
    doc.add_paragraph(
        "In compliance with academic engineering rigor, the operational boundaries and architectural constraints "
        "of the MVP are explicitly acknowledged:"
    )
    
    limits = [
        ("1. Dependency on Continuous Internet Connectivity: ",
         "The platform is designed as a cloud-hosted web application; it currently does not incorporate offline-first Progressive Web App (PWA) caching or local IndexedDB synchronization. An active internet connection is mandatory."),
        ("2. Cloud Free-Tier Latency (Render Cold Starts): ",
         "To maintain a ₹0 financial budget, the backend API is hosted on Render's free tier. Idle services spin down after 15 minutes of inactivity, resulting in a 45–60 second delay on initial warm-up requests."),
        ("3. Reliance on Honest Manual Data Logging: ",
         "The system presumes integrity among household members. If a user logs an incorrect bill amount or falsely marks a chore completed without physical verification, the system cannot independently verify real-world accuracy without IoT integration."),
        ("4. Exclusion of Direct In-App Fiat Currency Processing: ",
         "The financial engine computes accounting allocations and net debts; it does not process direct bank transfers or hold escrow balances, avoiding legal, RBI compliance, and payment gateway credential hurdles."),
        ("5. Single-Household Active Context: ",
         "In the current MVP release, a user profile is tied to one active primary household at a time to keep the database state machine straightforward during live academic demonstration.")
    ]
    for lm_t, lm_d in limits:
        p = doc.add_paragraph(style='List Bullet')
        r = p.add_run(lm_t)
        r.bold = True
        p.add_run(lm_d)
        
    doc.add_page_break()
    
    # =========================================================================
    # SECTION 11: FRONT-END PAGES (UI MOCKUPS & SCREEN LAYOUTS)
    # =========================================================================
    doc.add_heading("11. Front-End Pages (UI Mockups & Screen Layouts)", level=1)
    doc.add_paragraph(
        "The user experience is engineered around four primary visual interfaces. "
        "The wireframe schemas and UI component decompositions below outline the structural anatomy of the client application."
    )
    
    screens = [
        ("11.1 Landing / Home Page (`/`)",
         "The public marketing and entry portal introducing the platform's value proposition, key feature cards, and instant authentication call-to-action.",
         [
             ("Header / Navigation Bar", "System logo ('HARMONY'), navigation links (About, Features, Tech Stack), and 'Sign In / Register' buttons."),
             ("Hero Section", "Headline: 'Shared Living Without The Drama', supporting copy, 'Get Started' CTA button, and interactive visual preview card."),
             ("Feature Grid", "3 responsive cards: 'Gamified Chore Tracking', 'Algorithmic Bill Splitting', and 'Transparent Contribution Analytics'."),
             ("Footer", "Academic attribution: BCA 5th Sem Minor Project (BCA-508) | IMS Noida | CCSU Meerut.")
         ]),
        ("11.2 User Login & Registration Portal (`/login`, `/register`)",
         "A clean, secure modal interface providing email/password authentication, validation feedback, and household invitation onboarding.",
         [
             ("Auth Card Container", "Centered card featuring toggle tabs between 'Login to Account' and 'Create Account'."),
             ("Input Fields", "Full Name (registration), Email Address (`@imsnoida.com` / personal), Password, Confirm Password."),
             ("Live Error / Validation Toast", "Inline notification alerting user to invalid credentials, mismatched passwords, or network timeout."),
             ("Submission Action", "Interactive submit button featuring animated loading spinner during Supabase Auth roundtrip.")
         ]),
        ("11.3 Main User Interaction & Analytics Dashboard (`/dashboard`)",
         "The primary command center rendering household overview statistics, dual-metric contribution charts, task boards, and quick-action modals.",
         [
             ("Household Header Bar", "Displays Household Name ('Green Residency'), Invite Code pill badge with one-click copy, and member avatar list."),
             ("KPI Metric Cards", "4 top-row cards: Total Chores Pending, Chores Completed, Total Monthly Shared Expenses, and User Net Balance."),
             ("Dual Analytics Panel", "Left: Recharts Bar Chart showing Chore Points per member. Right: Net Balance Status (Green = Owed / Red = Owes)."),
             ("Recent Activity Feed", "Chronological list of recent chore completions and logged expenses with timestamps and member tags."),
             ("Quick Action Floating Buttons", "Instant modal triggers: '+ Add Chore' (points, category) and '+ Split Expense' (amount, participants).")
         ]),
        ("11.4 Admin Management & Record Control Panel (`/admin`)",
         "A restricted supervisory panel accessible solely to the household creator for membership governance and audit record control.",
         [
             ("Membership Table", "Roster of all roommates with joined dates, assigned roles (Admin/Member), and 'Remove Member' action."),
             ("Invite Code Governance", "Current 6-character code display, 'Copy Link' button, and 'Regenerate Code' trigger."),
             ("Chore & Expense Audit Log", "Master table of all recorded entries with administrative capability to delete or edit disputed items."),
             ("Household Settings", "Option to edit house name, set default expense categories, or archive the household group.")
         ])
    ]
    
    for s_title, s_desc, components in screens:
        doc.add_heading(s_title, level=2)
        doc.add_paragraph(s_desc)
        
        tbl_s = doc.add_table(rows=len(components) + 1, cols=2)
        tbl_s.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl_s.cell(0, 0).width = Inches(2.2)
        tbl_s.cell(0, 1).width = Inches(4.3)
        
        for c_i, h in enumerate(["Screen Component Zone", "UI Elements & Functional Behavior"]):
            c = tbl_s.cell(0, c_i)
            set_cell_background(c, "E2E8F0")
            set_cell_margins(c, 80, 80, 80, 80)
            p = c.paragraphs[0]
            r = p.add_run(h)
            r.bold = True
            r.font.size = Pt(10.5)
            
        for r_i, (zone, desc) in enumerate(components, start=1):
            c0 = tbl_s.cell(r_i, 0)
            c1 = tbl_s.cell(r_i, 1)
            set_cell_margins(c0, 60, 60, 80, 80)
            set_cell_margins(c1, 60, 60, 80, 80)
            c0.paragraphs[0].add_run(zone).bold = True
            c1.paragraphs[0].add_run(desc)
            
        doc.add_paragraph().paragraph_format.space_after = Pt(8)
        
    doc.save("c:/Users/rockl/Desktop/HARMONY/BCA_508_Minor_Project_Synopsis_HARMONY.docx")
    print("SUCCESS: Generated BCA_508_Minor_Project_Synopsis_HARMONY.docx")

if __name__ == "__main__":
    create_document()
