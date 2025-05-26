import axios from 'axios'

import {
  GetBtNdiAuthUrlResponseDto,
  GetSgidAuthUrlResponseDto,
  SendOtpResponseDto,
  UserDto,
} from '~shared/types/user'

import { LOCAL_STORAGE_EVENT, LOGGED_IN_KEY } from '~constants/localStorage'

import { ApiService } from './ApiService'

const AUTH_ENDPOINT = '/auth'

/**
 * Sends login OTP to given email
 * @param email email to send login OTP to
 * @returns success string if login OTP is sent successfully
 */
export const sendLoginOtp = async (
  email: string,
): Promise<SendOtpResponseDto> => {
  return ApiService.post<SendOtpResponseDto>(`${AUTH_ENDPOINT}/otp/generate`, {
    email: email.toLowerCase(),
  }).then(({ data }) => data)
}

/**
 * Verifies the login OTP and returns the user if OTP is valid.
 * @param params.email the email to verify
 * @param params.otp the OTP sent to the given email to verify
 * @returns logged in user when successful
 * @throws Error on non 2xx response
 */
export const verifyLoginOtp = async (params: {
  otp: string
  email: string
}): Promise<UserDto> => {
  return ApiService.post<UserDto>(`${AUTH_ENDPOINT}/otp/verify`, params).then(
    ({ data }) => data,
  )
}

/**
 * Gets the SGID authentication endpoint URL
 * @returns SGID login redirect url
 * @throws Error on non 2xx response
 */
export const getSgidAuthUrl = async (): Promise<GetSgidAuthUrlResponseDto> => {
  return ApiService.get<GetSgidAuthUrlResponseDto>(
    `${AUTH_ENDPOINT}/sgid/authurl`,
  ).then(({ data }) => data)
}

export const getBtNdiAuthUrl = async () => {
  const headers = {
    Authorization:
      'Bearer eyJraWQiOiJzd3hhdGVQK1lmR2liT2ZiTmNjWGpjYkptWnVqNGlrXC80SWh5TW9JdFhLTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzdHE3aG8yM2c1cmlzbmRkOTBhNzZqcmU1ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoibmRpLXNlcnZpY2VcL3JlYWQud3JpdGUiLCJhdXRoX3RpbWUiOjE3MTAwNzE1ODcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9wdFRmQ2VNYnkiLCJleHAiOjE3MTAxNTc5ODcsImlhdCI6MTcxMDA3MTU4NywidmVyc2lvbiI6MiwianRpIjoiNjA1ZmYwOTctYTliYi00NjBjLWFjNDItMTE1ZjVjMDcxYzhkIiwiY2xpZW50X2lkIjoiM3RxN2hvMjNnNXJpc25kZDkwYTc2anJlNWYifQ.inAvxGUObTdcgm-Z67IM7EhoR7oFfGPrRhPkB34DeydCF89s25VChu1E4ZfKCWIxOPlrTDlaGu61qBD7gC-QvYxztfruYod8cjzZ8MRmdvdOc8LzzvjTsE0ls8AnY7cU893fXmGgJ_1hZ9PobPtaHRJ_EphZuW0On5Yin3KGwDNJWz9I3wnjwQj3hTIb4LCKpQL9iA4ey2lMONOoUDGPpgyG9v96SPdiIqN5E7hK4z_Tv5D4pLNXd7SQMJzZ5pp8INV6tvkx_dW0CqAB3yGV6v7KfoPVnCAg_C-NPbm5r0rrWWW7ltoNXYLOIpO3ETbgtA45bj2ffRQlzafVfP1J1w',
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
    .post('https://stageclient.bhutanndi.com/verifier/proof-request', payload, {
      headers,
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      // console.log(response)
      return response
    })
  // return ApiService.get<GetBtNdiAuthUrlResponseDto>(
  //   `${AUTH_ENDPOINT}/btndi/authurl`,
  // ).then(({ data }) => data)

  return { result }
}

// export const transferFormOwner = async (
//   formId: string,
//   newOwnerEmail: string,
// ): Promise<GetBtNdiAuthUrlResponseDto> => {
//   return ApiService.post<GetBtNdiAuthUrlResponseDto>(
//     `https://stageclient.bhutanndi.com/verifier/proof-request`,
//     { email: newOwnerEmail },
//   ).then(({ data }) => data)
// }

export const logout = async (): Promise<void> => {
  // Remove logged in state from localStorage
  localStorage.removeItem(LOGGED_IN_KEY)
  // Event to let useLocalStorage know that key is being deleted.
  window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT))
  return ApiService.get(`${AUTH_ENDPOINT}/logout`)
}
