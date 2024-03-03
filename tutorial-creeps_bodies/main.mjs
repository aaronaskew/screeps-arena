import { ATTACK, ERR_NOT_IN_RANGE, HEAL, RANGED_ATTACK } from "game/constants";
import { Creep } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";

export function loop() {
  let myCreeps = getObjectsByPrototype(Creep).filter((creep) => creep.my);
  let enemyCreep = getObjectsByPrototype(Creep).find((creep) => !creep.my);

  for (var creep of myCreeps) {
    if (creep.body.some((bodyPart) => bodyPart.type == ATTACK)) {
      if (creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemyCreep);
      }
    }

    if (creep.body.some((bodyPart) => bodyPart.type == RANGED_ATTACK)) {
      if (creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemyCreep);
      }
    }

    if (creep.body.some((bodyPart) => bodyPart.type == HEAL)) {
      let myDamagedCreeps = myCreeps.filter(
        (creep) => creep.hits < creep.hitsMax
      );

      if (myDamagedCreeps.length > 0) {
        if (creep.heal(myDamagedCreeps[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(myDamagedCreeps[0]);
        }
      }
    }
  }
}
