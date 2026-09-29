import '../common/navbar.scss';
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar__container">

                <a href="/" className="navbar__logo">
                    shorty<span>.</span>
                </a>

                <nav className="navbar__links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a
                     href="https://github.com/ritikasharma2006"
                     target="_blank"
                    rel="noreferrer">
                                  
                         GitHub
                    </a>
                </nav>

                
                       <ThemeToggle />
            

            </div>
        </header>
    );
};

export default Navbar;