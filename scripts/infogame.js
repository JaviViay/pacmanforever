//player name
function playerName() {
    var text;
    var person = prompt("Please, enter your name");
    if (person == null || person == "") {
        text = "Mom´s boy&#x1f37c";
    } else {
        text = person;
    }
    text = text.substr(0, 20);
    document.getElementById("name").innerHTML = text;
}