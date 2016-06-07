module.exports = function () {

  return function(tile, name) {

    var output;


    switch((tile + " " + name)){
        // Bamboo
        case "Bamboo 1":
        output = "z"
        break;
        case "Bamboo 2":
        output = "x"
        break;
        case "Bamboo 3":
        output = "c"
        break;
        case "Bamboo 4":
        output = "v"
        break;
        case "Bamboo 5":
        output = "b"
        break;
        case "Bamboo 6":
        output = "n"
        break;
        case "Bamboo 7":
        output = "m"
        break;
        case "Bamboo 8":
        output = ","
        break;
        case "Bamboo 9":
        output = "."
        break;

        // Characters
        case "Character 1":
        output = "a"
        break;
        case "Character 2":
        output = "s"
        break;
        case "Character 3":
        output = "d"
        break;
        case "Character 4":
        output = "f"
        break;
        case "Character 5":
        output = "g"
        break;
        case "Character 6":
        output = "h"
        break;
        case "Character 7":
        output = "j"
        break;
        case "Character 8":
        output = "k"
        break;
        case "Character 9":
        output = "l"
        break;

        // Circle
        case "Circle 1":
        output = "q"
        break;
        case "Circle 2":
        output = "w"
        break;
        case "Circle 3":
        output = "e"
        break;
        case "Circle 4":
        output = "r"
        break;
        case "Circle 5":
        output = "t"
        break;
        case "Circle 6":
        output = "y"
        break;
        case "Circle 7":
        output = "u"
        break;
        case "Circle 8":
        output = "i"
        break;
        case "Circle 9":
        output = "o"
        break;

        // Flowers
        case "Flower Orchid":
        output = "!"
        break;
        case "Flower Plum":
        output = '"';
        break;
        case "Flower Bamboo":
        output = "#"
        break;
        case "Flower Chrysantememum":
        output = "€"
        break;

        // Wind
        case "Wind North":
        output = "1"
        break;
        case "Wind East":
        output = "2"
        break;
        case "Wind South":
        output = "3"
        break;
        case "Wind West":
        output = "4"
        break;

        default: console.log(tile + " " + name);
    }

    return output;

  }

}
