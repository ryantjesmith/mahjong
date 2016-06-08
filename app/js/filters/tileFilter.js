module.exports = function () {

  return function(tile, name) {

    var output;


    switch((tile + " " + name)){
        // Bamboo
        case "Bamboo 1":
        output = "0px"
        break;
        case "Bamboo 2":
        output = "-69px"
        break;
        case "Bamboo 3":
        output = "-138px"
        break;
        case "Bamboo 4":
        output = "-206px"
        break;
        case "Bamboo 5":
        output = "-275px"
        break;
        case "Bamboo 6":
        output = "-1994px"
        break;
        case "Bamboo 7":
        output = "-1994px"
        break;
        case "Bamboo 8":
        output = "-1994px"
        break;
        case "Bamboo 9":
        output = "-1994px"
        break;

        default:
        output = "-1994px"
        console.log(tile + " " + name);
    }

    return output;

  }

}
