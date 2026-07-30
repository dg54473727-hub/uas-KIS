// pages/Landing.jsx

import { Link } from "react-router-dom";

export default function Home() {
  const ciphers = [
    {
      id: "caesar",
      name: "Caesar Cipher",
      description: "Shift each letter by a fixed number",
      path: "/caesar",
      color: "blue"
    },
    {
      id: "atbash",
      name: "Atbash Cipher",
      description: "Reverse the alphabet: A↔Z, B↔Y",
      path: "/atbash",
      color: "purple"
    },
    {
      id: "columnar",
      name: "Columnar Transposition",
      description: "Rearrange text using a keyword",
      path: "/transposition",
      color: "green"
    },
    {
      id: "history",
      name: "History",
      description: "View and manage your records",
      path: "/history",
      color: "orange"
    }
  ];

  const getColor = (color) => {
    const colors = {
      blue: "border-blue-500/30 hover:border-blue-400 text-blue-400",
      purple: "border-purple-500/30 hover:border-purple-400 text-purple-400",
      green: "border-green-500/30 hover:border-green-400 text-green-400",
      orange: "border-orange-500/30 hover:border-orange-400 text-orange-400"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-200">
      

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ciphers.map((cipher) => (
            <Link
              key={cipher.id}
              to={cipher.path}
              className={`group block p-5 rounded-xl transition-all duration-300
                bg-gray-800/50 border ${getColor(cipher.color)}
                hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="flex items-center gap-3">

                <div>
                  <h3 className={`text-lg font-bold text-white group-hover:${getColor(cipher.color)} transition`}>
                    {cipher.name}
                  </h3>
                  <p className="text-gray-50 text-sm">{cipher.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}