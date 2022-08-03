const runTesting = (boolean) => { // Boolean: true | false
    "use strict"
    localStorage.setItem("runTest",
        JSON.stringify({ runTest: boolean }))
}

const isTestOn = () => {
    "use strict"
    const sessionTest = JSON.parse(localStorage
            .getItem("runTest")) || {}
    return sessionTest.runTest
}

const it = (description, functionName) => {
    "use strict"
    if (!isTestOn()) return

    try {
        functionName()
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + description)
    } catch (error) {
        console.log("\n")
        console.log("\x1b[31m%s\x1b[0m", "\u2718 " + description)
        console.error(error)
    }
}

const assert = (isTrue) => {
    "use strict"
    if (!isTestOn()) return

    if (!isTrue)
        throw new Error()
}