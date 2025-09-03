import { useEffect, useState } from "react";
import APP_DATA from "../data";

export function useMarzipanoViewer() {
  const [viewer, setViewer] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [currentView, setCurrentView] = useState(null);

  useEffect(() => {
    const Marzipano = window.Marzipano;
    const data = APP_DATA;
    const panoElement = document.querySelector("#pano");

    if (!Marzipano || !panoElement) return;

    const viewerOpts = { controls: { mouseViewMode: data.settings.mouseViewMode } };
    const viewerInstance = new Marzipano.Viewer(panoElement, viewerOpts);

    const scenesList = data.scenes.map((sceneData) => {
      const source = Marzipano.ImageUrlSource.fromString(
        `tiles/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
        { cubeMapPreviewUrl: `tiles/${sceneData.id}/preview.jpg` }
      );
      const geometry = new Marzipano.CubeGeometry(sceneData.levels);
      const view = new Marzipano.RectilinearView(sceneData.initialViewParameters);
      const scene = viewerInstance.createScene({ source, geometry, view, pinFirstLevel: true });

      return { data: sceneData, scene, view };
    });

    setViewer(viewerInstance);
    setScenes(scenesList);

    return () => viewerInstance.destroy?.();
  }, []);

  const switchScene = (sceneObj) => {
    if (!sceneObj) return;
    sceneObj.scene.switchTo();
    sceneObj.view.setParameters(sceneObj.data.initialViewParameters);
    setCurrentView(sceneObj.view);
  };

  return { viewer, scenes, currentView, switchScene };
}

