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
        output = "-344px"
        break;
        case "Bamboo 7":
        output = "-413px"
        break;
        case "Bamboo 8":
        output = "-481px"
        break;
        case "Bamboo 9":
        output = "-550px"
        break;

        // Character
        case "Character 1":
        output = "-619px"
        break;
        case "Character 2":
        output = "-687px"
        break;
        case "Character 3":
        output = "-756px"
        break;
        case "Character 4":
        output = "-825px"
        break;
        case "Character 5":
        output = "-894px"
        break;
        case "Character 6":
        output = "-963px"
        break;
        case "Character 7":
        output = "-1031px"
        break;
        case "Character 8":
        output = "-1100px"
        break;
        case "Character 9":
        output = "-1168px"
        break;

        // Circle
        case "Circle 1":
        output = "-1238px"
        break;
        case "Circle 2":
        output = "-1306px"
        break;
        case "Circle 3":
        output = "-1375px"
        break;
        case "Circle 4":
        output = "-1444px"
        break;
        case "Circle 5":
        output = "-1513px"
        break;
        case "Circle 6":
        output = "-1581px"
        break;
        case "Circle 7":
        output = "-1650px"
        break;
        case "Circle 8":
        output = "-1719px"
        break;
        case "Circle 9":
        output = "-1787px"
        break;

        // Dragon
        case "Dragon Green":
        output = "-1856px"
        break;
        case "Dragon Red":
        output = "-1925px"
        break;
        case "Dragon White":
        output = "-1994px"
        break;

        // Flower
        case "Flower Bamboo":
        output = "-2063px"
        break;
        case "Flower Chrysantememum":
        output = "-2132px"
        break;
        case "Flower Orchid":
        output = "-2200px"
        break;
        case "Flower Plum":
        output = "-2269px"
        break;

        // Season
        case "Season Autumn":
        output = "-2338px"
        break;
        case "Season Spring":
        output = "-2406px"
        break;
        case "Season Summer":
        output = "-2476px"
        break;
        case "Season Winter":
        output = "-2545px"
        break;

        // Wind
        case "Wind North":
        output = "-2407px"
        break;
        case "Wind East":
        output = "-2475px"
        break;
        case "Wind South":
        output = "-2544px"
        break;
        case "Wind West":
        output = "-2613px"
        break;

        default:
        output = "-1994px"
        console.log(tile + " " + name);
    }

    return output;

  }

}
