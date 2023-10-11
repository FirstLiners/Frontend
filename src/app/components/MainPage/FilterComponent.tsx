import React, { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CheckedState = boolean;

interface FilterProps {
  filterLabel: string;
  filterItems: { label: string; checked: boolean }[];
  onFilterChange: (index: number, checked: boolean) => void;
  onFilterChangeAll: (
    updatedFilters: { label: string; checked: boolean }[],
  ) => void;
}

function BlockFilter({
  filterLabel,
  filterItems,
  onFilterChange,
  onFilterChangeAll,
}: FilterProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleFilterChange = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prevSelected) => [...prevSelected, index]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((itemIndex) => itemIndex !== index),
      );
    }
    onFilterChange(index, checked);
  };

  const handleSelectAll = () => {
    const updatedFilters = filterItems.map((item, index) => ({
      ...item,
      checked: true,
    }));
    setSelectedItems(updatedFilters.map((_, index) => index));
    onFilterChangeAll(updatedFilters);
  };

  const handleClearAll = () => {
    const updatedFilters = filterItems.map((item, index) => ({
      ...item,
      checked: false,
    }));
    setSelectedItems([]);
    onFilterChangeAll(updatedFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Фильтруем элементы по поисковому запросу
  const filteredItems = filterItems.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-2 justify-between overflow-hidden max-w-[200px]"
        >
          {/* Отображаем текст фильтра или выбранные элементы */}
          {selectedItems.length === 0 ? (
            // Если нет выбранных элементов, отображаем текст фильтра
            <>
              {filterLabel} <ChevronDown className="right-2" />
            </>
          ) : (
            // Если есть выбранные элементы, отображаем их
            <span className="block whitespace-nowrap overflow-hidden overflow-ellipsis">
              {selectedItems
                .map((index) => filterItems[index].label)
                .join(", ")}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 w-[200px]">
        <div className="flex items-center rounded-lg bg-gray-50">
          <Input
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Поиск..."
          />
          <Search className="mr-2" color="#003C96" />
        </div>

        <DropdownMenuSeparator />
        <ScrollArea className="h-[200px] w-[190px] rounded-md border p-2">
          {filteredItems.length === 0 ? (
            // Если не найдено ни одного элемента, отображаем уведомление
            <div className="ml-7 text-xs">Ничего не найдено</div>
          ) : (
            // В противном случае, отображаем чекбоксы для найденных элементов
            filteredItems.map((item, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={selectedItems.includes(index)}
                onCheckedChange={(checked) => {
                  handleFilterChange(index, checked);
                }}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            ))
          )}
        </ScrollArea>
        <DropdownMenuSeparator />

        <div className="flex justify-between mt-2">
          <Button
            variant="dropdownMenuButton1"
            size="tpr1"
            className="ml-0 justify-between"
            onClick={() => {
              handleSelectAll();
            }}
          >
            Выбрать все
          </Button>
          <Button
            variant="dropdownMenuButton2"
            size="tpr2"
            className="ml-0 justify-between"
            onClick={() => {
              handleClearAll();
            }}
          >
            Очистить все
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BlockFilter;
