export interface Result {
    status: number;
    op: string;
    msg: string;
    ok: boolean;
    error: any;
    data: any;
}

export interface DateRange {
    // name: string;
    from: Date;
    to: Date;
}

export class ArrayMatcher {
    // public name = '';
    public matchAll = false;
    public tags: string[] = [];
}

// export class Filter {
//     public fields = new Map<string, string[]>();
//     public dates = new Map<string, DateRange>();
//     public lists = new Map<string, ArrayMatcher>();
// }

export class Filter {
    public fields = new Object();
    public boolFields = new Object();
    public dates = new Object();
    public lists = new Object();
}

export enum FilterType {
    Value = 'value',
    Array = 'array',
    DateRange = 'dateRange',
    Boolean = 'boolean',
}

export interface FilterDesc {
    field: string;
    name: string;
    type: FilterType;
    data?: string[] | DateRange | boolean[];
}

export interface PaginateEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;

}
