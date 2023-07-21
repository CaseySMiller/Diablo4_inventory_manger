// This function will take a string and replace all instances of STAT# with the corresponding argument and then wrap all parts formated with "XXvalueXX" in span tags with a class of statistic

parseDesc = (input, ...args) => {
    // replace STAT# with the corresponding argument
    let output = args.reduce((acc, cur, i) => {
        return acc.replace(new RegExp(`STAT${i + 1}`, 'g'), cur)
    }, input);

    // add span tags around the numbers with a class
return output.split('XX').reduce((acc, cur, i) => {
        // if even, add a space and add to acc
        if (i % 2 === 0) {  
            acc = `${acc}${cur} `         
        } else {
            // if odd, add span tags and add to acc
            acc = `${acc.trim()} <span class="statistic">${cur}</span>`;
        }
        return acc;
    });
}

export default parseDesc;

// test code

// const input = "this is a test string. the first stat is STAT1, the second stat is STAT2, the third stat is STAT3, and the fourth stat is STAT4. Here are some numbers XX(11%-30%)XX these should have a different class. Here are some more stats XX(31%-50%)XX and XX(51%-70%)XX.";

// console.log(parseDesc(input, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));