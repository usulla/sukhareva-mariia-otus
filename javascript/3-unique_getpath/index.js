const html = document.documentElement;
const body = document.body;

const uniqueEl = (selector) => {
    const result = html.querySelectorAll(selector).length > 1 ? false : true;
    return result;
}
const toDecorId = (elem) => {
    return `#${elem.id}`
}
const toDecorClass = (elem) => {
    if (hasSameChildren(elem)) {
        const index = getIndexChild(elem);
        return `.${Array.from(elem.classList).join('.')}:nth-child(${index})`
    }
    return `.${Array.from(elem.classList).join('.')}`
}
const toDecorTag = (elem) => {
    if (hasSameChildren(elem)) {
        const index = getIndexChild(tagName);
        return `${elem.tagName.toLowerCase()}:nth-child(${index})`
    }
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
const getIndexChild = (elem) => {
    // const index = Array.from(elem.parentElement.children).indexOf(elem);
    const result = Array.from(elem.parentElement.children).filter(item => {
        return item == elem;
    })
    console.log(result, 'result')
    const index = result.indexOf(elem)
    return index;
}
const hasSameChildren = (elem) => {
    result = Array.from(elem.parentElement.children).filter(item => {
        return item == elem;
    })
    return result.length !== 0 ? true : false;
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
        if (uniqueEl(fullPath(elem, body))) {
            return fullPath(elem, body);
        }

        return fullPath(elem, body);

    } else return "Current HTML don't have this element"
}