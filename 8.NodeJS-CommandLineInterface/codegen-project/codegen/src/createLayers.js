import fsPromises from 'fs/promises';
import fs from 'fs';

export async function createLayersIfNotExists({
  mainPath,
  defaultMainFolder,
  layers = [],
} = {}) {
  const layersPath = `${mainPath}/${defaultMainFolder}`;
  const nonExistingLayers = layers.filter((layer) => {
    const layerPath = `${layersPath}/${layer}`;
    return !fs.existsSync(layerPath);
  })

  const createNonExistingLayersResult = await Promise.all(
    nonExistingLayers.map((layer) => {
      try {
        const layerPath = `${layersPath}/${layer}`;
        return fsPromises.mkdir(layerPath, { recursive: true });
      } catch (error) {
        console.warn(`Erro ao criar a camada ${layer}`, error) 
      }
    })
  )

   return createNonExistingLayersResult;
}
