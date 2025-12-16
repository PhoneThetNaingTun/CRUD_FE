"use client";
import { ProductForm } from "@/components/forms/product-form";
import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productSchema, ProductSchema } from "@/schema/productSchema";
import { useCreateProductMutation } from "@/store/Api/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewProductDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const productForm = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      price: undefined,
      description: "",
    },
  });

  const [Create, { isLoading }] = useCreateProductMutation();
  const handleSubmit = async (value: ProductSchema) => {
    try {
      const data = await Create(value).unwrap();
      showToast({
        title: "Success",
        description: data.message,
        type: "success",
      });
      setOpen(false);
      productForm.reset();
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
      <DialogTrigger asChild>
        <Button>
          <IconPlus /> New Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>{" "}
          <DialogDescription>Enter product details</DialogDescription>
        </DialogHeader>

        <ProductForm
          form={productForm}
          isLoading={isLoading}
          submitLabel="Create"
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
