import { Outlet, Link} from "react-router-dom";

export default function MainLayout() {
    return (
        <div>
            <header style={{ padding: "1rem", backgroundColor: "#ddd" }}>
        <nav>
          <Link to="/" style={{ marginRight: "1rem" }}>Hem</Link>
          <Link to="/animals">Djur</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem"}}>
        <Outlet /> {}
      </main>

       <footer style={{ padding: "1rem", backgroundColor: "#ddd", marginTop: "2rem" }}>
        &copy; 2025 Zoo App
      </footer>
    </div>

    )
}