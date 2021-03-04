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

    // Create grid array
    health.grid = [one,two,three,four,five,six];
    console.log(health.grid);

    // Set max values - not sure if I still need this
    health.column.one.max = one;
    health.column.two.max = two;
    health.column.three.max = three;
    health.column.four.max = four;
    health.column.five.max = five;
    health.column.six.max = six;
  }

}