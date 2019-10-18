// Houses routes under the `/auth` namespace

use rocket::*;
use rocket::http::Status;
use rocket_contrib::json::{Json, JsonValue};

use crate::auth::{Credentials, ApiKey};
use crate::auth::models::{User};
use crate::DbConn;

#[post("/token", format = "application/json", data = "<creds>")]
fn token(creds: Json<Credentials>, conn: DbConn) -> Result<JsonValue, Status> {
    match User::fetch_by_user_pass(&creds.email, &creds.password, &conn) {
        None => Err(Status::NotFound),
        Some(user) => {
            match ApiKey::gen_new_token(user) {
                Ok(msg) => Ok(json!({ "success": true, "token": msg })),
                Err(_) => Err(Status::InternalServerError)
            }
        }
    }
}

pub fn routes() -> Vec<rocket::Route> {
    routes![token]
}
