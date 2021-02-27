// Import Modules
import { ikrpgActor } from "./actor/actor.js";
import { ikrpgActorSheet } from "./actor/actor-sheet.js";
import { ikrpgItem } from "./item/item.js";
import { ikrpgItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.ikrpg2e = {
    ikrpgActor,
    ikrpgItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "2d6",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = ikrpgActor;
  CONFIG.Item.entityClass = ikrpgItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ikrpg2e", ikrpgActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("ikrpg2e", ikrpgItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});