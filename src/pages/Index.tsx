import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import bookCover from "@/assets/book-cover.png";
import { BookOpen, Calendar, CreditCard, Heart, ExternalLink } from "lucide-react";

const Index = () => {
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
    { name: "Smashwords", url: "https://www.smashwords.com/books/view/1886769" },
    { name: "Everand", url: "https://www.everand.com/book/937800048/The-Other-Side-How-to-Build-Resilience-and-Own-Your-Story" },
    { name: "Thalia", url: "https://www.thalia.de/shop/home/artikeldetails/A1077221817" },
    { name: "Vivlio", url: "https://shop.vivlio.com/product/9798232305710_9798232305710_10020/the-other-side-how-to-build-resilience-and-own-your-story" },
    { name: "Apple Books", url: "https://books.apple.com/us/book/the-other-side-how-to-build-resilience-and-own-your-story/id6754465844" },
    { name: "Kobo", url: "https://www.kobo.com/ww/en/ebook/the-other-side-how-to-build-resilience-and-own-your-story?sId=7aaef219-4390-4c6f-8e23-5656312b2a22&ssId=aYeKdWh1bPEgsuscrnPy0" },
    { name: "Fable", url: "https://fable.co/book/x-9798232305710" },
    { name: "Amazon", url: "https://www.amazon.com/dp/B0FXN19LCF" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Exciting News!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Dr. Antony Manyara is set to release his inspiring new book, <span className="font-semibold italic text-foreground">The Other Side of Hard</span>, a personal transformation guide that helps readers build resilience, face life's challenges with clarity, and discover the strength within.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <img 
            src={bookCover} 
            alt="The Other Side of Hard - Book Cover" 
            className="rounded-lg shadow-2xl max-w-sm w-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        <p className="text-center text-muted-foreground italic">
          Click the cover to learn more about the book and join the launch.
        </p>
      </section>

      {/* Book Launch Event Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">Book Launch Event</h2>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Join Us for the Launch Celebration</CardTitle>
                <CardDescription className="text-lg">Be part of this inspiring journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">$300 USD</span>
                  <span className="text-muted-foreground">per ticket</span>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-1">Venue:</p>
                  <p className="text-muted-foreground">To Be Announced</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-center">How to Get Your Ticket</h3>
              </div>
              <p className="text-center text-muted-foreground mb-6">
                Choose your preferred payment method below and secure your spot at the launch event
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {paymentMethods.map((method, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        {method.details.map((detail, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <dt className="font-medium text-sm text-muted-foreground">{detail.label}:</dt>
                            <dd className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">{detail.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">Donate to the Cause</h2>
            </div>
            
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Your generous support helps us reach more people with this message of resilience and hope
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {paymentMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      {method.details.map((detail, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <dt className="font-medium text-sm text-muted-foreground">{detail.label}:</dt>
                          <dd className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Book Section */}
      <section className="bg-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">Purchase the Book Online</h2>
            </div>
            
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Available now on your favorite platforms
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {retailers.map((retailer, index) => (
                <a
                  key={index}
                  href={retailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                      <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                        <span className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                          {retailer.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-center text-sm group-hover:text-primary transition-colors">
                        {retailer.name}
                      </p>
                      <ExternalLink className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Dr. Antony Muchui Manyara. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
