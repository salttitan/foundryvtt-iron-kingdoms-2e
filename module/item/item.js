/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ikrpgItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;

    // console.log(itemData);

    if (itemData.type === 'melee weapon') this._prepareMeleeData(itemData, actorData);
    if (itemData.data.mechanika) this._prepareMechanikaData(itemData);
    if (itemData.type === 'mechanika ranged weapon') this._prepareMrwData(itemData, actorData);
    // if (itemData.type === 'grid') this._prepareGrid(itemData, actorData);
  }

  _prepareMeleeData(itemData, actorData) {
    const data = itemData.data;
    
  }

  _prepareMechanikaData(itemData) {
    const data = itemData.data;
    const selectedPower = data.powerSource.value;
    const rune0 = data.equippedRunes.rune0.value;
    const rune1 = data.equippedRunes.rune1.value;
    const rune2 = data.equippedRunes.rune2.value;
    const rune3 = data.equippedRunes.rune3.value;
    const rune4 = data.equippedRunes.rune4.value;
    const rune5 = data.equippedRunes.rune5.value;
    const rune6 = data.equippedRunes.rune6.value;
    const rune7 = data.equippedRunes.rune7.value;
    const rune8 = data.equippedRunes.rune8.value;
    const rune9 = data.equippedRunes.rune9.value;
    
    //Copy selected power source attributes
    data.powerSource.powerOutput = data.powerSources[selectedPower].powerOutput;
    data.powerSource.cost = data.powerSources[selectedPower].cost;
    data.powerSource.lifespan = data.powerSources[selectedPower].lifespan;
    data.powerSource.description = data.powerSources[selectedPower].description.join('\n');
    data.powerSource.special = data.powerSources[selectedPower].special;
    data.powerSource.requirements = data.powerSources[selectedPower].requirements;
    data.powerSource.materialCost = data.powerSources[selectedPower].materialCost;
    data.powerSource.fabrication = data.powerSources[selectedPower].fabrication;

    //Copy Rune attributes
    data.equippedRunes.rune0.type = data.runes[rune0].type;
    data.equippedRunes.rune0.cost = data.runes[rune0].cost;
    data.equippedRunes.rune0.points = data.runes[rune0].points;
    data.equippedRunes.rune0.effect = data.runes[rune0].effect;

    data.equippedRunes.rune1.type = data.runes[rune1].type;
    data.equippedRunes.rune1.cost = data.runes[rune1].cost;
    data.equippedRunes.rune1.points = data.runes[rune1].points;
    data.equippedRunes.rune1.effect = data.runes[rune1].effect;

    data.equippedRunes.rune2.type = data.runes[rune2].type;
    data.equippedRunes.rune2.cost = data.runes[rune2].cost;
    data.equippedRunes.rune2.points = data.runes[rune2].points;
    data.equippedRunes.rune2.effect = data.runes[rune2].effect;

    data.equippedRunes.rune3.type = data.runes[rune3].type;
    data.equippedRunes.rune3.cost = data.runes[rune3].cost;
    data.equippedRunes.rune3.points = data.runes[rune3].points;
    data.equippedRunes.rune3.effect = data.runes[rune3].effect;

    data.equippedRunes.rune4.type = data.runes[rune4].type;
    data.equippedRunes.rune4.cost = data.runes[rune4].cost;
    data.equippedRunes.rune4.points = data.runes[rune4].points;
    data.equippedRunes.rune4.effect = data.runes[rune4].effect;
  }

  _prepareGrid(itemData, actorData) {
    let boxes = itemData.boxes;
    
    if (actorData) {
     
    }
  }
}
