export function getItemName(itemCode: string): string {
  // Basic friendly names for known codes; fallback by pattern
  const map: Record<string, string> = {
    "MB-RAW-FLW-25KG": "Wheat Flour 25KG",
    "MB-RAW-SUG-50KG": "Sugar 50KG",
    "MB-RAW-BUT-1KG": "Butter 1KG",
    "MB-RAW-YEA-500G": "Yeast 500G",
    "MB-PKG-LBL-ROLL": "Label Roll",
    "MB-PKG-CBOX-L": "Carton Box (Large)",
    "MB-PKG-PBAG-01": "Poly Bag",
    "MB-BEI-CHO-PK6": "Chocolate Beignet Pack (6)",
    "MB-BEI-CIN-DZ": "Cinnamon Beignet Dozen",
    "MB-BEI-CLA-01": "Classic Beignet",
    "MB-CRO-CHO-DZ": "Chocolate Croissant Dozen",
    "MB-CRO-BUT-01": "Butter Croissant",
  };
  if (map[itemCode]) return map[itemCode];
  // Heuristic fallback
  const parts = itemCode.split("-");
  const pretty = parts
    .slice(1)
    .map((p) => p.toLowerCase())
    .map((p) => p.replace(/\b(kg|g|dz|pk\d+)\b/i, (m) => m.toUpperCase()))
    .join(" ");
  return pretty ? pretty.charAt(0).toUpperCase() + pretty.slice(1) : itemCode;
}


