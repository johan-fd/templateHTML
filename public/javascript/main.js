import {
    generate,
    remove
} from "./modules/controller.js"

const main = () => {
    $(".tooltipped").tooltip()
    generate()
    remove()
}

$(document).ready(main)