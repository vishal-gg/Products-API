import Home from "./Home";
import { Toaster } from "sonner";
import { FaGithub } from "react-icons/fa6";

const App = () => {
  return (
    <div>
      <Home />
      <Toaster richColors position="top-center" />
      <a
        target="_blank"
        href="https://github.com/vishal-gg"
        className="fixed right-10 bottom-10 z-50 hover:scale-110 transition-transform cursor-pointer w-14 aspect-square grid place-content-center shadow-md rounded-full bg-zinc-900"
      >
        <FaGithub className="text-4xl" />
      </a>
    </div>
  )
}

export default App;
