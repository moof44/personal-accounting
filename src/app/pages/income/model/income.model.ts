export interface Income{ 
    date: Date | string;
    incomeSource: string;
    amount: number;
    remarks: string;
}

export interface Expense{
    date: Date;
    expenseSource: string;
    amount: number;
    remarks: string;
}