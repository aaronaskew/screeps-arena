import { getObjectsByPrototype } from "game/utils";
import { Creep, Source, StructureSpawn } from "game/prototypes";
import {
    CARRY,
    ERR_NOT_IN_RANGE,
    MOVE,
    RANGED_ATTACK,
    RESOURCE_ENERGY,
    WORK,
} from "game/constants";

export function loop() {
    let spawn = getObjectsByPrototype(StructureSpawn)[0];
    let source = getObjectsByPrototype(Source)[0];
    let enemyCreeps = getObjectsByPrototype(Creep).filter((c) => !c.my);
    let harvesterCreep = getObjectsByPrototype(Creep).find((c) =>
        c.body.some((bodyPart) => bodyPart.type == CARRY)
    );
    let rangerCreeps = getObjectsByPrototype(Creep).filter((c) =>
        c.body.some((bodyPart) => bodyPart.type == RANGED_ATTACK)
    );

    if (!harvesterCreep) {
        harvesterCreep = spawn.spawnCreep([MOVE, WORK, CARRY]).object;
    } else {
        if (harvesterCreep.store.getFreeCapacity(RESOURCE_ENERGY)) {
            if (harvesterCreep.harvest(source) == ERR_NOT_IN_RANGE) {
                harvesterCreep.moveTo(source);
            }
        } else {
            if (
                harvesterCreep.transfer(spawn, RESOURCE_ENERGY) ==
                ERR_NOT_IN_RANGE
            ) {
                harvesterCreep.moveTo(spawn);
            }
        }

        // Attack
        for (let ranger of rangerCreeps) {
            if (ranger.rangedAttack(enemyCreeps[0]) == ERR_NOT_IN_RANGE) {
                ranger.moveTo(enemyCreeps[0]);
            }
        }

        // Make more rangers
        spawn.spawnCreep([MOVE, RANGED_ATTACK]);
    }
}
