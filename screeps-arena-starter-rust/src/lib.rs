use log::*;
use screeps_arena::game;
use wasm_bindgen::prelude::*;

mod logging;

#[cfg(feature = "arena-collect-and-control")]
mod collect;
#[cfg(feature = "arena-capture-the-flag")]
mod ctf;
#[cfg(feature = "arena-spawn-and-swamp")]
mod swamp;

fn setup() {
    logging::setup_logging(logging::Info);
}

// add wasm_bindgen to any function you would like to expose for call from js
// to use a reserved name as a function name, use `js_name`:
#[wasm_bindgen(js_name = loop)]
pub fn tick() {
    let tick = game::utils::get_ticks();

    if tick == 1 {
        setup();
    }
    warn!("hello arena! {}", tick);

    let info = game::arena_info();
    warn!("arena_info: {:?}", info);

    #[cfg(feature = "arena-capture-the-flag")]
    {
        ctf::tick();
    }
    #[cfg(feature = "arena-spawn-and-swamp")]
    {
        swamp::tick();
    }
    #[cfg(feature = "arena-collect-and-control")]
    {
        collect::tick();
    }
}
