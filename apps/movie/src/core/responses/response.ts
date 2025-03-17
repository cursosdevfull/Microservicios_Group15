type Metadata = {
    page: number
    limit: number
    totalPages: number
}

export type ResponseData<T> = {
    statusCode: number,
    data: T[]
}

export type ResponseByPage<T> = ResponseData<T> & {
    metadata: Metadata
}