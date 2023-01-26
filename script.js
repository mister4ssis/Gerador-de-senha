var allCharsToPassword = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.+-[]*~_@#:?",
    specialChars = ".+-[]*~_@#:?",
    numbersChars = "0123456789",
    upperCaseLettersChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCaseLettersChars = "abcdefghijklmnopqrstuvwxyz";
function gerarSenha() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked'),
        numberOfChars = document.getElementById("passwordLenght").value,
        charsToCreatePassword = '',
        finalPassword = '',

        selectedsCheckboxes = Array.from(checkboxes).map(x => x.value)
    if (selectedsCheckboxes.length === 0) {
        charsToCreatePassword = allCharsToPassword
    } else {
        selectedsCheckboxes.forEach(selectedCheck => {
            switch (parseInt(selectedCheck)) {
                case 1:
                    charsToCreatePassword += allCharsToPassword.substring(0, 26)
                    break;
                case 2:
                    charsToCreatePassword += allCharsToPassword.substring(26, 52)
                    break;
                case 3:
                    charsToCreatePassword += allCharsToPassword.substring(52, 62)
                    break;
                case 4:
                    charsToCreatePassword += allCharsToPassword.substring(62, 74)

                    break;
            }
        });
    }
    var charsToCreatePasswordLength = charsToCreatePassword.length
    for (let index = 0; index < numberOfChars; index++) {

        var randomNumber = Math.floor(Math.random() * charsToCreatePasswordLength);
        finalPassword += charsToCreatePassword.substring(randomNumber, randomNumber + 1);
        // console.log(charsToCreatePassword.charAt(Math.floor(Math.random() * charsToCreatePasswordLength)));
        // finalPassword += charsToCreatePassword.charAt(Math.floor(Math.random() * charsToCreatePasswordLength));
    }

    if (!isValid(finalPassword, selectedsCheckboxes)) {
        finalPassword = ""
        gerarSenha()
        return;
    }
    document.getElementById('passwordFinal').value = finalPassword
}

function isValid(password, selectedCheckbox) {

    var checkIsValid = true,
        arrayPassword = password.split(""),
        checkValidUpperCase = arrayPassword.some(testUpperCase),
        checkValidLowerCase = arrayPassword.some(testLowerCase),
        checkValidNumbers = arrayPassword.some(testNumbers),
        checkValidChars = arrayPassword.some(testChars)
    if (selectedCheckbox.length === 0) {
        if (!(checkValidUpperCase && checkValidLowerCase && checkValidNumbers && checkValidChars))
            checkIsValid = false
    } else {
        selectedCheckbox.forEach(selectedCheck => {
            switch (parseInt(selectedCheck)) {
                case 1:
                    if (!checkValidUpperCase) {

                        console.log("Not have upper case letters");
                        checkIsValid = false
                    }
                    break;
                case 2:
                    if (!checkValidLowerCase) {

                        console.log("Not have lower case letters");
                        checkIsValid = false
                    }
                    break;
                case 3:
                    if (!checkValidNumbers) {

                        console.log("Not have numbers");
                        checkIsValid = false
                    }
                    break;
                case 4:
                    if (!checkValidChars) {
                        console.log("Not have chars");
                        checkIsValid = false
                    }
                    break;
            }
        })
    }

    return checkIsValid
}
function testChars(char) {

    return specialChars.includes(char)
}
function testNumbers(char) {
    return numbersChars.includes(char)
}
function testUpperCase(char) {
    return upperCaseLettersChars.includes(char)
}
function testLowerCase(char) {
    return lowerCaseLettersChars.includes(char)
}
function changePasswordLenght() {
    var numberOfChars = document.getElementById("passwordLenght").value
    console.log({ numberOfChars });
    document.getElementById('valueOfPasswordLenght').innerHTML = numberOfChars
    gerarSenha()
}
changePasswordLenght()