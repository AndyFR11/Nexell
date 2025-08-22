
export interface IResponse {
    ok: boolean,
    message: {
        en?: string,
        es?: string
    }
    data?: any,
    error?: any,
}
