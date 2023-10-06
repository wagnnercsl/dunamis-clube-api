require('dotenv').config()

import router from './controllers/base.controller'

const app = router.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`)
})

export default app