import { gql } from '../../generated/graphql';

export const SEND_FORGOT_PASSWORD_VERIFICATION_CODE = gql(`
	mutation SendForgotPasswordVerificationEmail($email: String!, $reCaptchaToken: String!) {
		sendForgotPasswordVerificationEmail(input: { email: $email, reCaptchaToken: $reCaptchaToken }) {
			isSuccessful
			message
		}
	}
`);

export const RESEND_FORGOT_PASSWORD_VERIFICATION_CODE = gql(`
	mutation ResendForgotPasswordVerificationEmail {
		resendRegistrationVerificationEmail {
			isSuccessful
			message
		}
	}
`);
