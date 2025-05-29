export class ApiError {
    detail: string
    status: number
    title: string
    type: string

    constructor(detail: string, status: number, title: string, type: string) {
        this.detail = detail
        this.status = status;
        this.title = title;
        this.type = type;
    }
}

export class ValidationError {
    errorCode!: string
    errorMessage!: string
    identifier!: string
    severity!: number
}