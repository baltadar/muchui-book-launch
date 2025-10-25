import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import bookCover from "@/assets/book-cover.jpg";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Music, Youtube, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  const [openPayment, setOpenPayment] = useState<string | null>(null);
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
    { name: "Amazon", url: "https://www.amazon.com/dp/B0FXN19LCF", logo: "https://placeholder-logo-url.com/amazon.png" },
    { name: "Apple Books", url: "https://books.apple.com/us/book/the-other-side-how-to-build-resilience-and-own-your-story/id6754465844", logo: "https://placeholder-logo-url.com/apple.png" },
    { name: "Kobo", url: "https://www.kobo.com/ww/en/ebook/the-other-side-how-to-build-resilience-and-own-your-story?sId=7aaef219-4390-4c6f-8e23-5656312b2a22&ssId=aYeKdWh1bPEgsuscrnPy0", logo: "https://placeholder-logo-url.com/kobo.png" },
    { name: "Smashwords", url: "https://www.smashwords.com/books/view/1886769", logo: "https://placeholder-logo-url.com/smashwords.png" },
    { name: "Everand", url: "https://www.everand.com/book/937800048/The-Other-Side-How-to-Build-Resilience-and-Own-Your-Story", logo: "https://placeholder-logo-url.com/everand.png" },
    { name: "Thalia", url: "https://www.thalia.de/shop/home/artikeldetails/A1077221817", logo: "https://placeholder-logo-url.com/thalia.png" },
    { name: "Vivlio", url: "https://shop.vivlio.com/product/9798232305710_9798232305710_10020/the-other-side-how-to-build-resilience-and-own-your-story", logo: "https://placeholder-logo-url.com/vivlio.png" },
    { name: "Fable", url: "https://fable.co/book/x-9798232305710", logo: "https://placeholder-logo-url.com/fable.png" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
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

      {/* Book Launch Event Section */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 text-center">Book Launch Event</h2>
            <p className="text-center text-muted-foreground mb-8 text-base md:text-lg">Join us for the launch celebration on December 5th 2025</p>
            
            <div className="mb-8 text-center">
              <div className="inline-block">
                <div className="text-4xl md:text-5xl font-light mb-2">$300</div>
                <div className="text-sm text-muted-foreground">per ticket</div>
                <div className="mt-3 text-sm text-muted-foreground">Venue: To Be Announced</div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-light mb-4 text-center">How to Purchase</h3>
              <p className="text-center text-muted-foreground mb-6 text-sm md:text-base max-w-2xl mx-auto">
                Send payment via your preferred method below, then email proof of payment to <a href="mailto:antony@yaafrika.org" className="underline">antony@yaafrika.org</a> to secure your ticket.
              </p>
              
              <div className="space-y-3 max-w-2xl mx-auto">
                {paymentMethods.map((method, index) => (
                  <Collapsible
                    key={index}
                    open={openPayment === method.title}
                    onOpenChange={(open) => setOpenPayment(open ? method.title : null)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between text-left font-normal hover:bg-accent"
                      >
                        <span>{method.title}</span>
                        <span className="text-muted-foreground text-sm">
                          {openPayment === method.title ? '−' : '+'}
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
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Book Section */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-3 text-center">Purchase the Book Online</h2>
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
