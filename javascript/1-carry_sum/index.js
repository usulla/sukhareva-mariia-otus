const sum = arg1 => {
    let nowSum = arg1;

    function nextSum(arg2) {
        if (arg2 !== undefined) {
            nowSum += arg2;
            return nextSum;
        }
        else return nowSum;
    }

    return nextSum;
} 