const sortArray = (array, sortby, order) => {
    let sortedArray = [];

    sortedArray = array.sort((a, b) => {
        let fa, fb, date = false;
        if (!isNaN(a[sortby])) {
            fa = a[sortby];
            fb = b[sortby]
        } else {
            if ((new Date(a[sortby]) == 'Invalid Date') == false) {
                console.log(a[sortby], b[sortby])
                fa = new Date(a[sortby])
                fb = new Date(b[sortby])
                date = true;

            } else {
                fa = a[sortby].toLowerCase();
                fb = b[sortby].toLowerCase();
            }
        }

        if (order == "asc") {
            if (date) {
                if (fa - fb < 0) {
                    return -1
                }
                if (fa - fb > 0) {
                    return 1
                }
            }
            if (fa < fb) {
                return -1
            }
            if (fa > fb) {
                return 1
            }
            return
        }
        if (order == "desc") {
            if (date) {
                if (fa - fb > 0) {
                    return -1
                }
                if (fa - fb < 0) {
                    return 1
                }
            }
            if (fa > fb) {
                return -1
            }
            if (fa < fb) {
                return 1
            }
            return
        }
    })

    return sortedArray;
};

module.exports = {
    sortArray
};