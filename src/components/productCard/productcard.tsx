import { Producto } from "../../models/Product";
import { useTheme } from "../context/themeContex";

interface ProductoCardProps {
  producto: Producto;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto }) => {
  const { theme } = useTheme(); // Modo oscuro/claro
  const tieneDescuento = producto.discountPrice && producto.discountPrice !== producto.price;

  return (
    <div className={`producto-card ${theme}`}  style={{ marginTop: "2em" }}>
    
      <h2>{producto.name}</h2>
      <p>{producto.description}</p>

      {tieneDescuento ? (
        <>
          <p className="text-success fw-bold fs-3">${producto.discountPrice}</p>
          <p className="text-danger text-decoration-line-through fw-bold fs-4">${producto.price}</p>
        </>
      ) : (
        <p className="fs-4">${producto.price}</p>
      )}

      <p className="text-success">Disponible</p>
    </div>
  );
};

export default ProductoCard;
