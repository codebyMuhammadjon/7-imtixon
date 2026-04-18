import { Link } from "react-router-dom";
import { Package, Clock, Truck, Shield } from "lucide-react";

/**
 * ABOUT PAGE COMPONENT - Brand Story & Company Information
 *
 * This page showcases the company's story, mission, and key features.
 * Layout (Desktop):
 *   - Breadcrumb navigation at top
 *   - Hero section with company story + image
 *   - Statistics section (Vendors, Customers, Products)
 *   - Feature cards showcasing key differentiators
 *
 * Layout (Mobile):
 *   - Stacked vertically: Story content, then image, then stats, then features
 *   - All typography and spacing scale down for readability
 *
 * Color scheme:
 *   - Primary orange: #E44B26 for headings and CTAs
 *   - Gray text for body content
 *   - White background for clean aesthetic
 */

export default function AboutPage() {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // FEATURE CARDS DATA
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Array of feature cards displayed at bottom of page.
   * Each feature highlights a key differentiator of Foodzy.
   * Icons are from lucide-react for consistency with rest of app.
   */
  const features = [
    {
      id: 1,
      icon: Package,
      title: "Product Packing",
      description: "Secure and eco-friendly packaging for all your orders.",
    },
    {
      id: 2,
      icon: Clock,
      title: "24x7 Support",
      description: "Round-the-clock customer service for your convenience.",
    },
    {
      id: 3,
      icon: Truck,
      title: "Delivery in 5 Days",
      description: "Fast and reliable delivery across all regions.",
    },
    {
      id: 4,
      icon: Shield,
      title: "Payment Secure",
      description: "Safe and encrypted payment processing for peace of mind.",
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════════════
  // STATISTICS DATA
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Company statistics displayed in the hero section.
   * These showcase scale and trust: number of vendors, customers, and products.
   * Formatted with 'k' suffix (thousands) for readability.
   */
  const stats = [
    { label: "Vendors", value: "0.1k" },
    { label: "Customers", value: "23k" },
    { label: "Products", value: "2k" },
  ];

  // ═══════════════════════════════════════════════════════════════════════════════════
  // RENDER - MAIN ABOUT PAGE
  // ═══════════════════════════════════════════════════════════════════════════════════

  return (
    <main className="bg-white">
      {/* ─── BREADCRUMB NAVIGATION ─── */}
      <div className="bg-[#E44B26] text-white px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">About Us</h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-white/80">About Us</span>
          </nav>
        </div>
      </div>

      {/* ─── HERO SECTION: Company Story + Image ─── */}
      <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Story Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Section heading - large and prominent */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About The Carrot
            </h2>

            {/* Company description - three paragraphs explaining mission and values */}
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Ratione, recusandae necessitatibus quasi incidunt alias adipisci
                pariatur eorum iure beatae assumenda rerum quod. Tempora magni
                autem a voluptatibus neque.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                vitae rerum cum accusamus magni consequuntur architecto. ipsum
                delenti expedita doloribus suscipit voluptatum ius perferendis
                amet.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, maxime amet architecto est exercitationem optio eo
                maiores corporis beatae, dolores doloribus libero nesciunt qui
                illum? Voluptates deserunt adipisci voluptatem magni sunt sed
                blandititis quod apertentu! Iusto?
              </p>
            </div>

            {/* ─── STATISTICS ROW ─── */}
            {/* Three key metrics displayed in large format to show company scale */}
            <div className="grid grid-cols-3 gap-6 pt-4 md:pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  {/* Large stat value in orange to draw attention */}
                  <div className="text-2xl md:text-3xl font-bold text-[#E44B26]">
                    {stat.value}
                  </div>
                  {/* Stat label in gray */}
                  <div className="text-xs md:text-sm text-gray-600 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature Image */}
          <div className="flex justify-center lg:justify-end">
            {/* Placeholder for vegetables/fresh produce image */}
            <div className="w-full max-w-sm bg-gradient-to-br from-green-50 to-orange-50 rounded-lg overflow-hidden shadow-lg">
              {/* In a real app, this would be an actual image */}
              <div className="aspect-square bg-gradient-to-b from-green-100 to-yellow-100 flex items-center justify-center">
                <p className="text-center text-gray-500 px-4">
                  Fresh vegetables & grocery image
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      {/* 
        Display key differentiators as feature cards.
        Each card has icon, title, and description.
        Desktop: 4 columns side-by-side
        Mobile: 2 columns, then stacks at very small screens
      */}
      <section className="bg-gray-50 px-4 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Grid layout: responsive columns based on screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              // Dynamically get the icon component from lucide-react
              const IconComponent = feature.icon;

              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-lg p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Feature icon - centered and colored */}
                  <div className="flex justify-center mb-4">
                    <IconComponent
                      size={40}
                      className="text-[#E44B26]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Feature title - bold and prominent */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>

                  {/* Feature description - smaller gray text */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      {/* 
        Call-to-action section encouraging users to explore products.
        Simple section with button linking to shop.
      */}
      <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to shop with us?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Explore our wide range of fresh and quality products delivered to your
          doorstep.
        </p>
        {/* Link button to shop page */}
        <Link
          to="/shop"
          className="inline-block bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Start Shopping
        </Link>
      </section>
    </main>
  );
}
