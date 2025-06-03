export interface CreateAccountRequest {
    name: string,
    number: string,
    type: string,
    currency: string,
    isPlaceholder: boolean,
    description: string | null 
    parentId: string | null,
    expenseType: string | null
}