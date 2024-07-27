"use client";

import * as React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ForumCategory, getAllCategories } from "@/services/category";

interface CategoryDropdownProps {
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryDropdown({ onSelectCategory }: CategoryDropdownProps) {
  const [categories, setCategories] = React.useState<ForumCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="p-4">Loading...</div>
      ) : error ? (
        <div className="p-4">{error}</div>
      ) : categories.length > 0 ? (
        <Select onValueChange={onSelectCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div className="p-4">No categories found.</div>
      )}
    </div>
  );
}
