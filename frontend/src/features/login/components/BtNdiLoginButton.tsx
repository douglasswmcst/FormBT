import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Box, Flex, Image, Link, Text, VStack } from '@chakra-ui/react'

// import { SGID_VALID_ORG_PAGE } from '~shared/constants'
// import { SingpassFullLogoSvgr } from '~assets/svgrs/singpass/SingpassFullLogoSvgr'
import { getBtNdiAuthUrl } from '~services/AuthService'
import Button from '~components/Button'

export const BtNdiLoginButton = (): JSX.Element => {
  const { formState } = useForm()

  const handleLoginMutation = useMutation(getBtNdiAuthUrl, {
    onSuccess: (data) => {
      // window.location.assign(data.redirectUrl)
    },
  })
  return (
    <VStack alignItems="start">
      <Button
        isFullWidth
        isLoading={formState.isSubmitting}
        type="submit"
        color="primary"
        onClick={() => handleLoginMutation.mutate()}
        variant="outline"
      >
        <Flex align="center" flexDirection="row">
          {/* <Box boxSize="sm" h="2rem" w="2rem">
            <Image
              src="https://play-lh.googleusercontent.com/n7ui0L3GjkaXSdJBgR17BVA2pHQEYZ88DOHf3l75Q3gOj_G7qzIJDbfPlb2wVMBCHcc"
              alt="NDI"
            />
          </Box> */}
          <Text color="primary.500"> Log in with Bhutan NDI </Text>
          {/* <SingpassFullLogoSvgr height="1.25rem" /> */}

          {/* <Text color="primary.500"> app</Text> */}
        </Flex>
      </Button>
      {/* <Text>
        For{' '}
        <Link isExternal href={SGID_VALID_ORG_PAGE}>
          select agencies
        </Link>
      </Text> */}
    </VStack>
  )
}
