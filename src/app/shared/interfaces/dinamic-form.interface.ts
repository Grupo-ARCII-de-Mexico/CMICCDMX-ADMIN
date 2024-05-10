export interface DinamicFormField {
    label: string;
    labelPlacement?:string;
    selection:DinamicFormFieldOptions[],
    type:DinamicFormFieldType,
    // Agrega otros campos según tus necesidades
}


export enum DinamicFormFieldType {
    INPUT=0,
    INPUT_NUMERIC=1,
    SELECT=2,
    DATE=3
}

export interface DinamicFormFieldOptions{
        label:string,
        value:any   
}