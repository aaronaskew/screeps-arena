import { getObjectsByPrototype } from "game/utils";
import { Creep, Flag } from "game/prototypes";
import {} from "game/constants";

export function loop() {
  let flags = getObjectsByPrototype(Flag);
  let myCreeps = getObjectsByPrototype(Creep).filter((c) => c.my);

  for (var creep of myCreeps) {
    let closestFlag = creep.findClosestByPath(flags);
    creep.moveTo(closestFlag);
  }
}
