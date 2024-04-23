import { jwtDecode } from "jwt-decode"

export const extractExpirationFromBackendToken = (token: string) : number => {
    const exp = jwtDecode(token).exp
    if (!exp)
        throw new Error("Token does not contain an expiration date")
    return exp
}

export const extractSubjectFromBackendToken = (token: string) : string => {
    const sub = jwtDecode(token).sub
    if (!sub)
        throw new Error("Token does not contain a subject")
    return sub
}