import * as accessToken from "./accessToken"
// @ponicode
describe("accessToken.setAccessToken", () => {
    test("0", () => {
        let callFunction: any = () => {
            accessToken.setAccessToken("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            accessToken.setAccessToken("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            accessToken.setAccessToken("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            accessToken.setAccessToken("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("accessToken.getAccessToken", () => {
    test("0", () => {
        let callFunction: any = () => {
            accessToken.getAccessToken()
        }
    
        expect(callFunction).not.toThrow()
    })
})
