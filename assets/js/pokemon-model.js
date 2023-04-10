
class Pokemon {
    name;
    number;
    types = [];
    mainType;
    pic;

    constructor(name, number, types, mainType, pic){
        this.name = name;
        this.number = number;
        this.types = types;
        this.mainType = mainType;
        this.pic = pic;
    }
}