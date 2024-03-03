import { getObjectsByPrototype } from 'game/utils';
import { Creep, Flag } from 'game/prototypes';

export function loop() {
    // Your code goes here
    var creeps = getObjectsByPrototype(Creep);
    var flags = getObjectsByPrototype(Flag);
    creeps[0].moveTo(flags[0]);
}
