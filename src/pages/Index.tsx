import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bookCover from "@/assets/book-cover.jpg";
import deluxeBooks from "@/assets/deluxe-books.jpg";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Music, Youtube, Mail, MapPin, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  const [openPayment, setOpenPayment] = useState<string | null>(null);
  const [openDonation, setOpenDonation] = useState<string | null>(null);
  const [copiesInput, setCopiesInput] = useState<string>("1");
  const [deluxeCopiesInput, setDeluxeCopiesInput] = useState<string>("1");
  
  const pricePerCopy = 2500; // KES
  const copies = Number.isNaN(parseInt(copiesInput, 10)) ? 0 : parseInt(copiesInput, 10);
  const totalPrice = copies * pricePerCopy;
  const deluxePricePerCopy = 5000; // KES
  const deluxeCopies = Number.isNaN(parseInt(deluxeCopiesInput, 10)) ? 0 : parseInt(deluxeCopiesInput, 10);
  const deluxeTotalPrice = deluxeCopies * deluxePricePerCopy;
  
  const handlePreOrder = () => {
    // Redirect to Google Form
    window.location.href = 'https://forms.gle/AoCbN9ix858342TK6';
  };

  const handleDeluxePreOrder = () => {
    // Redirect to Google Form for deluxe edition
    window.location.href = 'https://forms.gle/dQi4Biufx58AzVMh8';
  };

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

      {/* Pre-order Physical Copies Section */}
      <section id="pre-order" className="border-t border-border py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-playfair font-semibold mb-3 italic text-primary">Pre-Order a Physical Copy of "The Other Side of Hard" Now</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Secure your physical copy today and be among the first to receive it
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-6 md:p-8 shadow-sm">
              <div className="space-y-6">
                {/* Number of Copies Input */}
                <div className="space-y-2">
                  <Label htmlFor="copies" className="text-base">Number of Copies</Label>
                  <Input
                    id="copies"
                    type="number"
                    min="1"
                    max="5000"
                    step="1"
                    value={copiesInput}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "" || /^\d{0,4}$/.test(v)) {
                        setCopiesInput(v);
                      }
                    }}
                    onBlur={(e) => {
                      const n = parseInt(e.target.value, 10);
                      if (Number.isNaN(n) || n < 1) {
                        setCopiesInput("1");
                      } else if (n > 5000) {
                        setCopiesInput("5000");
                      } else {
                        setCopiesInput(String(n));
                      }
                    }}
                    className="text-lg h-12 transition-all duration-200"
                  />
                  <p className="text-xs text-muted-foreground">Maximum 5,000 copies per order</p>
                </div>

                {/* Live Price Display */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        KES {totalPrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {copies} {copies === 1 ? 'copy' : 'copies'} × KES {pricePerCopy.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pre-order Button */}
                <Button 
                  onClick={handlePreOrder}
                  className="w-full h-14 text-lg font-bold transition-all duration-200 hover:scale-[1.02] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Pre-order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deluxe Edition Section */}
      <section className="border-t border-border py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-playfair font-semibold mb-3 italic text-primary">Pre-Order the Deluxe Edition</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                This collector's edition features a pre-signed copy by the author, embossed hardcover binding, premium paper, larger trim size, and is individually numbered.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center order-2 md:order-1">
                <img 
                  src={deluxeBooks} 
                  alt="The Other Side of Hard - Deluxe Edition" 
                  className="rounded-lg shadow-lg w-full max-w-md"
                />
              </div>

              <div className="order-1 md:order-2">
                <div className="bg-background border border-border rounded-lg p-6 md:p-8 shadow-sm">
                  <div className="space-y-6">
                    {/* Number of Copies Input */}
                    <div className="space-y-2">
                      <Label htmlFor="deluxe-copies" className="text-base">Number of Copies</Label>
                      <Input
                        id="deluxe-copies"
                        type="number"
                        min="1"
                        max="5000"
                        step="1"
                        value={deluxeCopiesInput}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "" || /^\d{0,4}$/.test(v)) {
                            setDeluxeCopiesInput(v);
                          }
                        }}
                        onBlur={(e) => {
                          const n = parseInt(e.target.value, 10);
                          if (Number.isNaN(n) || n < 1) {
                            setDeluxeCopiesInput("1");
                          } else if (n > 5000) {
                            setDeluxeCopiesInput("5000");
                          } else {
                            setDeluxeCopiesInput(String(n));
                          }
                        }}
                        className="text-lg h-12 transition-all duration-200"
                      />
                      <p className="text-xs text-muted-foreground">Maximum 5,000 copies per order</p>
                    </div>

                    {/* Live Price Display */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">
                            KES {deluxeTotalPrice.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {deluxeCopies} {deluxeCopies === 1 ? 'copy' : 'copies'} × KES {deluxePricePerCopy.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pre-order Button */}
                    <Button 
                      onClick={handleDeluxePreOrder}
                      className="w-full h-14 text-lg font-bold transition-all duration-200 hover:scale-[1.02] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl"
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 h-6 w-6" />
                      Pre-order Deluxe Edition
                    </Button>
                  </div>
                </div>
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
            
            {/* Book Highly Recommended For Section */}
            <div className="mb-12 text-center">
              <h3 className="text-xl md:text-2xl font-light mb-4">Book Highly Recommended For</h3>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Self help guide, Motivational handbook, High school students, University Students, and Goal-oriented people
              </p>
            </div>

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
