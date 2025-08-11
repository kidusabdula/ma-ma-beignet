export function generateTransactionPDF(entry: {
  id: string;
  date: string;
  type: string;
  itemCode: string;
  qty: number;
  uom?: string;
  rate?: number;
  warehouse: string;
  reference?: string;
}) {
  const lines = [
    `Ma-Beignet Stock ${entry.type} Receipt`,
    `ID: ${entry.id}`,
    `Date: ${entry.date}`,
    `Item: ${entry.itemCode}`,
    `Change: ${entry.qty} ${entry.uom || ""}`,
    `Rate: ${entry.rate ?? "-"}`,
    `Warehouse: ${entry.warehouse}`,
    `Reference: ${entry.reference || "-"}`,
  ];
  const content = lines.join("\n");
  // Minimal PDF wrapper for text content
  // This is a simplistic single-page PDF generator for demo (A4-ish). For MVP only.
  const encode = (s: string) => s.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  const text = encode(content);
  const pdf = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>> endobj
4 0 obj <</Length ${text.length + 100}>> stream
BT /F1 12 Tf 50 780 Td (${text}) Tj ET
endstream endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000061 00000 n 
0000000117 00000 n 
0000000278 00000 n 
0000000411 00000 n 
trailer <</Size 6/Root 1 0 R>>
startxref
520
%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${entry.type}-${entry.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateBalancePDF(balances: Array<{ itemCode: string; qty: number; uom?: string; warehouse: string }>) {
  const header = "Ma-Beignet Stock Balance\n";
  const body = balances.map((b) => `${b.itemCode}  ${b.qty} ${b.uom || ""}  @${b.warehouse}`).join("\n");
  const text = header + body;
  return generateSimpleTextPDF(text, "stock-balance.pdf");
}

function generateSimpleTextPDF(text: string, filename: string) {
  const encode = (s: string) => s.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  const content = encode(text);
  const pdf = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>> endobj
4 0 obj <</Length ${content.length + 100}>> stream
BT /F1 12 Tf 50 780 Td (${content}) Tj ET
endstream endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000061 00000 n 
0000000117 00000 n 
0000000278 00000 n 
0000000411 00000 n 
trailer <</Size 6/Root 1 0 R>>
startxref
520
%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


