import successAnimation from "../../assets/animations/SuccessAnimation.json";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import EmailIcon from "../../assets/icons/email-icon.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";
import ForgotHero from "../../assets/icons/forgot-hero.png";
import GoogleIcon from "../../assets/icons/google.png"; // png is already supported by Expo
import KeyIcon from "../../assets/icons/key.png";
import LetterIcon from "../../assets/icons/Letter.png";
import LoginHero from "../../assets/icons/login-hero.svg";
import RegisterHero from "../../assets/icons/register-hero.svg";
import ResetHero from "../../assets/icons/reset-hero.svg";
import UserIcon from "../../assets/icons/User.png";
import AppleCompany from "../../assets/icons/apple-company.png";

const icons = {
  user: UserIcon,
  email: LetterIcon,
  password: KeyIcon,
  confirmPassword: KeyIcon,
  facebook: FacebookIcon,
  google: GoogleIcon,
  login: LoginHero,
  register: RegisterHero,
  forgot: ForgotHero,
  success: successAnimation,
  emailIcon: EmailIcon,
  back: ArrowLeft,
  reset: ResetHero,
  apple: AppleCompany
};
export default icons;
