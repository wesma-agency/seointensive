$(document).ready(function () {
    let adaptivItems = $("[data-adaptiv]");
    let defaulpPlace = [];
    let adaptivItemsArray = [];
    let adaptivMatch = [];

    if (adaptivItems.length > 0) {
        let index = 0;
        $.each(adaptivItems, function (index, val) {
            const adaptivElement = adaptivItems[index];
            const adaptivMove = adaptivElement.attr('data-adaptiv');
            if (adaptivMove != "") {
                const adaptivArray = adaptivMove.split(",");
                const adaptivPlace = adaptivArray[1] ? adaptivArray[1].trim() : "last";
                const adaptivBreakpoint = adaptivArray[2] ? adaptivArray[2].trim() : "768";
                const adaptivType = adaptivArray[3] === "min" ? adaptivArray[3].trim() : "max";
                const adaptivDestination = $("." + adaptivArray[0].trim());

                if (adaptivArray.length > 0 && adaptivDestination) {
                    adaptivElement.attr("data-adaptiv-i", index);

                    defaultPlace[index] = {
                        parent: adaptivElement.parentNode,
                        i: indexParent(adaptivElement),
                    };

                    adaptivItemsArray[index] = {
                        element: adaptivElement,
                        destination: $("." + adaptivArray[0].trim()),
                        place: adaptivPlace,
                        breakpoint: adaptivBreakpoint,
                        type: adaptivType,
                    };
                    index++;
                }
            }
        })
        SortAdapt(adaptivItemsArray);
        $.each(adaptivItemsArray, function (index, val) {
            const element = adaptivItemsArray[i];
            const adaptivBreakpoint = element.breakpoint;
            const adaptivType = element.type;

            adaptivMatch.push(
                window.matchMedia(
                    "(" + adaptivType + "-width: " + adaptivBreakpoint + "px)"
                )
            );
            adaptivMatch[i].addListener(funcAdapt);
        })
    }

    function funcAdapt() {
        for (let i = 0; i < adaptivItemsArray.length; i++) {
            const element = adaptivItemsArray[i];
            const adaptivElement = element.element;
            const adaptivDestination = element.destination;
            const adaptivPlace = element.place;
            const adaptivBreakpoint = element.breakpoint;
            const adaptClass = "adapt_" + adaptivBreakpoint;

            if (adaptivMatch[i].matches) {
                if (!adaptivElement.hasClass(adaptClass)) {
                    let actualIndex = adaptivPlace;

                    if (adaptivPlace === "first") {
                        actualIndex = indexGetParentArr(adaptivDestination)[0];
                    } else if (adaptivPlace === "last") {
                        actualIndex = indexGetParentArr(adaptivDestination).length;
                    }
                    adaptivDestination.insertBefore(
                        adaptivElement,
                        adaptivDestination.children[actualIndex]
                    );
                    adaptivElement.addClass(adaptClass);
                } else {
                    if (adaptivElement.hasClass(adaptClass)) {
                        backElement(adaptivElement);
                        adaptivElement.classList.remove(adaptClass);
                    }
                }
            }
        }
    }

    function backElement(element) {
        const Index = element.attr("data-adaptiv-i");
        const originalPlace = defaultPlace[Index];
        const parentPlace = originalPlace["parent"];
        const indexPlace = originalPlace["i"];
        const actualIndex = indexGetParentArr(parentPlace, true)[indexPlace];
        parentPlace.insertBefore(element, parentPlace.children[actualIndex]);
    }

    function indexParent(element) {
        var children = Array.prototype.slice.call(element.parentNode.children);
        return children.indexOf(element);
    }

    function indexGetParentArr(parent, back) {
        const children = parent.children;
        const childrenArray = [];
        for (let i = 0; i < children.length; i++) {
            const childrenElement = children[i];
            if (back) {
                childrenArray.push(i);
            } else {
                //Исключая перенесенный элемент
                if (childrenElement.getAttribute("data-adaptiv") == null) {
                    childrenArray.push(i);
                }
            }
        }
        return childrenArray;
    }

    function SortAdapt(arr) {
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) {
                return -1;
            } else {
                return 1;
            }
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) {
                return 1;
            } else {
                return -1;
            }
        });
    }
})