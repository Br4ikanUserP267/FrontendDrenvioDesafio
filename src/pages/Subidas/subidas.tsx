import { useEffect, useState } from "react";
import { Producto } from "../../models/Product";
import { SpecialPrice } from "../../models/SpecialPrice";
import { getProducts } from "../../services/Product";
import { addSpecialPrice } from "../../services/SpeciallPrice";
import { useTheme } from "../../components/context/themeContex";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SpecialPricesTable from "../../components/specialpricetable/SpecialPricesTable ";

const SpecialPriceForm = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState<SpecialPrice>({
    productId: "",
    specialPrice: 0,
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Modo oscuro/claro

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId || formData.specialPrice <= 0) {
      alert("⚠️ Selecciona un producto y un precio válido.");
      return;
    }
    const success = await addSpecialPrice(formData);
    if (success) {
      alert("✅ Precio especial agregado correctamente");
      setFormData({ productId: "", specialPrice: 0, description: "" });
    } else {
      alert("❌ Error al agregar precio especial");
    }
  };

  return (
    <div className={`container py-4 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Header />

        
        <SpecialPricesTable theme={theme}  />


      <Footer />
    </div>
  );
};

export default SpecialPriceForm;
