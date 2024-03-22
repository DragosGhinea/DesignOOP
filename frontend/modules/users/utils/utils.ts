import { jwtDecode } from "jwt-decode"

export const extractExpirationFromBackendToken = (token: string) : number => {
    const exp = jwtDecode(token).exp
    if (!exp)
        throw new Error("Token does not contain an expiration date")
    return exp
}