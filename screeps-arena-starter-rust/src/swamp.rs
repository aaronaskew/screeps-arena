use log::*;
use screeps_arena::{
    constants::{prototypes, Part},
    game,
    prelude::*,
};

// strategy for spawn and swamp arena, which will conditionally compile in
// only when this feature is enabled for the crate
pub fn tick() {
    let mut enemy_spawn = None;
    let spawns = game::utils::get_objects_by_prototype(prototypes::STRUCTURE_SPAWN);
    warn!("spawns {}", spawns.len());
    for spawn in spawns {
        if spawn.my().unwrap_or(false) {
            spawn
                .spawn_creep(&[Part::Move, Part::Attack])
                .expect("can't spawn creep");
        } else {
            enemy_spawn = Some(spawn);
        }
    }

    let creeps = game::utils::get_objects_by_prototype(prototypes::CREEP);
    warn!("creeps {}", creeps.len());
    for creep in creeps {
        if creep.my() {
            match &enemy_spawn {
                Some(t) => {
                    creep.move_to(t.as_ref(), None);
                    creep.attack(t);
                }
                None => {}
            }
        }
    }
}
