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

    //calculate health
    const health = data.health;
    health.column.one.max = Math.round(primary.phy.value / 2);
    health.column.two.max = primary.phy.value - health.column.one.value;
    health.column.three.max = Math.round(primary.agl.value / 2);
    health.column.four.max = primary.agl.value - health.column.three.value;
    health.column.five.max = Math.round(primary.int.value / 2);
    health.column.six.max = primary.int.value - health.column.five.value;
    console.log(health.column.one.max);
  }

}