import { TypeItem } from "../enums/type.item.enum";

export interface Menu {
    icon?:string;
    url:string;
    label:string;
    type:TypeItem;
    accordionItems?:AccordionMenu[]
}

export interface AccordionMenu {
    icon:string;
    url:string;
    label:string;
}