import React from 'react';
import { Instagram, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">StarrySand Studio</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              感谢你看到这里。如果你对我的流沙麻将感兴趣，或者有想要定制的专属回忆，欢迎随时联系我。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-gray-400 text-sm mb-2">Designed for Creators</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary-500 fill-current animate-pulse" />
              <span>& lots of glitter</span>
            </div>
            <p className="text-xs text-gray-300 mt-4">© 2024 StarrySand Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;