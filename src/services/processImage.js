export const processImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    // Verificar que sea una imagen
    if (!file.type.startsWith('image/')) {
      reject(new Error('El archivo no es una imagen válida'))
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      const newWidth = img.width * ratio
      const newHeight = img.height * ratio

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Convertir a WebP blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Error al procesar la imagen'))
          }
        },
        'image/webp',
        quality
      )
    }

    img.onerror = () => {
      reject(new Error('Error al cargar la imagen'))
    }

    img.src = URL.createObjectURL(file)
  })
}
