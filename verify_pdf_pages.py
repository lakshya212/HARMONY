import pypdf

reader = pypdf.PdfReader('BCA_508_Minor_Project_Synopsis_HARMONY.pdf')
total_pages = len(reader.pages)
print(f"Total pages: {total_pages}\n")

# Let's inspect page by page from page 8 to end
print("--- PAGE-BY-PAGE HEADINGS DUMP ---")
for p_idx in range(7, total_pages):
    p_num = p_idx + 1
    text = reader.pages[p_idx].extract_text() or ""
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    first_few = " | ".join(lines[:3]) if lines else "[EMPTY / IMAGE ONLY]"
    print(f"Page {p_num:2d}: {first_few[:100]}")
