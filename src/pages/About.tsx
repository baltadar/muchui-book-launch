import { Facebook, Twitter, Instagram, Linkedin, Music, Youtube, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-12 text-center">About Dr. Manyara</h1>
          
          <div className="text-muted-foreground leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              Antony Manyara is a bold, visionary leader born and raised in Meru County, Kenya. His journey in leadership began early, growing from grassroots youth mobilizer to a respected voice in national and continental arenas. In 2018/2019, he made history as the inaugural Chairperson of the University of Nairobi Students Association (UNSA), formerly SONU.
            </p>
            
            <p>
              He currently serves as President of the Kenya University Students Organization (KUSO) since 2020, and of the East African Students Union (EASU), amplifying youth voices across the region. Globally, Manyara has represented Kenya with distinction—as a delegate to the Commonwealth Youth Council (2021/2022), Youth Ambassador for the Africa Progress Group (APG), Chairperson of the African Union Youth Association (AUYA) Security Council, and Board Director of the Commonwealth Students Association (CSA).
            </p>
            
            <p>
              Since 2024, he has served as Kenya's Ambassador for Sustainable Housing under the Ministry of Housing, promoting inclusive urban development. He also leads Youth Advocacy Africa (YAA)—an NGO advancing quality education, climate action, architectural sustainability, legal reform, and health equity.
            </p>
            
            <p>
              His impact on national policy is profound. Through strategic litigation, parliamentary petitions, bill sponsorships, mass lobbying, and public mobilization, Manyara has catalyzed legislative change that continues to shape a better Kenya. A former youth league chair in two major political parties, he is now poised—backed by allies and ideals—to launch a transformative political party rooted in egalitarianism, civic empowerment, and the true aspirations of the Kenyan people.
            </p>
            
            <p>
              A tireless champion of the mwananchi, Antony Manyara believes in people over power, action over rhetoric, and a future where every Kenyan voice is not just heard—but heeded.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-6 mb-8">
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
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-muted-foreground">
                <a href="mailto:antony@yaafrika.org" className="flex items-center gap-2 hover:text-foreground transition-colors justify-center">
                  <Mail className="h-4 w-4" />
                  <span>antony@yaafrika.org</span>
                </a>
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" />
                  <span>iHiT Center, Dennis Pritt Road, Kilimani, Nairobi</span>
                </div>
                <a href="https://antonymanyara.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors justify-center">
                  <span>Visit Main Website</span>
                </a>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              © 2025 Dr. Antony Muchui Manyara. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
