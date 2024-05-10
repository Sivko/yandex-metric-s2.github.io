import MappingWrapper from "./Components/MappingWrapper";
import Header from "./Components/Header";
import Save from "./Components/Save";
import Modals from "./Components/Modals";
import Token from "./Components/Token";

function App() {
  return (
    <div className="max-w-[550px] mx-auto text-[#484848]">
      <Modals />
      <Header />
      <Token />
      <MappingWrapper />
      <Save />
    </div>
  );
}

export default App;
