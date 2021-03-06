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

    // Set Magic
    const selectedTradition = data.magic.tradition.label;
    const tradition = data.magic.tradition;
    const traditions = data.magic.traditions;

    tradition.resource.label = traditions[selectedTradition].resource.label;
    if (tradition.label === "focuser") {
      tradition.resource.max = secondary.arc.value;
    } else if (tradition.label === "will_weaver") {
      tradition.resource.max = (secondary.arc.value * 2);
    } else if (tradition.label === "none") {
      tradition.resource.max = 0;
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