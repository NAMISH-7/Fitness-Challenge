"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import Input from "@tn/shared/components/ui/Input";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
}

const districts = [
  "All Districts",
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
  "Tiruppur", "Cuddalore", "Kanchipuram", "Villupuram", "Nagapattinam"
];

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedDistrict,
  onDistrictChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="flex-1">
        <Input
          placeholder="Search participants..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>
      <div className="relative">
        <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark pointer-events-none" />
        <select
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full sm:w-48 pl-10 pr-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
        >
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
