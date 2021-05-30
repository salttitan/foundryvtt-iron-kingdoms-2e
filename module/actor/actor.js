/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class ikrpgActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
    if (actorData.type === 'steamjack') this._prepartSteamjackData(actorData);
    if (actorData.type === 'grunt') this._prepareGruntData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;
    const primary = data.stats.primary;
    const secondary = data.stats.secondary;
    const derived = data.stats.derived;
    const mods = data.stats.modifiers;

    // Make modifications to data here. For example:

    // Calculate derived stats
    derived.def.value = secondary.spd.value + primary.agl.value + secondary.per.value + mods.def.racial.value + mods.def.equipment.value;
    derived.arm.value = primary.phy.value + mods.arm.shield.value + mods.arm.armor.value + mods.arm.other.value;
    derived.init.value = secondary.spd.value + secondary.prw.value + secondary.per.value + mods.init.equipment.value + mods.init.additional.value;
    derived.cmd.value = primary.int.value + mods.cmd.skill.value + mods.cmd.ability.value;

    // Calculate health
    const health = data.health;
    
    // Calculate even fields first so that they are larger when the total is odd
    let two = Math.round(primary.phy.value / 2);
    let four = Math.round(primary.agl.value / 2);
    let six = Math.round(primary.int.value / 2);

    // Calculate odd fields
    let one = primary.phy.value - two;
    let three = primary.agl.value - four;
    let five = primary.int.value - six;

    // // Create grid array
    
    // let columnOne = health.grid.one;
    // for (let i = 0; i < columnOne.length; i++) {
      
    //   if (one > i) {
    //     columnOne[i] = true;
    //   }
    // }

    // let columnTwo = health.grid.two;
    // for (let i = 0; i < columnTwo.length; i++) {
      
    //   if (two > i) {
    //     columnTwo[i] = true;
    //   }
    // }
  
    // let columnThree = health.grid.three;
    // for (let i = 0; i < columnThree.length; i++) {
      
    //   if (three > i) {
    //     columnThree[i] = true;
    //   }
    // }

    // let columnFour = health.grid.four;
    // for (let i = 0; i < columnFour.length; i++) {
      
    //   if (four > i) {
    //     columnFour[i] = true;
    //   }
    // }

    // let columnFive = health.grid.five;
    // for (let i = 0; i < columnFive.length; i++) {
      
    //   if (five > i) {
    //     columnFive[i] = true;
    //   }
    // }

    // let columnSix = health.grid.six;
    // for (let i = 0; i < columnSix.length; i++) {
      
    //   if (four > i) {
    //     columnSix[i] = true;
    //   }
    // }
    
    // console.log(health.grid);

    // Set max values - not sure if I still need this
    health.column.one.max = one;
    health.column.two.max = two;
    health.column.three.max = three;
    health.column.four.max = four;
    health.column.five.max = five;
    health.column.six.max = six;

    // Set Magic
    const selectedTradition = data.magic.tradition.label;
    const tradition = data.magic.tradition;
    const traditions = data.magic.traditions;

    console.log(data.magic.tradition);

    tradition.resource.label = traditions[selectedTradition].resource.label;
    if(tradition.label === "focuser") {
      console.log("Focuser");
      tradition.resource.max = secondary.arc.value;
    } else if (tradition.label === "will_weaver") {
      console.log("Focuser");
      tradition.resource.max = (secondary.arc.value * 2);
    }
  }

  _prepartSteamjackData(actorData) {
    const data = actorData.data;
    const primary = data.stats.primary;
    const secondary = data.stats.secondary;
    const derived = data.stats.derived;
    const mods = data.stats.modifiers;

    //Add shield to armor value
    derived.arm.value = mods.arm.shield.value + mods.arm.armor.value;
  }

  _prepareGruntData(actorData) {
    
    

  }
}