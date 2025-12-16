import { NewProductDialog } from "./_components/NewProductDialog";
import { productColumns } from "./_components/ProductColumn";
import { ProductDataTable } from "./_components/ProductDataTable";

export default function Home() {
  return (
    <div className="p-5 md:p-30">
      <h1 className="text-3xl font-bold">Product CRUD</h1>
      <div className="flex justify-end">
        <NewProductDialog />
      </div>
      <ProductDataTable columns={productColumns} />
    </div>
  );
}
