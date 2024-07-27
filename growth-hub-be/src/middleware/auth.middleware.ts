import { Request, Response } from 'express';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import fetch from "node-fetch"

let pems: { [key: string]: any }  = {}

class AuthMiddleware {
  private poolRegion: string = 'us-east-1';
  private userPoolId: string = 'us-east-1_BQgO5i2RJ';

  constructor() {
    this.setUp()
  }

  private verifyToken(req: Request, resp: Response, next): void {
    const { token } = req.headers;
    if (!token) return resp.status(401).end();

    let decodedJwt: any = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      resp.status(401).end()
      return
    }
    const userSub = decodedJwt.payload.sub;
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    if (!pem) {
        return resp.status(401).end()
    }
    jwt.verify(token, pem, function (err: any, payload: any) {
        if (err) {
            return resp.status(401).end()
        } else {
            // Add userSub to the request object
            req.userSub = userSub;
            next()
        }
    })
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful'
      }
      const data = await response.json();
      const { keys } = data;
        for (let i = 0; i < keys.length; i++) {
          const key_id = keys[i].kid;
          const modulus = keys[i].n;
          const exponent = keys[i].e;
          const key_type = keys[i].kty;
          const jwk = { kty: key_type, n: modulus, e: exponent };
          const pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        console.log("got PEMS")
    } catch (error) {
      console.log(error)
      console.log('Error! Unable to download JWKs');
    }
  }
}

export default AuthMiddleware