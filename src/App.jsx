import './App.css';
import APP_DATA from './data';
import TimeButtons from './components/TimeButtons';
import FloorsPanel from './components/FloorsPanel';
import Compass from './components/Compass';
import SceneList from './components/SceneList';
import TitleBar from './components/TitleBar';
import { useMarzipanoViewer } from "./hooks/useMarzipanoViewer";
import { useAutorotate } from "./hooks/useAutorotate";
import { useFullscreen } from "./hooks/useFullscreen";
import { useFloorAndTimeControls } from "./hooks/useFloorAndTimeControls";
import Navbar from './components/Navbar';

function App() {
   const { viewer, scenes, currentView, switchScene } = useMarzipanoViewer();
   const { currentFloor, currentTime, changeFloor, changeTime } =
    useFloorAndTimeControls(scenes, switchScene);
  useAutorotate(viewer, APP_DATA.settings);
  useFullscreen(APP_DATA.settings.fullscreenButton);
  return (
    <>
      <div id="pano" style={{ width: "100%", height: "100vh" }}></div>
      <SceneList 
      scenes={scenes} 
      currentSceneId={currentView?.scene?.data?.id} 
      onSelect={switchScene}/>
      <FloorsPanel current={currentFloor} onSelect={changeFloor} />
      
      
   
      <TitleBar/>
      <TimeButtons current={currentTime} onSelect={changeTime} />
     {currentView ? <Compass view={currentView} /> : null}
 </>
  );
}

export default App;
