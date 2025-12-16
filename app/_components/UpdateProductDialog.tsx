"use client";
import { ProductForm } from "@/components/forms/product-form";
import { showToast } from "@/components/toaster";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { productSchema, ProductSchema } from "@/schema/productSchema";
import { useUpdateProductMutation } from "@/store/Api/productApi";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  initialValue: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpdateProductDialog = ({ initialValue, open, setOpen }: Prop) => {
  const productForm = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValue,
  });

  const [Update, { isLoading }] = useUpdateProductMutation();
  const handleSubmit = async (value: ProductSchema) => {
    try {
      const data = await Update({ id: initialValue.id, ...value }).unwrap();
      showToast({
        title: "Success",
        description: data.message,
        type: "success",
      });
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: "Error",
          description: error?.data?.message,
          type: "error",
        });
        return;
      }
      showToast({
        title: "Error",
        description: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          form={productForm}
          isLoading={isLoading}
          submitLabel="Update"
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
