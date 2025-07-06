// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useState } from "react";
// import Link from "next/link";

// const initialEntries = [
//   { id: "ENT-001", item: "Flour (50kg)", quantity: 100, status: "In Progress", lastUpdated: "2d" },
//   { id: "ENT-002", item: "Sugar (25kg)", quantity: 50, status: "Completed", lastUpdated: "2d" },
//   { id: "ENT-003", item: "Butter (10kg)", quantity: 20, status: "In Progress", lastUpdated: "2d" },
//   { id: "ENT-004", item: "Eggs (100ct)", quantity: 200, status: "Completed", lastUpdated: "3d" },
//   { id: "ENT-005", item: "Chocolate Chips (5kg)", quantity: 10, status: "In Progress", lastUpdated: "3d" },
//   { id: "ENT-006", item: "Yeast (2kg)", quantity: 5, status: "Completed", lastUpdated: "1w" },
//   { id: "ENT-007", item: "Vanilla Extract (1L)", quantity: 2, status: "In Progress", lastUpdated: "1w" },
//   { id: "ENT-008", item: "Almond Flour (10kg)", quantity: 15, status: "Completed", lastUpdated: "1w" },
//   { id: "ENT-009", item: "Fruit Jam (5kg)", quantity: 8, status: "In Progress", lastUpdated: "1m" },
//   { id: "ENT-010", item: "Salt (5kg)", quantity: 10, status: "Completed", lastUpdated: "1m" },
// ];

// export default function StockEntryPage() {
//   const [entries, setEntries] = useState(initialEntries);
//   const [filters, setFilters] = useState({
//     id: "",
//     item: "",
//     quantity: "",
//     status: "all", // Changed from empty string to "all"
//   });

//   const handleFilterChange = (field: string, value: string) => {
//     const newFilters = { ...filters, [field]: value };
//     setFilters(newFilters);

//     const filtered = initialEntries.filter((entry) =>
//       (newFilters.id ? entry.id.toLowerCase().includes(newFilters.id.toLowerCase()) : true) &&
//       (newFilters.item ? entry.item.toLowerCase().includes(newFilters.item.toLowerCase()) : true) &&
//       (newFilters.quantity ? entry.quantity.toString().includes(newFilters.quantity) : true) &&
//       (newFilters.status !== "all" ? entry.status === newFilters.status : true)
//     );
//     setEntries(filtered);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">Stock Entries</h1>
//         <div className="space-x-2">
//           <Link href= "/stock/add-stock-entry"><Button variant="default" className="bg-[var(--primary)] text-[var(--primary-foreground)]">New Entry</Button></Link>
//         </div>
//       </div>

//       <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
//           <div>
//             <label className="text-[var(--card-foreground)] block mb-1">Entry ID</label>
//             <Input
//               placeholder="Entry ID"
//               className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
//               value={filters.id}
//               onChange={(e) => handleFilterChange("id", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="text-[var(--card-foreground)] block mb-1">Item Name</label>
//             <Input
//               placeholder="Item Name"
//               className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
//               value={filters.item}
//               onChange={(e) => handleFilterChange("item", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="text-[var(--card-foreground)] block mb-1">Quantity</label>
//             <Input
//               type="number"
//               placeholder="Quantity"
//               className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
//               value={filters.quantity}
//               onChange={(e) => handleFilterChange("quantity", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="text-[var(--card-foreground)] block mb-1">Status</label>
//             <Select
//               value={filters.status}
//               onValueChange={(value) => handleFilterChange("status", value)}
//             >
//               <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
//                 <SelectValue placeholder="All" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="In Progress">In Progress</SelectItem>
//                 <SelectItem value="Completed">Completed</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div></div> {/* Placeholder for symmetry */}
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-[var(--card-foreground)] w-4">
//                   <input type="checkbox" className="mr-2" />
//                 </TableHead>
//                 <TableHead className="text-[var(--card-foreground)]">Entry ID</TableHead>
//                 <TableHead className="text-[var(--card-foreground)]">Item Name</TableHead>
//                 <TableHead className="text-[var(--card-foreground)]">Quantity</TableHead>
//                 <TableHead className="text-[var(--card-foreground)]">Status</TableHead>
//                 <TableHead className="text-[var(--card-foreground)]">Last Updated On</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {entries.map((entry, index) => (
//                 <TableRow key={index}>
//                   <TableCell className="text-[var(--card-foreground)]">
//                     <input type="checkbox" className="mr-2" />
//                   </TableCell>
//                   <TableCell className="text-[var(--card-foreground)]">{entry.id}</TableCell>
//                   <TableCell className="text-[var(--card-foreground)]">{entry.item}</TableCell>
//                   <TableCell className="text-[var(--card-foreground)]">{entry.quantity}</TableCell>
//                   <TableCell className="text-[var(--card-foreground)]">
//                     <span
//                       className={`${
//                         entry.status === "In Progress" ? "bg-yellow-500" : "bg-green-500"
//                       } text-white px-2 py-1 rounded-full text-xs`}
//                     >
//                       {entry.status}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-[var(--card-foreground)]">{entry.lastUpdated}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//         <div className="flex justify-between items-center mt-4 text-[var(--card-foreground)]">
//           <span>Showing {entries.length} of {initialEntries.length} entries</span>
//           <div className="space-x-2">
//             <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">20</Button>
//             <Button variant="outline" className="border-[var(--border)] text-[var(--card-foreground)]">100</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }