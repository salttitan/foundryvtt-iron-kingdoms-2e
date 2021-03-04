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

  Handlebars.registerHelper('healthGrid', (health) => {
    const gridHtml = [];
     
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

        if (health.grid[j] >= i && j <2) {
          let dmg_row = health.grid[j] - i +1;
          let box_str = "<td class='damage_box' style='text-align: center; border:1px solid rgba(0,0,0,0.125); width: 16px; height: 16px; background-color: blue;'><input type='radio'>";
          
          str += box_str;

          str += "</td>";
        } else  if (health.grid[j] >= i && j <4) {
          let dmg_row = health.grid[j] - i +1;
          let box_str = "<td class='damage_box' style='text-align: center; border:1px solid rgba(0,0,0,0.125); width: 16px; height: 16px; background-color: red;'><input type='radio'>";
          
          str += box_str;

          str += "</td>";
        } else  if (health.grid[j] >= i && j <6) {
          let dmg_row = health.grid[j] - i +1;
          let box_str = "<td class='damage_box' style='text-align: center; border:1px solid rgba(0,0,0,0.125); width: 16px; height: 16px; background-color: green;'><input type='radio'>";
          
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
    gridHtml.push(str);
    return gridHtml.join('\n');

  });
});