/* eslint-disable no-unused-vars */
const {
  HashRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} = ReactRouterDOM;

const API_BASE = window.API_BASE || "http://localhost:5000";

/**
 * Simple hook for data fetching with loading / error state.
 */
function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (isMounted) {
          setData(d);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (isMounted) {
          setError(e);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, loading };
}

/* ---------- Pages ---------- */

function HomePage() {
  const { data: recipes, error, loading } = useFetch(
    `${API_BASE}/api/recipes`
  );

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">Error fetching recipes</p>;

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((r) => (
          <Link
            key={r.id}
            to={`/recipe/${r.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img src={r.image} alt={r.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{r.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, error, loading } = useFetch(
    `${API_BASE}/api/recipes/${id}`
  );

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error || !recipe)
    return (
      <p className="text-red-500 p-6">
        Error fetching recipe.{" "}
        <button className="underline" onClick={() => navigate(-1)}>
          Go back
        </button>
      </p>
    );

  return (
    <main className="max-w-3xl mx-auto p-4">
      <button
        className="mb-4 text-blue-600 underline"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-h-96 object-cover rounded-lg mb-4"
      />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="*" element={<p className="p-6">Page not found</p>} />
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
