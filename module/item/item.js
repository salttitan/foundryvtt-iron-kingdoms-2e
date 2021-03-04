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

    if (itemData.type === 'melee weapon') this._prepareMeleeData(itemData, actorData);
    // if (itemData.type === 'grid') this._prepareGrid(itemData, actorData);
  }

  _prepareMeleeData(itemData, actorData) {
    const data = itemData.data;
    
  }

  _prepareGrid(itemData, actorData) {
    let boxes = itemData.boxes;
    
    if (actorData) {
     
    }
  }
}
