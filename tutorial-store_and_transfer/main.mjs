import { RESOURCE_ENERGY } from "game/constants";
import { Creep, StructureContainer, StructureTower } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

export function loop() {
  let tower = getObjectsByPrototype(StructureTower)[0];

  if (tower.store[RESOURCE_ENERGY] < 10) {
    let myCreep = getObjectsByPrototype(Creep).find((c) => c.my);
    if (myCreep.store[RESOURCE_ENERGY] == 0) {
      let container = getObjectsByPrototype(StructureContainer)[0];
      myCreep.withdraw(container, RESOURCE_ENERGY);
    } else {
      myCreep.transfer(tower, RESOURCE_ENERGY);
    }
  } else {
    let target = getObjectsByPrototype(Creep).find((c) => !c.my);
    tower.attack(target);
  }
}

// export function loop() {
// const tower = utils.getObjectsByPrototype(prototypes.StructureTower)[0];
//     if(tower.store[constants.RESOURCE_ENERGY] < 10) {
//         var myCreep = utils.getObjectsByPrototype(prototypes.Creep).find(creep => creep.my);
//         if(myCreep.store[constants.RESOURCE_ENERGY] == 0) {
//             var container = utils.getObjectsByPrototype(prototypes.StructureContainer)[0];
//             myCreep.withdraw(container, constants.RESOURCE_ENERGY);
//         } else {
//             myCreep.transfer(tower, constants.RESOURCE_ENERGY);
//         }
//     } else {
//         var target = utils.getObjectsByPrototype(prototypes.Creep).find(creep => !creep.my);
//         tower.attack(target);
//     }
// }
