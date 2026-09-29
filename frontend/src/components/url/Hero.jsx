import '../url/hero.scss'

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__content">
                <p className="hero__eyebrow">URL SHORTENER</p>

                <h1>Shorten your links.</h1>

                <p className="hero__description">
                    Create clean, shareable links from long URLs in seconds.
                </p>
            </div>
        </section>
    );
};

export default Hero;