import MappingWrapper from "./Components/MappingWrapper";
import Header from "./Components/Header";

function App() {
  return (
    <div className="max-w-[550px] mx-auto">
      <Header />
      <MappingWrapper />

      <button className="bg-yellow-200 text-center rounded py-2 px-2 w-full mt-4">Сохранить</button>
    </div>
  );
}

export default App;
