addLayer("l", {
    name: "level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // Level and XP Stuff
        levels: new Decimal(0),
        levelScaling: new Decimal(1.5),
        levelReq: new Decimal(0),
        levelToGet: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Level", // Name of prestige currency
    baseResource: "Total XP", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    update(diff){
        player.level.levelReq = player.level.levelScaling.pow(player.level.levels.sub(1)).times(10)
        if (player.points.gte(player.level.levelReq)) player.level.level.add(player.level.add(1))
    },

    tooltip(){ return "You have "+player.level.level+", and "+player.points+" Total XP"},
    layerShown(){return true}
})
