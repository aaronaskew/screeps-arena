import { getObjectsByPrototype } from "game/utils";
import { Creep } from "game/prototypes";
import { ATTACK, HEAL, RANGED_ATTACK } from "game/constants";
import { BodyPart, Flag } from "arena/season_alpha/capture_the_flag/basic";

let pos1 = { x: 67, y: 36 };
let pos2 = { x: 36, y: 67 };

export function loop() {
    var myFlag = getObjectsByPrototype(Flag).find((object) => object.my);
    var enemyFlag = getObjectsByPrototype(Flag).find((object) => !object.my);
    var myCreeps = getObjectsByPrototype(Creep).filter((object) => object.my);
    var bodyParts = getObjectsByPrototype(BodyPart);
    var enemyCreeps = getObjectsByPrototype(Creep).filter(
        (object) => !object.my
    );

    //send healers to enemyFlag
    for (var creep of myCreeps.filter((c) =>
        c.body.some((bp) => bp.type == HEAL)
    )) {
        creep.moveTo(enemyFlag);
    }

    //positition attackers at choke points
    for (var creep of myCreeps.filter((c) =>
        c.body.some(
            (bodyPart) =>
                bodyPart.type == ATTACK || bodyPart.type == RANGED_ATTACK
        )
    )) {
        if (Number(creep.id) % 2 == 0) {
            creep.moveTo(pos1);
        } else {
            creep.moveTo(pos2);
        }

        for (var enemy of enemyCreeps) {
            if (creep.getRangeTo(enemy) <= 3) {
                if (creep.body.some((bp) => bp.type == ATTACK)) {
                    creep.attack(enemy);
                } else {
                    creep.rangedAttack(enemy);
                }
            }
        }
    }

    // for (creep of enemyCreeps) {
    //     console.log(creep.id, "range of flag:", creep.getRangeTo(myFlag));
    // }
}
