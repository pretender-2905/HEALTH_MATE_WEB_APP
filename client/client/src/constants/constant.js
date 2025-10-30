
// const BASE_URL = "http://localhost:4000"
const BASE_URL = "https://healthmatewebapp-production.up.railway.app/"

export const AppRoutes = {
    signup: `${BASE_URL}/user/signup`,
    login: `${BASE_URL}/user/login`,
    verify: `${BASE_URL}/user/verify`,
    add: `${BASE_URL}/transaction/add`,
    all: `${BASE_URL}/transaction/all`,
    getMyInfo: `${BASE_URL}/user/myInfo`

}