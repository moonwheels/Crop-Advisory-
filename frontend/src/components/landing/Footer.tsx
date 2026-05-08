import BrandMark from "@/components/BrandMark";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16 text-primary-foreground/70">
      <div className="container">
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          <div>
            <BrandMark className="mb-4" textClassName="text-lg text-primary-foreground" />
            <p className="text-sm leading-relaxed">
              AI-powered agriculture platform helping farmers grow smarter and harvest better.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-primary-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#features" className="transition-colors hover:text-primary-foreground">Features</a></li>
              <li><a href="/#contact" className="transition-colors hover:text-primary-foreground">Contact</a></li>
              <li><a href="#" className="transition-colors hover:text-primary-foreground">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-primary-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition-colors hover:text-primary-foreground">About</a></li>
              <li><a href="#" className="transition-colors hover:text-primary-foreground">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-primary-foreground">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-primary-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition-colors hover:text-primary-foreground">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-primary-foreground">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm">
          <p>© 2026 AgriFarms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
