const html = document.documentElement;
const body = document.body;

const getPath = (elem) => {
    if (elem) {
        const parentTag = elem.parentElement.tagName;
        if (elem.id !== '') {
            return `#${elem.id}`;
        } else if (elem.classList.length !== 0 || uniqueElement(elem.tagName)) {
            const selFromClass = convertClass(elem);
            if (uniqueElement(selFromClass)) {
                return selFromClass;
            } else if (uniqueElement(elem.tagName)) {
                return elem.tagName.toLowerCase();
            }
            // else {
            //     if(elem.parentElement.classList.length !== 0){
            //         const parentClassSel = convertClass(elem.parentElement);
            //         if (uniqueElement(`${parentClassSel} > ${selFromClass}`)){
            //             return `${parentClassSel} > ${selFromClass}`;
            //         }
            //     } else if(uniqueElement(` ${elem.parentElement.tagName} > ${selFromClass}`)){
            //         return `${parentTag.toLowerCase()} > ${selFromClass}`;
            //     }
            // }
        }
        let resultSel;
        let arrPath = [];
        const getSelector = (arrPath) => {
            if (arrPath.length !== 0) {
                var selectors = arrPath.map(item => {
                    return (
                        item.classList.length !== 0 ?
                            `.${Array.from(item.classList).join('.')}`
                            : item.tagName.toLowerCase()
                    )
                })
                resultSel = selectors.join(' ');
            }
        }

        const findElem = (parentEl) => {
            for (let [index, elem1] of Array.from(parentEl.children).entries()) {
                arrPath.push(elem1);
                if (elem1.children.length == 0) {
                    arrPath = [];
                }
                if (elem1 === elem) {
                    getSelector(arrPath);
                    break;
                } else findElem(elem1);
            }
        }
        findElem(body);
        return resultSel;

    } else return "Current HTML don't have this element"
}
const uniqueElement = (selector) => {
    const result = html.querySelectorAll(selector).length > 1 ? false : true;
    return result;
}
const convertClass = (elem) => {
    const result = `.${Array.from(elem.classList).join('.')}`
    return result;
}
const elem = document.querySelector('.class3');
console.log(getPath(elem));