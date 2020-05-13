const html = document.documentElement;
const body = document.body;

const uniqueEl = (selector) => {
    return html.querySelectorAll(selector).length > 1 ? false : true;
}
const toDecorId = (elem) => {
    return `#${elem.id}`
}
const toDecorClass = (elem) => {
    return `.${Array.from(elem.classList).join('.')}`
}
const toDecorTag = (elem) => {
    return elem.tagName.toLowerCase();
}
const toDecorElemPath = (elems) => {
    return elems.reverse().join(" > ")
}
const fullPath = (from, to) => {
    let curEl = from;
    let resultPath = [];
    while (curEl !== to) {
        let parent = curEl.classList.length !== 0 ?
            toDecorClass(curEl)
            : toDecorTag(curEl)
        resultPath.push(parent);
        curEl = curEl.parentElement;
    }
    return toDecorElemPath(resultPath);
}

const getPath = (elem) => {
    if (elem) {
        if (elem.id !== '') {
            return toDecorId(elem)
        }
        if (elem.classList.length !== 0 && uniqueEl(toDecorClass(elem))) {
            return toDecorClass(elem)
        }
        if (uniqueEl(elem.tagName)) {
            return toDecorTag(elem)
        }
        return fullPath(elem, body);

    } else return "Document don't have this element"
}
