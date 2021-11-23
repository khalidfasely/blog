export default (text) => {
    let str = text;
    console.log(text);
    let lastIndex = str.lastIndexOf(" ");
    str = str.substring(0, lastIndex);
    console.log('pCF');
    return str;
}

//var str = "I want to remove the last word."; var lastIndex = str. lastIndexOf(" "); str = str. substring(0, lastIndex)






//export default (text) => {
//    //let text = "this is blog app created by KF as a final project of CS50W programming with Python and JavaScript";
//    console.log(text);
//    const textLength = text.length;
//    let wordCount;
//    if(textLength <= 750) {
//        wordCount = 21;
//    } else {
//        wordCount = 7;
//    }
//    let textPreview = '';
//    let charText = 0;
//    for (let i = 0; i < wordCount; i++) {
//        let word = '';
//        //for (let j = 0; j < 25; j++) {
//        //    let char = text[charText];
//        //    if (char === ' ') {
//        //        charText++;
//        //        break;
//        //    } else {
//        //        word = word + char;
//        //    }
//        //    charText++;
//        //}
//        let char = text[charText];
//        while(char !== ' '){
//            word = word + char;
//            charText++;
//            char = text[charText];
//            console.log("while");
//        }
//        charText++;
//        console.log("for");
//        //textPreview = textPreview + word;
//        textPreview = textPreview + word + ' ';
//    }
//    //console.log(text, textPreview, spaceCounter, charText);
//    console.log(charText ,textPreview);
//    return textPreview;
//}