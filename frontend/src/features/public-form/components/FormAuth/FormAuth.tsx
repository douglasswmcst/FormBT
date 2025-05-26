import { useCallback, useEffect, useMemo, useState } from 'react'
// import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
// import useWebSocket, { ReadyState } from 'react-use-websocket'
// import { BiLogInCircle } from 'react-icons/bi'
import { Box, Flex, Image, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { QRCodeSVG } from 'qrcode.react'
import { io } from 'socket.io-client'

import { FormAuthType } from '~shared/types/form'

// import { useIsMobile } from '~hooks/useIsMobile'
import { getBtNdiAuthUrl } from '~services/AuthService'
import Button from '~components/Button'

// import Button from '~components/Button'
// import { BtNdiLoginButton } from '~features/login/components/BtNdiLoginButton'
import { usePublicAuthMutations } from '~features/public-form/mutations'
import { usePublicFormContext } from '~features/public-form/PublicFormContext'

// const socket = io('localhost:5000')

// socket.on('connect', (arg) => {
//   console.log(arg)
// })

// import { AuthImageSvgr } from './AuthImageSvgr'

export interface FormAuthProps {
  authType: Exclude<FormAuthType, FormAuthType.NIL>
}

export const FormAuth = ({ authType }: FormAuthProps): JSX.Element => {
  const { formId, form } = usePublicFormContext()
  const [authUrl, setAuthUrl] = useState('')

  const buttonColorScheme = useMemo(() => {
    if (!form) return
    return `theme-${form.startPage.colorTheme}` as const
  }, [form])

  // const isMobile = useIsMobile()

  const displayedInfo = useMemo(() => {
    switch (authType) {
      case FormAuthType.BNDI:
        return {
          authType: 'Bhutan NDI app',
          helpText:
            'Sign in with the Bhutan NDI app to access this form.\nYour Bhutan VC will be included with your form submission.',
        }
      // case FormAuthType.SP:
      // case FormAuthType.MyInfo:
      //   return {
      //     authType: 'Singpass',
      //     helpText:
      //       'Sign in with Singpass to access this form.\nYour Singpass ID will be included with your form submission.',
      //   }
      // case FormAuthType.CP:
      //   return {
      //     authType: 'Singpass (Corporate)',
      //     helpText:
      //       'Corporate entity login is required for this form.\nYour Singpass ID and corporate Entity ID will be included with your form submission.',
      //   }
      // case FormAuthType.SGID:
      // case FormAuthType.SGID_MyInfo:
      //   return {
      //     authType: 'NNNNN app',
      //     helpText:
      //       'Sign in with the Singpass app to access this form.\nYour Singpass ID will be included with your form submission.',
      //   }
    }
  }, [authType])

  const { handleLoginMutation } = usePublicAuthMutations(formId)
  const { formState } = useForm()

  const handleLoginMutationPrime = useMutation(getBtNdiAuthUrl, {
    onSuccess: async (data) => {
      const response = await data.result
      console.log(response.data)
      console.log(response.data.data.proofRequestURL)
      setAuthUrl(response.data.data.proofRequestURL)

      // window.location.assign(data.redirectUrl)
    },
  })

  // const [socketUrl, setSocketUrl] = useState('wss://localhost:5000/ws')
  // const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([])

  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl)

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev) => prev.concat(lastMessage))
  //   }
  // }, [lastMessage])

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl('wss://demos.kaazing.com/echo'),
  //   [],
  // )

  // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), [])

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState]
  return (
    <Box
      bg="white"
      mt={{ base: '1.5rem', md: 0 }}
      mb="1.5rem"
      py="4rem"
      px={{ base: '1.5rem', md: '2.5rem' }}
    >
      {authUrl.length > 0 ? (
        <Stack spacing="1.5rem" align="center">
          ReactDOM.render(
          <QRCodeSVG value={authUrl as string} />,
          document.getElementById('mountNode') );
        </Stack>
      ) : (
        <Stack spacing="1.5rem" align="center">
          <Box boxSize="sm" h="10rem" w="10rem">
            <Image
              src="https://play-lh.googleusercontent.com/n7ui0L3GjkaXSdJBgR17BVA2pHQEYZ88DOHf3l75Q3gOj_G7qzIJDbfPlb2wVMBCHcc"
              alt="NDI"
            />
          </Box>
          <Button
            isLoading={formState.isSubmitting}
            type="submit"
            color="primary"
            onClick={() => handleLoginMutationPrime.mutate()}
            variant="outline"
          >
            <Flex align="center" flexDirection="row">
              <Text color="primary.500"> Log in with Bhutan NDI </Text>
            </Flex>
          </Button>
          {/* <Text color="primary.500"> {authUrl}</Text> */}
          <Text
            textStyle="body-2"
            color="secondary.500"
            textAlign="center"
            whiteSpace="pre-wrap"
          >
            {displayedInfo.helpText}
          </Text>
          {/* <span>The WebSocket is currently {connectionStatus}</span>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          <ul>
            {messageHistory.map((message, idx) => (
              <span key={idx}>{message ? message.data : null}</span>
            ))}
          </ul> */}
        </Stack>
      )}
    </Box>
  )
}
