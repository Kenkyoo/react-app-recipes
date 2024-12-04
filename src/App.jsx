import Search from "./components/search"

function App() {

    return (
      <div className="container mx-auto px-4">
        <div className="hero bg-base">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl text-primary font-bold">Recipe search</h1>
      <p className="py-6 text-secondary">
        Search and show recipes with instructions.
      </p>
    </div>
  </div>
</div>
            <Search />
      </div>
    )
  }
  
  export default App
  