import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20 max-w-md">
          <div className="text-8xl mb-6">😅</div>
          <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            ¡Oops! Esta página no existe
          </p>
          <p className="text-gray-500 mb-8">
            Parece que te has perdido en el calendario de memes
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
