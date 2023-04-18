
class Pokemon {
    name;
    number;
    types;
    pic;
    height;
    weight;
    abilities;
    stats;
    moves;
    habitat;
    genderRate;
    eggGroups;
    isBaby;
    isLegendary;
    isMythical;
    evolutionChain;

    constructor(
        name, number, types, pic, height, weight, abilities, stats, moves,
        habitat, genderRate, eggGroups, isBaby, isLegendary, isMythical, evolutionChain
    ) {
        this.name = name;
        this.number = number;
        this.types = types;
        this.pic = pic;
        this.height = height;
        this.weight = weight;
        this.abilities = abilities;
        this.stats = stats;
        this.moves = moves;
        this.habitat = habitat;
        this.genderRate = genderRate;
        this.eggGroups = eggGroups;
        this.isBaby = isBaby;
        this.isLegendary = isLegendary;
        this.isMythical = isMythical;
        this.evolutionChain = evolutionChain;
    }
}
