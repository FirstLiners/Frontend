import React, { useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/hooks";

type ForecastsItemsType = {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  [key: string]: string | number;
}[];

type ParamType = {
  key: keyof ForecastsItemsType[0];
  value: string | number;
};

type DashboardTableProps = {
  paramsApplyed?: ParamType;
};

const DasTable: React.FC<DashboardTableProps> = () => {
  const { forecastsItems = [] } = useAppSelector((state) => state.forecasts) || [];
  const { paramsApplyed = [] } = useAppSelector((state) => state.forecasts) || [];

  // function that return array of string dates from now to 14 days ago

  function forteenDaysAgo(startDate: Date = new Date()): string[] {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  }
  const dates = forteenDaysAgo();

  useEffect(() => {
    console.log("dates", dates);
  }, [dates]);

  const filteredData = forecastsItems.filter((item) => {
    if (!Array.isArray(paramsApplyed)) {
      return true;
    }
    return (
      !paramsApplyed ||
      paramsApplyed.every((param: ParamType) => {
        return item[param.key] === param.value;
      })
    );
  });

  if (filteredData.length === 0) {
    return null;
  }

  return (
    <section>
      <Table className="max-w-screen-xl text-xs">
        <ScrollArea className="h-[638px] w-[1600px] border rounded-lg">
          <TableHeader>
            <TableRow className="bg-[#E0E3F1]">
              <TableHead className="pr-8">ТК</TableHead> {/* store */}
              <TableHead className="pr-8">Группа</TableHead> {/* group */}
              <TableHead className="pr-8">Категория</TableHead> {/* category */}
              <TableHead className="pr-8">Подкатегория</TableHead> {/* subcategory */}
              <TableHead className="pr-8">Товар</TableHead> {/* sku */}
              <TableHead className="pr-8">Ед. измерения</TableHead> {/* uom */}
              {dates.map((date) => (
                <TableHead key={date}>{date}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.store}>
                <TableCell scope="row">{item.store}</TableCell>
                {dates.map((date) => (
                  <TableCell key={`${item.store}-${date}`} align="right">
                    {item[date]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
    </section>
  );
};

export default DasTable;
