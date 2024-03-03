import { getObjectsByPrototype } from "game/utils";
import { Creep, Source, StructureSpawn } from "game/prototypes";
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from "game/constants";

export function loop() {
  let creep = getObjectsByPrototype(Creep).find((c) => c.my);
  let spawn = getObjectsByPrototype(StructureSpawn).find((i) => i.my);
  let source = getObjectsByPrototype(Source)[0];

  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  } else {
    if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  }
}
