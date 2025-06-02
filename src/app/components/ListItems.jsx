"use client";
import Button from "./Button";
export default function ListItems({ items, title }) {

    const handleAddToCart = (item) => {
        if(item.stock <= 0) {
            alert(`El producto ${item.name} está agotado`);
            return;
        }
        alert(`Producto ${item.name} añadido al carro`);
    }

    return (
        <div>
            {items && items.length > 0 ? (
                <div>
                    <h2 className="">{title}</h2>
                    <div>
                        {items.map((item, index) => (
                            <div key={index} className="">
                                <h3 className="">{item.name}</h3>
                                <p className="">{item.description}</p>
                                <p className="">Precio: ${item.price}</p>
                                <Button onClick={()=> handleAddToCart(item)} className={""}>{item.stock > 0 ? ("Añadir al carro"):("Agotado")}</Button>
                            </div>
                        ))}
                    </div>
                </div>
            ): (
                <div>
                    <h2>No hay productos disponibles</h2>
                </div>
            )}
        </div>
    )
}