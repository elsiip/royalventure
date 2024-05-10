import Hero from "./hero";
import Packages from "./packages";
import Services from "./services";
import Portofolios from "./portofolios";
import Testimonials from "./testimonials";
import Reservation from "./reservation";
import Footer from "../../components/footer";

export default function Landing() {
    return (
        <div>
            <Hero />
            <Packages />
            <Services />
            <Portofolios />
            <Testimonials />
            <Reservation />
            <Footer />
        </div>
    )
}