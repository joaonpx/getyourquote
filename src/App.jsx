import { useEffect, useState } from "react";

export function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.kanye.rest/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching data: " + error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen p-12 font-body bg-stone-950 text-stone-100 flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-r-2 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen p-12 font-body bg-stone-950 text-stone-100 flex items-center justify-center">
        <h1>Error</h1>
      </div>
    );
  }

  const quote = data.quote;

  return (
    <div className="h-screen p-12 font-body bg-stone-950 text-stone-100 flex items-center justify-center">
      <main className="w-full md:w-1/4 text-center space-y-4">
        <p className="text-pretty text-lg">
          <span className="text-2xl">&quot;</span>
          {quote}
          <span className="text-2xl">&quot;</span>
        </p>
        <h1>- ye</h1>
      </main>
    </div>
  );
}
