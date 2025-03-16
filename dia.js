document.addEventListener("DOMContentLoaded", async function () {
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
    let versaoSuja = false;
    let estiloImagem = false;

    try {
        const font = new FontFace('Text', 'url(media/fonte.ttf)');
        await font.load();
        document.fonts.add(font);
    } catch (error) {
        console.error('Erro ao carregar fonte:', error);
    }

    const image = new Image();
    
    function loadImage() {
        image.src = estiloImagem ? "media/meme2.png" : "media/meme1.png";
    }
    
    loadImage();

    function getHour() {
        return new Date().getHours() + ":" + new Date().getMinutes();
    }

    function getResponsiveDimensions() {
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.7;
        const ratio = image.width / image.height;
        
        let width = image.width;
        let height = image.height;
        
        if (width > maxWidth) {
            width = maxWidth;
            height = width / ratio;
        }
        
        if (height > maxHeight) {
            height = maxHeight;
            width = height * ratio;
        }
        
        return { width, height };
    }

    function updateCanvas() {
        const dimensions = getResponsiveDimensions();
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const fontSize = Math.min(canvas.width * 0.067, 50);
        ctx.font = `${fontSize}px 'Text', Arial`;
        ctx.textAlign = "center";

        const topText = versaoSuja ? "Diazinho de merda, hein?" : "Que diazinho, hein?";
        const y = canvas.height * 0.18;
        drawText(ctx, topText, canvas.width / 2, y);
        
        const hour = getHour();
        const dateText = `Capitão, ainda são ${hour}!`;
        ctx.font = `${fontSize * 0.80}px 'Text', Arial`;
        drawText(ctx, dateText, canvas.width / 2.64, y + (canvas.height * 0.19));
    }

    window.addEventListener('resize', updateCanvas);
    image.onload = updateCanvas;

    image.onerror = function(error) {
        console.error('Erro ao carregar imagem:', error);
    };

    function drawText(context, text, x, y) {
        context.fillText(text, x, y);
    }

    document.getElementById("downloadBtn").addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "semaninha.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });

    document.getElementById("versaoSuja").addEventListener("click", function() {
        versaoSuja = !versaoSuja;
        updateCanvas();
    });

    document.getElementById("estiloImagem").addEventListener("click", function() {
        estiloImagem = !estiloImagem;
        loadImage();
    });
});