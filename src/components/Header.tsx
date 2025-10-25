import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Music, Youtube, Mail, MapPin } from "lucide-react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </button>
          </nav>
          
          <div className="flex items-center gap-2">
            <a href="https://web.facebook.com/hon.antonymanyara/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://x.com/antonymanyara?lang=en" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://www.instagram.com/hon.antonymanyara/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/arch-antony-manyara-b8863195/?originalSubdomain=ke" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://www.tiktok.com/@hon.antonymanyara" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Music className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://www.youtube.com/watch?v=k4gVjVpBWcE&ab_channel=MutembeiTV" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
