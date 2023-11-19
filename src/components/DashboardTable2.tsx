import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function DasTable2() {
  const dispatch = useAppDispatch();
  // const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const { StatisticsItems = [] } = useAppSelector((state) => state.statistics) || [];
  const { paramsApplyed = [] } = useAppSelector((state) => state.statistics) || [];

  //text-right
  return (
    <section>
      <Table className="ml-5 mt-5 mb-5 max-w-[1520px] text-xs">
        <ScrollArea className="h-[280px] w-[1520px] rounded-md border p-4">
          <TableHeader>
            <TableRow className="bg-[#E0E3F1]">
              <TableHead className="pr-8">ТК</TableHead> {/* store */}
              <TableHead className="pr-8">Группа</TableHead> {/* group */}
              <TableHead className="pr-8">Категория</TableHead> {/* category */}
              <TableHead className="pr-8">Подкатегория</TableHead> {/* subcategory */}
              <TableHead className="pr-8">Товар</TableHead> {/* sku */}
              <TableHead className="pr-8">Период</TableHead> {/* period */}
              <TableHead className="pr-8">Ед. измерения</TableHead> {/* uom */}
              <TableHead className="pr-8">Продажи факт</TableHead> {/* real_sale */}
              <TableHead className="pr-8">Продажи прогноз</TableHead> {/* forecast */}
              <TableHead className="pr-8">Разница факт/прогноз</TableHead> {/* difference */}
              <TableHead className="pr-8">Качество прогноза по WAPE</TableHead> {/* wape */}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{'store'}</TableCell>
              <TableCell>{'group'}</TableCell>
              <TableCell>{'category'}</TableCell>
              <TableCell>{'subcategory'}</TableCell>
              <TableCell>{'sku'}</TableCell>
              <TableCell>{'period'}</TableCell>
              <TableCell>{'uom'}</TableCell>
              <TableCell>{'real_sale'}</TableCell>
              <TableCell>{'forecast'}</TableCell>
              <TableCell>{'difference'}</TableCell>
              <TableCell>{'wape'}</TableCell>
            </TableRow>
          </TableBody>
        </ScrollArea>
      </Table>
    </section>
  );
}
