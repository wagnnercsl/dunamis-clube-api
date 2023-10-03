export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string,
            DB_NAME: string,
            DB_USER: string,
            DB_PORT: number,
            PORT: number
        }
    }
}