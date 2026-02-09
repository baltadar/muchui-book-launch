import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import bookCover from "@/assets/book-cover.jpg";
import deluxeBooks from "@/assets/deluxe-books.jpg";
import bestsellerBadge from "@/assets/nairobi-bestseller-badge.png";
import nuriaLogo from "@/assets/nuria-logo.jpeg";
import textbookCenterLogo from "@/assets/textbook-center-logo.jpg";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Music, Youtube, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  const [openDonation, setOpenDonation] = useState<string | null>(null);

  const paymentMethods = [
    {
      title: "Bank Transfer",
      details: [
        { label: "Bank", value: "FAMILY BANK" },
        { label: "Name", value: "Manyara Muchui Antony" },
        { label: "A/C", value: "035000063447" },
        { label: "Branch", value: "FAMILY BANK TOWERS RETAIL" },
        { label: "Branch Code", value: "035" },
        { label: "Swift", value: "FABLKENA" },
      ]
    },
    {
      title: "PayPal",
      details: [
        { label: "Email", value: "archmanyara@gmail.com" },
      ]
    },
    {
      title: "Bitcoin",
      details: [
        { label: "Address", value: "1DPhnTSb1D8meHJGZU8y19vwzVdGip5orw" },
      ]
    },
    {
      title: "Mpesa Paybill",
      details: [
        { label: "Paybill", value: "222111" },
        { label: "Account", value: "035000063447" },
      ]
    }
  ];

  const retailers = [
    { name: "Amazon", url: "https://www.amazon.com/dp/B0FXN19LCF", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761400529/Amazon_logo_q805lo.svg" },
    { name: "Apple Books", url: "https://books.apple.com/us/book/the-other-side-how-to-build-resilience-and-own-your-story/id6754465844", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761402080/apple-books-logo_rui2sl.webp" },
    { name: "Kobo", url: "https://www.kobo.com/ww/en/ebook/the-other-side-how-to-build-resilience-and-own-your-story?sId=7aaef219-4390-4c6f-8e23-5656312b2a22&ssId=aYeKdWh1bPEgsuscrnPy0", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761404362/Rakuten_kobo_pfi5jk.png" },
    { name: "Smashwords", url: "https://www.smashwords.com/books/view/1886769", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761404429/smashwords_logo_inwzyo.png" },
    { name: "Everand", url: "https://www.everand.com/book/937800048/The-Other-Side-How-to-Build-Resilience-and-Own-Your-Story", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761404513/everand_logo_l3zgjk.jpg" },
    { name: "Thalia", url: "https://www.thalia.de/shop/home/artikeldetails/A1077221817", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761404551/Thalia_logo_rqnlct.svg" },
    { name: "Vivlio", url: "https://shop.vivlio.com/product/9798232305710_9798232305710_10020/the-other-side-how-to-build-resilience-and-own-your-story", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761404820/vivlio_logo_svz1gn.webp" },
    { name: "Fable", url: "https://fable.co/book/x-9798232305710", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761404712/fable_logo_uvv6t2.jpg" },
    { name: "Goodreads", url: "https://www.goodreads.com/book/show/243155695-the-other-side-of-hard?from_search=true&from_srp=true&qid=5HjfY2aJbm&rank=4", logo: "https://res.cloudinary.com/dbgcwdes6/image/upload/v1761459543/goodreads_logo_oua4a8.png" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Bestseller Badge */}
      <div className="container mx-auto px-4 pt-6 flex justify-start">
        <img 
          src={bestsellerBadge} 
          alt="Nairobi Bestseller Badge" 
          className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
        />
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6 text-foreground tracking-tight">
              The Other Side<br />of Hard
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light mb-4 md:mb-6 leading-relaxed">
              How to Build Resilience and Own Your Story
            </p>
            <p className="text-sm md:text-base text-muted-foreground">Dr. Antony Muchui Manyara, HSC.</p>
          </div>
          <div className="flex justify-center">
            <img 
              src={bookCover} 
              alt="The Other Side of Hard - Book Cover" 
              className="rounded-sm shadow-lg max-w-[280px] md:max-w-xs w-full"
            />
          </div>
        </div>
      </section>




      {/* Physical Copies Section */}
      <section className="border-t border-border py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img 
                  src={deluxeBooks} 
                  alt="The Other Side of Hard - Physical Editions" 
                  className="rounded-lg shadow-lg w-full max-w-md"
                />
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-playfair font-semibold mb-3 italic text-primary">Get Your Physical Copy</h2>
                <p className="text-muted-foreground text-sm md:text-base mb-6">
                  Paperback and Deluxe editions are available at our partner bookstores:
                </p>
                <div className="flex justify-center md:justify-start items-center gap-8 mb-6">
                  <a 
                    href="https://nuriakenya.com/product/the-other-side-of-hard/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 transition-transform hover:scale-105"
                  >
                    <img src={nuriaLogo} alt="Nuria Kenya" className="h-14 md:h-16 w-auto object-contain" />
                    <Button size="sm" className="text-xs">Order Now</Button>
                  </a>
                  <a 
                    href="https://textbookcentre.com/shop/the-other-side-of-hard/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 transition-transform hover:scale-105"
                  >
                    <img src={textbookCenterLogo} alt="Text Book Centre" className="h-14 md:h-16 w-auto object-contain" />
                    <Button size="sm" className="text-xs">Order Now</Button>
                  </a>
                </div>
                <p className="text-base text-muted-foreground">
                  For enquiries, email us at{' '}
                  <a href="mailto:info@yaafrika.org" className="underline font-bold hover:text-foreground transition-colors">info@yaafrika.org</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Book Section */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 text-center">Purchase Soft Copy Worldwide</h2>
            <p className="text-center text-muted-foreground mb-8 text-base md:text-lg">
              Digital version available now on your favorite platforms
            </p>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {retailers.map((retailer, index) => (
                <a
                  key={index}
                  href={retailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    className="rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2"
                  >
                    <img 
                      src={retailer.logo} 
                      alt={`${retailer.name} logo`}
                      className="h-4 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span>{retailer.name}</span>
                  </Button>
                </a>
              ))}
            </div>
            
            <p className="text-center text-xs text-muted-foreground mt-6">
              If you enjoyed the book, please leave a review. Thank you!
            </p>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 text-center">Donate to the Cause</h2>
            <p className="text-center text-muted-foreground mb-8 text-base md:text-lg max-w-2xl mx-auto">
              Your generous support helps us reach more people with this message of resilience and hope
            </p>

            <div className="space-y-3 max-w-2xl mx-auto">
              {paymentMethods.map((method, index) => (
                <Collapsible
                  key={index}
                  open={openDonation === method.title}
                  onOpenChange={(open) => setOpenDonation(open ? method.title : null)}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between text-left font-normal hover:bg-accent"
                    >
                      <span>{method.title}</span>
                      <span className="text-muted-foreground text-sm">
                        {openDonation === method.title ? '−' : '+'}
                      </span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4 border border-border rounded-md bg-muted/30">
                    <dl className="space-y-2">
                      {method.details.map((detail, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <dt className="text-sm text-muted-foreground">{detail.label}:</dt>
                          <dd className="text-sm font-mono">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* Book Highly Recommended For Section */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                This book is an essential read for anyone seeking personal growth and motivation. It serves as a practical self-help guide and motivational handbook, ideal for high school students, university students, and goal-oriented individuals who are determined to achieve success and maximize their potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-10 mt-12 md:mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8">
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

export default Index;
