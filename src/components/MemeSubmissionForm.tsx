import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import { ArrowLeft, ExternalLink, GitPullRequest, Github } from "lucide-react";
import React from "react";

interface MemeSubmissionFormProps {
  date: Date;
  onBack: () => void;
}

const MemeSubmissionForm: React.FC<MemeSubmissionFormProps> = ({
  date,
  onBack,
}) => {
  const handleRedirectToGitHub = () => {
    window.open(
      "https://github.com/urielsalis/july-meme-calendar#contribuir-memes",
      "_blank"
    );
  };

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white text-purple-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
        <h1 className="text-2xl mb-4 md:text-4xl font-bold text-white text-center drop-shadow-lg">
          Contribuir Meme para el {format(date, "d 'de julio'")}
        </h1>
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🚀</div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Contribuye via GitHub!
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              Para mantener la calidad y organización de los memes, aceptamos
              contribuciones a través de Pull Requests en GitHub.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <GitPullRequest className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    ¿Cómo contribuir?
                  </h3>
                  <ol className="text-blue-700 space-y-2">
                    <li>1. Haz fork del repositorio</li>
                    <li>
                      2. Agrega tu meme en{" "}
                      <code className="bg-blue-100 px-1 rounded">
                        public/memes/{format(date, "d")}/
                      </code>
                    </li>
                    <li>
                      3. Actualiza el archivo{" "}
                      <code className="bg-blue-100 px-1 rounded">
                        manifest.json
                      </code>
                    </li>
                    <li>4. Crea un Pull Request</li>
                    <li>5. ¡Espera la revisión!</li>
                  </ol>
                </div>
              </div>
            </div>

            <Button
              onClick={handleRedirectToGitHub}
              className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-semibold text-lg py-4 px-8 shadow-lg mb-4"
            >
              <Github className="w-6 h-6 mr-3" />
              {isMobile ? (
                <>Instrucciones en GitHub</>
              ) : (
                <>
                  Ver Instrucciones Completas en GitHub
                  <ExternalLink className="w-5 h-5 ml-3" />
                </>
              )}
            </Button>

            <p className="text-sm text-gray-500">
              El enlace te llevará a la documentación completa en el repositorio
              de GitHub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeSubmissionForm;
