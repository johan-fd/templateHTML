const $start = $("#gmeet-start")
const $stop = $("#gmeet-stop")
const $gmeet = $("#gmeet")
const $progressBar = $("#progressBar")
const w = window
const d = document
const gmeetUrl = "https://meet.google.com/new"
let gmeetWindow
let checkWindow

const sleep = async (ms) => {
    return new Promise((resolve) => window.setTimeout(resolve, ms))
}

const featuresToString = (object) => {
    const array = Object.keys(object)
    const result = array.map((key) => {
            return `${key}=${object[key]}`
        }).join(",") || ""
    return result
}

const generate = () => {
    const btn = $start[0]
    const gmeetContainer = $gmeet[0]
    if (!btn) return
    if (!gmeetContainer) return

    const generateGmeet = async () => {
        $progressBar.removeClass("hide")
        $stop.prop("disabled", false).removeClass("hide")
        $start.addClass("hide")
        btn.disabled = true
        const height = screen.height
        const width = screen.width / 2 - 5
        const top = 150
        const left = 0
        const windowFeatures = {
            left,
            top,
            width,
            height,
        }
        gmeetWindow = w.open(
            gmeetUrl,
            "_blank",
            featuresToString(windowFeatures)
        )

        if (!gmeetWindow) {
            alert("BLOCKED")
            $progressBar.addClass("hide")
        }

        // TEST WINDOW OPEN
        it("POP UP WINDOW IS OPENED", () => {
            assert(gmeetWindow !== undefined)
        })

        checkWindow = w.setInterval(() => {
            if (gmeetWindow?.closed) {
                $start.prop("disabled", false).removeClass("hide")
                $stop.prop("disabled", true).addClass("hide")
                w.clearInterval(checkWindow)
            }
        }, 500)

        await sleep(2500)
        $progressBar.addClass("hide")
    }

    btn.onclick = generateGmeet
}

const remove = () => {
    const btn = $stop[0]
    if (!btn) return

    const removeGmeet = () => {
        $progressBar.addClass("hide")
        $start.prop("disabled", false).removeClass("hide")
        $stop.addClass("hide")
        btn.disabled = true
        gmeetWindow.close()
    }

    btn.onclick = removeGmeet

    w.onbeforeunload = () => {
        if (gmeetWindow?.close)
            gmeetWindow.close()
    }
}

export {
    generate,
    remove
}