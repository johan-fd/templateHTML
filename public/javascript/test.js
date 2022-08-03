// TEST LULU
const it = (description, functionName) => {
    "use strict"
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
    if (!isTrue)
        throw new Error()
}