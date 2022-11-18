// items interface
export interface itemsInterface{
    id : number,
    key : number,
    name:string,
    description : string,
    category ?: string,
    material : string,
    type : string,
    price : number,
    url:string
}

//search interface
export interface search{
    criteria ?: string,
    status ?: () => void,
    filt ?: itemsInterface[],
}

//fetch data initial state interface
export interface initstate{
    loading : boolean,
    users : [],
    error : string
}

//param interface
export type param = {
    id : number
}