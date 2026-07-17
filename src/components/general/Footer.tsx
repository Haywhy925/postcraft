import Logo from "../navbar/Logo";

function Footer() {
  return (
    <div className="mt-20 border-t border-border">
      <div className="max-w-6xl mx auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p>&copy; {new Date().getFullYear()} PostCraft</p>
      </div>
    </div>
  );
}

export default Footer;
