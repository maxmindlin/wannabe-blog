#![feature(proc_macro_hygiene, decl_macro)]
#![feature(plugin)]
use blog;
use blog::posts;

use rocket::*;

#[get("/")]
fn index() -> &'static str {
    "Greetings"
}

fn main() {
    rocket::ignite()
        .manage(blog::init_pool())
        .mount("/", routes![index])
        .mount("/posts", posts::handlers::routes())
        .launch();
}
