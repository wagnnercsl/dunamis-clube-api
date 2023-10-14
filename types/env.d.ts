export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_NAME: string,
            DB_USER: string,
            DB_PORT: number,
            PORT: number
        }
    }
}