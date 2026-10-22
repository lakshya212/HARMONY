import pypdfium2 as pdfium
import os

pdf = pdfium.PdfDocument("BCA_508_Minor_Project_Synopsis_HARMONY.pdf")
os.makedirs("pdf_preview", exist_ok=True)

pages_to_render = [1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 22, 25, 26, 27, 28, 29]

for p_num in pages_to_render:
    if p_num <= len(pdf):
        page = pdf[p_num - 1]
        bitmap = page.render(scale=1.5)
        pil_image = bitmap.to_pil()
        out_path = f"pdf_preview/page_{p_num:02d}.png"
        pil_image.save(out_path)
        print(f"Rendered Page {p_num} -> {out_path}")

print("Done rendering preview pages.")
