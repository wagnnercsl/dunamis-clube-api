import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()]
})
// export default defineConfig({
//     test: {
//         alias: {
//             '@/': 'src/',
//             '@/models': 'src/models'
//         }
//     }
// })