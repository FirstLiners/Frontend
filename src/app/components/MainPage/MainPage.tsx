"use client"
import * as React from "react"
import styles from "./MainPage.module.css"
import { ChevronDown } from 'lucide-react';
import { Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import SimpleLineChart from "./ExampleLineChart"
import { Input } from "@/components/ui/input"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

//import data from "../../../mocdata/forecast.json"
type Checked = DropdownMenuCheckboxItemProps["checked"]
 
function BlockFilter() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
 
  return (
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="ml-2 justify-between ">
      Название ТК <ChevronDown className="right-2" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56 w-[200px]">
    <div className="flex items-center rounded-lg bg-gray-50">
      <Input />
      <Search className="mr-2" color="#003C96" />
    </div>
    
      <DropdownMenuSeparator />
      <ScrollArea className="h-[200px] w-[190px] rounded-md border p-2">
      <DropdownMenuCheckboxItem
        checked={showStatusBar}
        onCheckedChange={setShowStatusBar}
      >
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showPanel}
        onCheckedChange={setShowPanel}
      >
        Panel
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      </ScrollArea>
      <DropdownMenuSeparator />

    <div className="flex justify-between mt-2">
      <Button variant="dropdownMenuButton1" size="tpr1" className="ml-0 justify-between">
        Выбрать все
      </Button>
      <Button variant="dropdownMenuButton2" size="tpr2" className="ml-0 justify-between">
        Очистить все
      </Button>
    </div>
  </DropdownMenuContent>
</DropdownMenu>

  )
}


/*function BlockFilter(){
    /* React.useEffect ( () => {
    let stores = [];
    let skus = [];
    //   @ts-ignore
    const dataObj = (data.data);
    //   @ts-ignore
    for (let element of dataObj) {
        stores.push (element.store)
        skus.push (element.sku) 
        let sales_units = element.forecast.sales_units 
        for (let date in sales_units) {
            //   @ts-ignore
          units.push (sales_units[date])
      
        }
      } 
    //   @ts-ignore
        console.log(units);
    }, []); 
    

        

        
        //const dataValue = parseInt(data.data[0].forecast.sales_units["2023-09-01"], 10);
        //console.log(dataValue);
        

    return ( 
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder=" " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel></SelectLabel>
          <Input />       
          <SelectItem value="apple" >Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    )
}*/

export default function MainPage() {

  return (
    <section>
    <h1 className={styles.block__title_h1}>Параметры</h1> 
    <div className={styles.block__filter}> 
        <div>  
            <h1 className={styles.h1_first }>Торговый Комплекс</h1>  
            <div className={styles.shift}>
                <BlockFilter/>
            </div>
        </div>       
        <div> 
            <h1 className={styles.h1}>Группа</h1>     
            <div>
                <BlockFilter/>
            </div>
        </div>   
        <div>   
            <h1 className={styles.h1}>Категория</h1>   
            <div><BlockFilter/></div>
        </div>   
        <div> 
            <h1 className={styles.h1}>Подкатегория</h1>     
            <div><BlockFilter/></div>
        </div>   
        <div>    
            <h1 className={styles.h1}>Товар</h1>  
            <div><BlockFilter/></div>
        </div>   
        <div>    
            <h1 className={styles.h1}>Ед.измерения\Руб</h1>  
            <div><BlockFilter/></div>
        </div>    
        <div className={styles.block__button}> 
        <Button variant="firstly">Применить</Button>
        <Button variant="secondary">Сбросить</Button>
        </div>
    </div>
    <div>

    </div>
    <SimpleLineChart/>
    </section>
  )
}

