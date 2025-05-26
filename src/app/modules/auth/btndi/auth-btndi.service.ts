import { generatePkcePair, SgidClient } from '@opengovsg/sgid-client'
import axios from 'axios'
import fs from 'fs'
import { err, ok, Result, ResultAsync } from 'neverthrow'
import { SgidPublicOfficerEmploymentList } from 'shared/types/auth'

import { ISgidVarsSchema } from 'src/types'

import { sgid } from '../../../config/features/sgid.config'
import { createLoggerWithLabel } from '../../../config/logger'
import {
  SgidCreateRedirectUrlError,
  SgidFetchAccessTokenError,
  SgidFetchUserInfoError,
} from '../../sgid/sgid.errors'

const logger = createLoggerWithLabel(module)
export const BTNDI_LOGIN_OAUTH_STATE = 'login'
const SGID_POCDEX_PUBLIC_OFFICER_EMPLOYMENTS_SCOPE =
  'pocdex.public_officer_details'

export class AuthBtNdiServiceClass {
  private client: SgidClient
  private privateKey: string

  constructor({
    privateKeyPath,
    hostname,
    adminLoginRedirectUri: redirectUri,
    clientId,
    clientSecret,
  }: ISgidVarsSchema) {
    this.privateKey = fs.readFileSync(privateKeyPath, { encoding: 'utf8' })
    this.client = new SgidClient({
      // If hostname is empty, use the default provided by sgid-client.
      hostname: hostname || undefined,
      clientId,
      clientSecret,
      redirectUri,
      privateKey: this.privateKey,
    })
  }

  getBTNDIAuthUrl() {
    const logMeta = {
      action: 'createBTNDIAuthUrl',
    }

    try {
      // const result = this.client.authorizationUrl({
      //   state: BTNDI_LOGIN_OAUTH_STATE,
      //   scope: ['openid', SGID_POCDEX_PUBLIC_OFFICER_EMPLOYMENTS_SCOPE].join(
      //     ' ',
      //   ),
      //   nonce: null,
      //   codeChallenge,
      // })
      const headers = {
        Authorization:
          'Bearer eyJraWQiOiJzd3hhdGVQK1lmR2liT2ZiTmNjWGpjYkptWnVqNGlrXC80SWh5TW9JdFhLTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzdHE3aG8yM2c1cmlzbmRkOTBhNzZqcmU1ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoibmRpLXNlcnZpY2VcL3JlYWQud3JpdGUiLCJhdXRoX3RpbWUiOjE3MDk5NzcxMjEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9wdFRmQ2VNYnkiLCJleHAiOjE3MTAwNjM1MjEsImlhdCI6MTcwOTk3NzEyMSwidmVyc2lvbiI6MiwianRpIjoiYjJmMGQ2ZmItYmE3Yy00ZmFkLWIxNzQtODcxNTJmZTJmOWY2IiwiY2xpZW50X2lkIjoiM3RxN2hvMjNnNXJpc25kZDkwYTc2anJlNWYifQ.URQZYlEoeksnU3PnG9RUbH3O_26Xpq5ShLgHTw-UWJU1z8umittNw-GZssXjCWxt1r2kVZcZqkpTEVV7vPbPcAP4lsqH_Kpa-yMAbRgdZUarweygrveTqP6Kcdeo-5IqGYxpvZv2kfnGiq82xagOO52_z7yPPxiefmMuq4Q4myEoXnhkyCubuagDX7dEyC3oolL8SXsJ55KKkgkJWY8FFg5wxa-XSdp5qEPgyNJUx_tvx2wMzQQY3Fiflxf8lz1QXsDZXSfiTJsGpFVZBzPMtuAKP5RH1WJd4wXZ-ZdnmIMr-SNd92GCWY4WCmaUK4-qtJPGsdSUIkkgfpw04G3LzQ',
      }
      const payload = {
        proofName: 'Foundational ID',
        proofAttributes: [
          {
            name: 'Full Name',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
          {
            name: 'Gender',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
          {
            name: 'Date of Birth',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
          {
            name: 'ID Type',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
          {
            name: 'ID Number',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
          {
            name: 'Household Number',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
          {
            name: 'Blood Type',
            restrictions: [
              {
                cred_def_id: 'Ka4s9yvjDetTTME9KWuXAj:3:CL:51994:revocable',
                schema_id: '7tmq7RgiwSwE8e8DEuLCaP:2:Foundational ID:0.0.5',
              },
            ],
          },
        ],
      }
      const result = axios
        .post('https://testapi.jasonwatmore.com/products', payload, { headers })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('response', response)
        })
      return { redirectUrl: result }
    } catch (error) {
      logger.error({
        message: 'Error while creating redirect URL',
        meta: logMeta,
        error,
      })
      return err(new SgidCreateRedirectUrlError())
    }
  }

  /**
   * Create a URL to sgID which is used to redirect the user for authentication
   * @returns The redirectUrl and the associated code verifier
   */
  createRedirectUrl(): Result<
    { redirectUrl: string; codeVerifier: string },
    SgidCreateRedirectUrlError
  > {
    const logMeta = {
      action: 'createRedirectUrl',
    }

    const { codeChallenge, codeVerifier } = generatePkcePair()

    try {
      const result = this.client.authorizationUrl({
        state: BTNDI_LOGIN_OAUTH_STATE,
        scope: ['openid', SGID_POCDEX_PUBLIC_OFFICER_EMPLOYMENTS_SCOPE].join(
          ' ',
        ),
        nonce: null,
        codeChallenge,
      })
      return ok({ redirectUrl: result.url, codeVerifier })
    } catch (error) {
      logger.error({
        message: 'Error while creating redirect URL',
        meta: logMeta,
        error,
      })
      return err(new SgidCreateRedirectUrlError())
    }
  }

  /**
   * Given the OIDC authorization code from sgID, obtain the corresponding
   * access token, which will be used later to retrieve user information
   * @param code - the authorization code
   */
  retrieveAccessToken(
    code: string,
    codeVerifier: string,
  ): ResultAsync<
    { sub: string; accessToken: string },
    SgidFetchAccessTokenError
  > {
    return ResultAsync.fromPromise(
      this.client.callback({ code, nonce: null, codeVerifier }),
      (error) => {
        logger.error({
          message: 'Failed to retrieve access token from sgID',
          meta: {
            action: 'retrieveAccessToken',
            code,
          },
          error,
        })
        return new SgidFetchAccessTokenError()
      },
    )
  }

  /**
   * Given the OIDC access token from sgID, obtain the user's information
   * (depending on OAuth scopes associated with the accessToken)
   * @param accessToken - the access token
   * @returns the authenticated OGP user's email
   */
  retrieveUserInfo(
    accessToken: string,
    sub: string,
  ): ResultAsync<SgidPublicOfficerEmploymentList, SgidFetchUserInfoError> {
    return ResultAsync.fromPromise(
      this.client.userinfo({ accessToken, sub }).then(({ data }) => {
        const employments: SgidPublicOfficerEmploymentList = JSON.parse(
          data[SGID_POCDEX_PUBLIC_OFFICER_EMPLOYMENTS_SCOPE],
        )
        return employments
      }),
      (error) => {
        logger.error({
          message: 'Failed to retrieve user info from sgID',
          meta: {
            action: 'retrieveUserInfo',
            accessToken,
          },
          error,
        })
        return new SgidFetchUserInfoError()
      },
    ).andThen((employments) => {
      // Ensure that all emails are in lowercase
      const cleanedProfile = employments.map((employment) => ({
        ...employment,
        work_email: employment.work_email.toLowerCase(),
      }))

      return ok(cleanedProfile)
    })
  }
}

export const AuthBtNdiService = new AuthBtNdiServiceClass(sgid)
