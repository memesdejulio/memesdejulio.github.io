
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-4">
        <div className="text-6xl mb-6">🎭</div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Bienvenido
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          ¡Explora los memes más divertidos de julio!
        </p>
        <Link to="/memes">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg px-8 py-3 shadow-lg">
            Ver Memes de Julio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
