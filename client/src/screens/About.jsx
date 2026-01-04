import React from 'react';
import { Github, MapPin, User, Code, Smartphone } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          About App
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Information about Travel Companion.
        </p>
      </div>

      {/* Developer Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                ÖÖ
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">ÖMER ÖZBAY</h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                <MapPin size={14} className="mr-1" />
                Ağrı / Doğubayazıt / Türkiye
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                Passionate developer creating modern, user-friendly mobile and web experiences.
                Travel Companion is built to demonstrate professional coding standards and API integration skills.
            </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Code size={18} className="text-blue-500"/> Tech Stack
          </h4>
          <div className="grid grid-cols-2 gap-3">
              {['React', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'Framer Motion'].map((tech) => (
                  <div key={tech} className="bg-gray-50 dark:bg-slate-900 p-2 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tech}
                  </div>
              ))}
          </div>
      </div>

      {/* APIs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
           <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Smartphone size={18} className="text-green-500"/> APIs Used
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>REST Countries (Country Data)</span>
              </li>
              <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Open-Meteo (Weather Forecast)</span>
              </li>
               <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Frankfurter (Currency Exchange)</span>
              </li>
          </ul>
           <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-400">
              Reference: public-apis/public-apis
          </div>
      </div>
    </div>
  );
};

export default About;
