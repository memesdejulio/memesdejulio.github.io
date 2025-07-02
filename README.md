# July Meme Calendar

A fun interactive calendar application for sharing and viewing memes throughout the month of July. Users can browse through days of the month, view memes for each day, and submit their own memes.

🚀 **Live Demo:** [https://memesdejulio.es](https://memesdejulio.es)

## Features

- Interactive calendar view with responsive design
- Desktop: Full month view
- Mobile: Weekly view with navigation
- Click on any day to view memes for that date
- View memes in full-screen modal with download functionality
- Submit new memes for any day via GitHub Pull Requests
- Modern, gradient-themed UI
- Automatic deployment to GitHub Pages with custom domain

## Quick Deployment

This project is configured for automatic GitHub Pages deployment with custom domain:

1. **Push to main branch** - GitHub Actions will automatically build and deploy
2. **Add memes** to `public/memes/{day}/` directories with manifest files
3. **Site updates automatically** at [https://memesdejulio.es](https://memesdejulio.es)

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contribuir Memes

¿Quieres agregar tu meme favorito al calendario? ¡Es fácil! Aceptamos contribuciones a través de Pull Requests.

### 📋 Requisitos

- Cuenta de GitHub
- Meme apropiado y divertido
- Formato de imagen: JPG, PNG, GIF, o WebP
- Tamaño recomendado: menos de 2MB

### 🔄 Proceso Paso a Paso

1. **Fork este repositorio**
   - Haz clic en el botón "Fork" en la parte superior derecha
   - Esto creará una copia en tu cuenta de GitHub

2. **Clona tu fork localmente**
   ```bash
   git clone https://github.com/TU_USUARIO/july-meme-calendar.git
   cd july-meme-calendar
   ```

3. **Agrega tu meme**
   - Ve al directorio del día correspondiente: `public/memes/{día}/`
   - Si no existe, créalo: `mkdir -p public/memes/{día}`
   - Copia tu imagen al directorio

4. **Actualiza el manifest.json**
   - Abre o crea `public/memes/{día}/manifest.json`
   - Agrega la información de tu meme:
   ```json
   {
     "memes": [
       {
         "filename": "tu-meme.jpg",
         "title": "Título Divertido del Meme",
         "submittedBy": "Tu Nombre"
       }
     ]
   }
   ```

5. **Haz commit y push**
   ```bash
   git add public/memes/{día}/
   git commit -m "Agregar meme para el día {día} de julio"
   git push origin main
   ```

6. **Crea un Pull Request**
   - Ve a tu fork en GitHub
   - Haz clic en "Pull request"
   - Describe tu contribución
   - ¡Envía el PR!

### 📝 Ejemplo Completo

Para agregar un meme el día 15 de julio:

```bash
# 1. Crear directorio si no existe
mkdir -p public/memes/15

# 2. Copiar tu imagen
cp mi-meme-genial.jpg public/memes/15/

# 3. Crear/editar manifest.json
cat > public/memes/15/manifest.json << EOF
{
  "memes": [
    {
      "filename": "mi-meme-genial.jpg",
      "title": "Cuando es viernes por fin",
      "submittedBy": "Tu Nombre"
    }
  ]
}
EOF

# 4. Commit y push
git add public/memes/15/
git commit -m "Agregar meme para el 15 de julio"
git push origin main
```

### ✅ Criterios de Aprobación

- **Contenido apropiado**: Sin ofensas, discriminación o contenido inapropiado
- **Calidad**: Imagen clara y legible
- **Relevancia**: Relacionado con la fecha o temporada
- **Formato correcto**: Manifest.json válido y estructura de archivos correcta

### 🚀 Proceso de Revisión

1. Tu PR será revisado por los mantenedores
2. Pueden solicitar cambios si es necesario
3. Una vez aprobado, se fusionará con la rama principal
4. Tu meme aparecerá automáticamente en [memesdejulio.es](https://memesdejulio.es)

### 💡 Tips

- **Optimiza tus imágenes** antes de subirlas para mejor rendimiento
- **Usa nombres descriptivos** para los archivos
- **Revisa otros ejemplos** en el directorio `public/memes/` para inspirarte
- **Sé creativo** con los títulos

¿Necesitas ayuda? Abre un [Issue](https://github.com/urielsalis/july-meme-calendar/issues) y te ayudaremos.

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open your browser to `http://localhost:8080`

## Adding Memes

Place memes in `public/memes/{day}/` directories with a manifest file:

```json
{
  "memes": [
    {
      "filename": "funny-meme.jpg",
      "title": "Hilarious Meme",
      "submittedBy": "Your Name"
    }
  ]
}
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- date-fns for date handling
- GitHub Pages with custom domain

## Usage

- Navigate through the calendar to explore different days
- Click on any day in July to see memes for that date
- Click on meme images to view them in full size
- Use the download button to save memes to your device
- Submit your own memes using the "Contribuir Meme" button which guides you to create GitHub Pull Requests

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Build and preview locally
- `npm run deploy` - Manual deploy to GitHub Pages
