import AWS from 'aws-sdk';
import crypto from 'crypto'
import * as dotenv from 'dotenv';
dotenv.config();

export default class Cognito {
    private config = {
        apiVersion: '2016-04-18',
        region: 'us-east-1',
      }
      private secretHash:string =process.env.COGNITO_SECRET_HASH;
      private clientId:string = process.env.COGNITO_CLIENT_ID;
      private cognitoIdentity;

      constructor() {
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
      }

      public async signUpUser(username: string, password: string, userAttr: Array<any>): Promise<any> {
        const params = {
          ClientId: this.clientId,
          Password: password,
          Username: username,
          SecretHash: this.hashSecret(username),
          UserAttributes: userAttr,
        };
      
        try {
          const data = await this.cognitoIdentity.signUp(params).promise();
          return data; // Return the data directly
        } catch (error) {
          console.error(error);
          throw error; // Throw the error so it can be caught by the caller
        }
      }
      
      public async forgotPassword(username): Promise<boolean> {
        var params = {
          ClientId: this.clientId, /* required */
          Username: username, /* required */
          SecretHash: this.hashSecret(username),
        }
    
        try {
          const data = await this.cognitoIdentity.forgotPassword(params).promise();
          console.log(data);
          return true
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      public async confirmSignUp(username: string, code: string): Promise<boolean> {
        var params = {
          ClientId: this.clientId,
          ConfirmationCode: code,
          Username: username,
          SecretHash: this.hashSecret(username),
        };
    
        try {
          const cognitoResp = await this.cognitoIdentity.confirmSignUp(params).promise();
          console.log(cognitoResp)
          return true
        } catch (error) {
          console.log("error", error)
          return false
        }
      }

      public async signInUser(username: string, password: string): Promise<any> {
        var params = {
          AuthFlow: 'USER_PASSWORD_AUTH', /* required */
          ClientId: this.clientId, /* required */
          AuthParameters: {
            'USERNAME': username,
            'PASSWORD': password,
            'SECRET_HASH': this.hashSecret(username)
          },
        }
    
        try {
          let data = await this.cognitoIdentity.initiateAuth(params).promise();
          return data;
        } catch (error) {
          return error;
        }
      }

      public async getUserAttributes(accessToken: string): Promise<any> {
        var params = {
            AccessToken: accessToken
        };

        try {
            let userData = await this.cognitoIdentity.getUser(params).promise();
            return userData.UserAttributes;
        } catch (error) {
            console.error("Error fetching user attributes:", error);
            throw error;
        }
    }
      
      public async confirmNewPassword(username: string, password: string, code: string): Promise<boolean> {
        var params = {
          ClientId: this.clientId, /* required */
          ConfirmationCode: code, /* required */
          Password: password, /* required */
          Username: username, /* required */
          SecretHash: this.hashSecret(username),
        };
    
        try {
          const data = await this. cognitoIdentity.confirmForgotPassword(params).promise();
          console.log(data);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      private hashSecret(username: string): string {
        return crypto.createHmac('SHA256', this.secretHash)
        .update(username + this.clientId)
        .digest('base64')  
      } 

}