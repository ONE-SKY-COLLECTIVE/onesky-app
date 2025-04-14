import UserIcon from '../../assets/icons/User.svg';
import LetterIcon from '../../assets/icons/Letter.svg';
import KeyIcon from '../../assets/icons/key.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import GoogleIcon from '../../assets/icons/google.png'; // png is already supported by Expo
import LoginHero from '../../assets/icons/login-hero.svg';
import RegisterHero from '../../assets/icons/register-hero.svg';
import ForgotHero from '../../assets/icons/forgot-hero.svg';
import successAnimation from "../../assets/animations/SuccessAnimation.json"
import EmailIcon from '../../assets/icons/email-icon.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ResetHero from '../../assets/icons/reset-hero.svg';

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
  reset:ResetHero
};
export default icons;
