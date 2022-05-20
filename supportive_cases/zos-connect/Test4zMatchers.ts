// Definition of the Test4z matchers for the custom assertions.

// Global declaration of the custom matchers
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSuccessfulResult(): R;
        }
    }
}

/**
 * Custom matcher for Test4z API Requests. Checks the data field from the Test4z response.
 * If the data field is not available, it returns an error message
 * @param received - API result
 */
export function toBeSuccessfulResult(received:any): jest.CustomMatcherResult {
    let pass = 0;
    if(received && received.data)
        pass = 1;

    if (pass) {
        return {
            message: () =>
                "Request was successful" ,
            pass: true,
        };
    } else {
        const errorMessage = received && received.messages ? JSON.stringify(received.messages[0], null, '\t') : JSON.stringify(received);
        return {
            message: () =>
                errorMessage,
            pass: false,
        };
    }
}
