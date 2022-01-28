import logo from "../assets/images/logo.svg";
import main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby bespoke paleo DIY vice freegan, swag kombucha cray street
            art chia. Freegan mustache pitchfork fixie, ramps kickstarter
            cold-pressed butcher. Waistcoat wolf occupy, distillery jianbing
            intelligentsia gentrify iceland scenester brooklyn selfies
            lumbersexual snackwave.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
