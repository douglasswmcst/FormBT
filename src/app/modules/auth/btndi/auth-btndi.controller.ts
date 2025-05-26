import { StatusCodes } from 'http-status-codes'
import { ErrorDto, GetBtNdiAuthUrlResponseDto } from 'shared/types'

// import { SgidProfilesDto } from 'shared/types/auth'
import { createLoggerWithLabel } from '../../../config/logger'
import { createReqMeta } from '../../../utils/request'
// import { resolveRedirectionUrl } from '../../../utils/urls'
import { ControllerHandler } from '../../core/core.types'
import { SGID_CODE_VERIFIER_COOKIE_NAME } from '../../sgid/sgid.constants'

// import * as UserService from '../../user/user.service'
// import * as AuthService from '../auth.service'
// import { SessionUser } from '../auth.types'
// import { mapRouteError } from '../auth.utils'
import { AuthBtNdiService } from './auth-btndi.service'

const logger = createLoggerWithLabel(module)

export const generateAuthUrl: ControllerHandler<
  unknown,
  ErrorDto | GetBtNdiAuthUrlResponseDto
> = async (req, res) => {
  const logMeta = {
    action: 'generateBTNDIAuthUrl',
    ...createReqMeta(req),
  }

  return AuthBtNdiService.getBTNDIAuthUrl()
    .map(({ redirectUrl }) =>
      res
        .status(StatusCodes.OK)
        // .cookie(SGID_CODE_VERIFIER_COOKIE_NAME, codeVerifier)
        .send({ redirectUrl }),
    )
    .mapErr((error) => {
      logger.error({
        message: 'Failed to generate BTNDI auth url',
        meta: logMeta,
        error,
      })
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message:
            'Generating BTNDI authentication url failed. Please try again later.',
        })
        .clearCookie(SGID_CODE_VERIFIER_COOKIE_NAME)
    })
}
