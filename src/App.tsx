import MappingWrapper from "./Components/MappingWrapper";
import Header from "./Components/Header";
import Save from "./Components/Save";
import Modals from "./Components/Modals";

function App() {
  return (
    <div className="max-w-[550px] mx-auto text-[#484848]">
      <Modals />
      <Header />
      <MappingWrapper />
      <Save />
    </div>
  );
}

export default App;
