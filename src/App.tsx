// React import not needed with new JSX transform

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto">
        <header className="py-6">
          <h1 className="text-center text-3xl font-bold">Big Calendar</h1>
        </header>
        <main>
          {/* This component can be used as a fallback or wrapper if needed */}
          <div className="py-8 text-center">
            <p className="text-lg text-muted-foreground">
              Calendar application ready for migration
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App