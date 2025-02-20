import { useEffect, useState } from "react";
import { Producto } from "../../models/Product";
import { getProducts } from "../../services/Product";
import ProductoCard from "../../components/productCard/productcard";
import { useTheme } from "../../components/context/themeContex";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Articulos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme(); // Modo oscuro/claro

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        if (data.length === 0) throw new Error("No hay productos disponibles");
        setProductos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`container py-4 ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      {/* Título y Botón de Cambio de Tema */}
      <div className="d-flex justify-content-between align-items-center mb-4">
      <Header />

      </div>

      {/* Mensajes de Carga y Error */}
      {loading && <p className="text-primary fs-5">Cargando productos...</p>}
      {error && <p className="text-danger fs-5">{error}</p>}

      {/* Lista de Productos */}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map((producto) => (
            <div key={producto._id} className="col">
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
      )}
    <Footer />
    </div>

  );
};

export default Articulos;
