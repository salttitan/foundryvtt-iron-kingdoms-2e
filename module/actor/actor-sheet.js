/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ikrpgActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ikrpg2e", "sheet", "actor"],
      template: "systems/ikrpg2e/templates/actor/actor-sheet.html",
      width: 600,
      height: 650,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    const path = "systems/ikrpg2e/templates/actor";

    return `${path}/${this.actor.data.type}-sheet.html`;
  }
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];
    for (let attr of Object.values(data.data.attributes)) {
      attr.isCheckbox = attr.dtype === "Boolean";
    }

    // Prepare items and grid
    if (this.actor.data.type == 'character') {
      this._prepareCharacterItems(data);
      this._prepareCharacterHealth(data);
    }

    if (this.actor.data.type == 'steamjack') {
      this._prepareSteamjackItems(data);
    }

    return data;
  }

  _prepareCharacterHealth(sheetData) {
    const actorData = sheetData.actor;
    const health = actorData.data.health;
    // console.log(health);
    
    // Start the health grid div
    let str = "<div style='border: 1px solid rgba(0,0,0,.125); border-radius: .25rem; font-size: 10px; width: 200px;'>"
    + "<div style='background-color: #fefefe; border-bottom: 1px solid rgba(0,0,0,.125); margin-bottom: 0; padding: 3px; padding-left: 5px;'>Damage Track</div>";

    // Add the content div
    str += "<div style='padding: 3px;'>";
    str += "<table style ='width:100%; font-size: 8px; padding: 1px;'>"
    // Pass through once for each of the first ten boxes
    let max_value = 0;
    for (var i = -1; i < 6; i++){
      if (health.grid[i] > max_value) { max_value = health.grid[i]; }
    }

    for (var i = max_value; i > 0; i--) {

      str+= "<tr>"
      //if any row has this many boxes, add it
      for (var j = 0; j < 6; j++) {

        if (health.grid[j] >= i) {
          let dmg_row = health.grid[j] - i +1;
          let box_str = "<td class='damage_box' style='text-align: center; border:1px solid rgba(0,0,0,0.125); width: 16px; height: 16px;'><input type='radio'>";
          
          str += box_str;

          str += "</td>";
        } else {
          str += "<td class='damage_box' style='text-align: center; border:0px solid rgba(0,0,0,0.125); width: 16px; height: 16px;'></td>";
        }
      }
      str += "</tr>";
    }
    str += "</table>";
    str += "</div>";
    str +="</div>";

    actorData.str = str;
    
  }


  _prepareCharacterItems(sheetData){
    const actorData = sheetData.actor;

    //Initialize containers
    const rangedWeapons = [];
    const meleeWeapons = [];
    const spells = [];
    const abilities = [];
    const skills = [];
    const careers = [];
    const archetypes = [];
    const gear = [];
    const races = [];
    const armors = [];

    //Iterate through items, allocating to containers
    for (let i of sheetData.items) {
      let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;
      if (i.type === 'item') {
        gear.push(i);
        // console.log(gear);
      }

      if (i.type === 'ranged weapon') {
        rangedWeapons.push(i);
      }

      if (i.type === 'melee weapon') {
        meleeWeapons.push(i);
      }

      if (i.type === 'spell') {
        spells.push(i);
      }

      if (i.type === 'ability') {
        abilities.push(i);
      }

      if (i.type === 'skill') {
        skills.push(i);
      }

      if (i.type === 'career') {
        careers.push(i);
      }

      if (i.type === 'archetype') {
        archetypes.push(i);
      }

      if (i.type === 'race') {
        races.push(i);
      }

      if (i.type === 'armor'){
        armors.push(i);
      }
    }

    actorData.gear = gear;
    actorData.rangedWeapons = rangedWeapons;
    actorData.meleeWeapons = meleeWeapons;
    actorData.spells = spells;
    actorData.abilities = abilities;
    actorData.skills = skills;
    actorData.careers = careers;
    actorData.archetypes = archetypes;
    actorData.races = races;
    actorData.armors = armors;
  }

  _prepareSteamjackItems(sheetData){
    const actorData = sheetData.actor;

    //Initialize containers
    const rangedWeapons = [];
    const meleeWeapons = [];
    const gear = [];
    const cortex = [];

    //Iterate through items, allocating to containers
    for (let i of sheetData.items) {
      let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;
      if (i.type === 'steamjack gear') {
        if (i.steamjack.value){
          gear.push(i);
        }
      }

      if (i.type === 'ranged weapon') {
        rangedWeapons.push(i);
      }

      if (i.type === 'melee weapon') {
        meleeWeapons.push(i);
      }

      if (i.type === 'cortex') {
        cortex.push(i);
      }
    }

    actorData.gear = gear;
    actorData.rangedWeapons = rangedWeapons;
    actorData.meleeWeapons = meleeWeapons;
    actorData.cortex = cortex;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      console.log(ev);
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Magic Resource Reset
    html.find('.reset-magic').click(this._resetMagic(this));

    // Add health
    html.find('.add-health').click(this._addHealth(this));

    // Add health
    html.find('.rm-health').click(this._removeHealth(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    console.log("item created");
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */

  _onRoll(event) {
    console.log(event);
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
    }
  }

  _resetMagic(data) {
    console.log("reset magic");
    // console.log(data);
    // const actorData = sheetData.actor;
    // const arc = actorData.stats.secondary.arc.value;
    // if (actorData.magic.tradition.label === "focuser") {
    //   actorData.magic.tradition.resource.value = actorData.magic.tradition.resource.max;
    // } else if (actorData.magic.tradition.label === 'will_weaver') {
    //   let currentValue = actorData.magic.tradition.resource.value;
    //   if (currentValue > arc) {
    //     actorData.magic.tradition.resource.value = (currentValue - arc);
    //   } else {
    //     actorData.magic.tradition.resource.value = 0
    //   }
    // } 
  }

  _addHealth(data) {
    console.log("add");
    console.log(data);
  }

  _removeHealth(data) {
    console.log("remove");
    console.log(data);
  }
}
