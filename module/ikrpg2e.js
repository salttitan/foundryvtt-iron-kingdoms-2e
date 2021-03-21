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

  Handlebars.registerHelper('healthGrid', (path, value, total) => {
    const gridHtml = [];
     
    gridHtml.push('<div class="test-tracking">');
      for (let i = 1; i <= total; i++){
        gridHtml.push(`<input type="radio" value="${i}" data-binding="${path}"${value.toString() === i.toString() ? " checked" : ""}${i > total ? " disabled" : ""}>`);
        gridHtml.push('<label class="progress-tick"></label>');
      }
    gridHtml.push('</div>')
    return gridHtml.join('\n');

  });

  // Multiboxes.
  Handlebars.registerHelper('multiboxes', function(selected, options) {
    
    let html = options.fn(this);

    // Fix for single non-array values.
    if ( !Array.isArray(selected) ) {
      selected = [selected];
    }
    
    if (typeof selected !== 'undefined') {
      selected.forEach(selected_value => {
        if (selected_value !== false) {
          const escapedValue = RegExp.escape(Handlebars.escapeExpression(selected_value));
          const rgx = new RegExp(' value=\"' + escapedValue + '\"');
          html = html.replace(rgx, "$& checked=\"checked\"");
        }
      });
    }
    return html;
  });

  // "N Times" loop for handlebars.
  //  Block is executed N times starting from n=1.
  //
  // Usage:
  // {{#times_from_1 10}}
  //   <span>{{this}}</span>
  // {{/times_from_1}}
  Handlebars.registerHelper('times_from_1', function(n, block) {

    var accum = '';
    for (var i = 1; i <= n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });
});