require('dotenv').config()

import router from './controllers/base.controller'

router.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`)
})

export default router