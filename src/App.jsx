import "./App.css";
import { TermsAndServicesSection } from "./components/TermsAndServicesSection.jsx";
import { AuthHeader } from "./components/AuthHeader.jsx";
import { Login } from './components/Login.jsx'

function App() {
  return (
    <div className="overflow-scroll font-sans flex justify-center items-center flex-col md:flex-row h-screen">
      <div className="overflow-hidden flex justify-center  w-full h-full md:w-[50vw] lg:w-[40vw] xl:w-[30vw] z-50 absolute md:static top-0 left-0 self-end flex-col divide-y gap-2 p-8 ">
        <AuthHeader />

        <div className=" w-full p-4 flex-1">

          <Login></Login>

        </div>

        <TermsAndServicesSection></TermsAndServicesSection>
      </div>
      <div className="bg-white blur-sm md:blur-none w-full h-full md:w-[70vw] absolute top-0 left-0  z-0 md:static flex justify-center items-center">
        section2
      </div>
    </div>
  );
}

export default App;
