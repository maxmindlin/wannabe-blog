// Houses routes under the `/auth` namespace

use rocket::*;
use rocket::http::Status;
use rocket_contrib::json::{Json, JsonValue};
use jwt::{Header, Registered, Token};
use crypto::sha2::Sha256;

use crate::auth::Credentials;
use crate::auth::models::{User};
use crate::DbConn;

#[post("/login", format = "application/json", data = "<creds>")]
fn login(creds: Json<Credentials>, conn: DbConn) -> Result<JsonValue, Status> {
    let header: Header = Default::default();
    match User::fetch_by_user_pass(&creds.email, &creds.password, &conn) {
        None => Err(Status::NotFound),
        Some(user) => {
            let claims = Registered {
                sub: Some(user.first_name.into()),
                ..Default::default()
            };
            let token = Token::new(header, claims);

            match token.signed(b"secret_key", Sha256::new()) {
                Ok(msg) => Ok(json!({ "success": true, "token": msg })),
                Err(_) => Err(Status::InternalServerError)
            }
        }
    }
}

pub fn routes() -> Vec<rocket::Route> {
    routes![login]
}
