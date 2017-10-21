module.exports = function testForId(a, b) {
    // perfect match
    if (/^(0)\d{2}4012\d{9}$/.test(a)) {
        return a;
    } else if (/^(0)\d{2}4012\d{9}$/.test(b)){
        return b;
    } 
    // does it start with 0
    else if (!/^0\d+$/.test(a)) {
        a = a.replace(/^(?!0)./, '0');
        return testForId(a, b);
    } else if (!/^0\d+$/.test(b)) {
        b = b.replace(/^(?!0)./, '0');
        return testForId(a, b);
    } 
    // does it have 4012 at 4th position
    else if (/^(0)\d{15}/.test(a)) {
        a = a.replace(/(?!..............)\d{0,4}/, '4012');
        return testForId(a, b);
    } else {
        b = b.replace(/(?!..............)\d{0,4}/, '4012');
        return testForId(a, b);
    }
}