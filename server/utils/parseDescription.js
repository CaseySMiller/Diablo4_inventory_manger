// This function will take a string and replace all instances of STAT# 
// with the corresponding argument in a span with class of "styles.varStat"
const parseOut = (input, ...args) => {
    // replace STAT# with the corresponding argument in a span with class of "styles.varStat"
    const parsedOutput = args.reduce((acc, cur, i) => {
        return acc.replace(new RegExp(`STAT${i + 1}`, 'g'), `<span className="styles.varStat">${cur}</span>`)
    }, input);

    return parsedOutput;
};


// this is a non-exported function that will take a tag that would be formated like {{tag}} and 
// replace it with a span tag with a class of "styles.[style] surounding the string{input) 
const parseTag = (input, tag, style) => {
    return input.split(`{{${tag}}}`).reduce((acc, cur, i) => {
        // if even, add a space and add to acc
        if (i % 2 === 0) {  
            acc = `${acc}${cur} `         
        } else {
            // if odd, add span tags and add to acc
            acc = `${acc.trim()} <span className="styles.${style}">${cur}</span>`;
        }
        return acc;
    }
    );
};

// This function will take a string and replace all instances of
// "{{SR}}value{{SR}}" with "value" in span tags with a class of "styles.statRange",
// "{{SS}}value{{SS}}" with "value" in span tags with a class of "styles.staticStat",
// "{{EF}}value{{EF}}" with "value" in span tags with a class of "styles.statusEffect",
// "{{SK}}value{{SK}}" with "value" in span tags with a class of "styles.skill",
// "[x]" or "[+]" with a span tag and class "styles.statRange" surrounding the string",
// "lucky hit" or "Lucky Hit:" with a span tag and class "styles.luckyHit and value of "Lucky Hit:"
const parseIn = (input) => {
    // add a space at the begining of string to prevent bad behavior if a stat range is the first thing in the string
    let output = ` ${input}`;

    // replace all instances of lucky hit with or without a : with "Lucky Hit:" with a span tag and class "styles.luckyHit"
    output = output.replace(new RegExp("lucky hit(?::|$)|Lucky Hit", "gi"), '<span className="styles.luckyHit">Lucky Hit:</span>');
    // replace all instances of [x] or [+] with a span tag and class "styles.statRange" surrounding the string"
    output = output.replace("[x]", '<span className="styles.statRange">[x]</span>');
    output = output.replace("[+]", '<span className="styles.statRange">[+]</span>');

    // // replace all instances of {{SR}}value{{SR}} with a span tag and class "styles.statRange" surrounding the string"
    output = parseTag(output, 'SR', 'statRange');
    // // replace all instances of {{SS}}value{{SS}} with a span tag and class "styles.staticStat" surrounding the string"
    output = parseTag(output, 'SS', 'staticStat');
    // // replace all instances of {{EF}}value{{EF}} with a span tag and class "styles.statusEffect surrounding the string"
    output = parseTag(output, 'EF', 'statusEffect');
    // // replace all instances of {{SK}}value{{SK}} with a span tag and class "styles.statusEffect surrounding the string"
    output = parseTag(output, 'SK', 'skill');

    //return the output with the first space removed
    return output.trim();
};


module.exports = { parseOut, parseIn };

// test code

// const input = "this is a test string. the first stat is Lucky hit [+] STAT1, the second stat is LUCKY HIT: STAT2[x], the third stat is STAT3, and the fourth stat is STAT4. Here are some numbers {{SS}}11%{{SS}} these should have a different class. Here is a status effect {{EF}}vulnerable{{EF}}. Here are some more stats STAT6 {{SR}}(31%-50%){{SR}} STAT5 and {{SS}}70%{{SS}}. Here is a skill {{SK}}Bone Spear{{SK}}.";

// console.log(parseIn(parseOut(input, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)));
