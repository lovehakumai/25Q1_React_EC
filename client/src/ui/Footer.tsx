import { payment } from "../assets";
import Container from "./Container";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <div>
      <FooterTop />
      <Container className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
        <p>@2025 ECommerce Solutions. All rights reserved.</p>
        <img src={payment} alt="payment-img" className="object-cover"/>
      </Container>
    </div>
  );
};

export default Footer;