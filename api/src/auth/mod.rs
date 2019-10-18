use rocket::Outcome;
use rocket::request::{self, Request, FromRequest};
use jwt::{Header, Registered, Token};
use crypto::sha2::Sha256;

use crate::auth::models::User;

pub mod models;
pub mod handlers;

#[derive(Debug, Serialize, Deserialize)]
pub struct Credentials {
    email: String,
    password: String
}

pub struct ApiKey(pub String);

impl ApiKey {
    // Read an existing jwt and validate it
    pub fn read_token(key: &str) -> Result<String, String> {
        let token = Token::<Header, Registered>::parse(key).expect("Unable to parse key");
        if token.verify(b"secret_key", Sha256::new()) {
            token.claims.sub.ok_or("Claims not valid".to_string())
        } else {
            Err("Token not valid".to_string())
        }
    }

    // Generate a new jwt
    pub fn gen_new_token(user: User) -> Result<String, String> {
        let header: Header = Default::default();
        let claims = Registered {
            sub: Some(user.first_name.into()),
            ..Default::default()
        };
        let token = Token::new(header, claims);
        match token.signed(b"secret_key", Sha256::new()) {
            Ok(msg) => Ok(msg),
            Err(_) => Err("Failed to generate token".to_string())
        }
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for ApiKey {
    type Error = ();

    // Pull the token out of the authorization header and verify it
    fn from_request(request: &'a Request<'r>) -> request::Outcome<ApiKey, ()> {
        let keys: Vec<_> = request
            .headers()
            .get("Authorization")
            .map(|bearer| bearer.replace("Bearer ", ""))
            .collect();
        if keys.len() != 1 {
            return Outcome::Forward(());
        }
        match ApiKey::read_token(&keys[0]) {
            Ok(claim) => Outcome::Success(ApiKey(claim)),
            Err(_) => Outcome::Forward(())
        }
    }
}
