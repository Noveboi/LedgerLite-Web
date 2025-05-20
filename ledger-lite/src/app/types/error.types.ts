export class ApiError {
    detail: string
    status: number
    title: string
    type: string

    constructor(detail: string, status: number, title: string, type: string) {
        this.detail = this.cleanDetail(detail);
        this.status = status;
        this.title = title;
        this.type = type;
    }

    private cleanDetail(detail: string) {
        return detail
        .replace('Next error(s) occurred:* ', '')
        .replace('\n', '')
    }
}