import categories from "./Categories";

export const filterOptions = [
  {
    label: "Category",
    type: "checkbox",
    name: "category",
    options: categories.map(category => ({
      value: category.id,
      label: category.name
    })),
  },
  {
    label: "Price",
    type: "radio",
    name: "price",
    options: [
      { value: "₹1 - ₹1,000", label: "Under ₹1,000" },
      { value: "₹1,000 - ₹5,000", label: "₹1,000 - ₹5,000" },
      { value: "₹5,000 - ₹10,000", label: "₹5,000 - ₹10,000" },
      { value: "₹10,000 - ₹20,000", label: "₹10,000 - ₹20,000" },
      { value: "₹20,000 - ₹5,00,000", label: "Over ₹20,000" },
    ],
  },
  {
    label: "Brand",
    type: "checkbox",
    name: "brand",
    options: [
      { value: "Redmi", label: "Redmi" },
      { value: "OnePlus", label: "OnePlus" },
      { value: "realme", label: "realme" },
      { value: "Samsung", label: "Samsung" },
      { value: "Apple", label: "Apple" },
      { value: "Oppo", label: "Oppo" },
      { value: "Vivo", label: "Vivo" },
      { value: "Xiaomi", label: "Xiaomi" },
      { value: "Google", label: "Google" },
      { value: "Motorola", label: "Motorola" },
      { value: "Nokia", label: "Nokia" },
      { value: "Sony", label: "Sony" },
      { value: "LG", label: "LG" },
      { value: "Huawei", label: "Huawei" },
      { value: "Asus", label: "Asus" },
      { value: "Lenovo", label: "Lenovo" },
      { value: "HTC", label: "HTC" },
      { value: "Micromax", label: "Micromax" },
      { value: "Infinix", label: "Infinix" },
      { value: "Tecno", label: "Tecno" },
      { value: "Itel", label: "Itel" },
      { value: "ZTE", label: "ZTE" },
    ],
  },
  {
    label: "Avg. Customer Review",
    type: "radio",
    name: "rating",
    options: [
      { value: "4 & Up", label: "4 Stars & Up" },
      { value: "3 & Up", label: "3 Stars & Up" },
      { value: "2 & Up", label: "2 Stars & Up" },
      { value: "1 & Up", label: "1 Stars & Up" },
    ],
  },
];
