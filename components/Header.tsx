
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { NAV_CONTENT } from '../content';
import { useOrder } from '../contexts/OrderContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Track open submenu in mobile view
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const { setConsultationMode, toggleModal } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSubmenu = (label: string) => {
    if (mobileSubmenuOpen === label) {
      setMobileSubmenuOpen(null);
    } else {
      setMobileSubmenuOpen(label);
    }
  };

  const handleAction = (e: React.MouseEvent, action?: string, href?: string) => {
    if (action === 'consult') {
      e.preventDefault();
      setConsultationMode(true);
      toggleModal(true);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-primary-600 cursor-pointer">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="text-2xl font-bold tracking-wide">StarrySand</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_CONTENT.map((item) => (
            item.isButton ? (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleAction(e, item.action, item.href)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-primary-300/50 transition-all transform hover:-translate-y-0.5 font-medium text-sm"
              >
                {item.label}
              </a>
            ) : (
              <div key={item.label} className="relative group">
                <a 
                  href={item.href}
                  className="text-gray-600 hover:text-primary-500 font-medium transition-colors relative flex items-center gap-1 py-2"
                >
                  {item.label}
                  {item.items && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
                </a>

                {/* Dropdown Menu */}
                {item.items && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                     <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[160px] overflow-hidden">
                       {item.items.map((subItem) => (
                         <a
                           key={subItem.label}
                           href={subItem.href}
                           className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors whitespace-nowrap"
                         >
                           {subItem.label}
                         </a>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            )
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-6 flex flex-col gap-2 animate-fade-in-down max-h-[80vh] overflow-y-auto">
          {NAV_CONTENT.map((item) => (
            <div key={item.label}>
              {item.isButton ? (
                <a 
                  href={item.href}
                  onClick={(e) => handleAction(e, item.action, item.href)}
                  className="block text-center mt-4 bg-primary-500 text-white py-3 rounded-xl font-bold shadow-md"
                >
                  {item.label}
                </a>
              ) : (
                <>
                  <div 
                    className="flex justify-between items-center py-3 border-b border-gray-50 text-gray-600"
                    onClick={() => item.items ? toggleMobileSubmenu(item.label) : setIsMobileMenuOpen(false)}
                  >
                    <a href={item.href} className="hover:text-primary-500 w-full">
                      {item.label}
                    </a>
                    {item.items && (
                      <button onClick={(e) => { e.preventDefault(); toggleMobileSubmenu(item.label); }}>
                         <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenuOpen === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {item.items && mobileSubmenuOpen === item.label && (
                    <div className="bg-gray-50 rounded-lg p-2 ml-4 mt-1 mb-2 space-y-1">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-500 hover:text-primary-600 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
