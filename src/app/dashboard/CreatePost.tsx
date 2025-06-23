import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreatePostModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreatePostModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };


  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles ="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-4/6 shadow-lg rounded-md bg-white">
        <Header name="Créer un Post" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <div className="flex flex-row justify-between">
          <label htmlFor="productName" className={`${labelCssStyles} flex-wrap`}>
            Post Name
          </label>
           <label htmlFor="productPrice" className={`${labelCssStyles}`}>
            Price        
          </label>
        </div>
          <div className="flex flex-row justify-between gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
          />
        </div>
          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
          />

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="image"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
          />

          <input 
          ref={fileInputRef}
          disabled={isUploading}
          type="file" 
          className="absolute right-[9999px]"
          onChange={(e) => {
            const file = e.target.files?.[0] as File;
            console.log(file)
            setIsUploading(true)
            const data = new FormData();
            data.set("file",file)
            
          }}   
          />

          <Image
          //selectedFile? selectedFile.name:
              src={`${`/kinshasa.png`}`}
              alt="maison"
              width={150}
              height={100}
              className="mb-3 rounded-2xl w-100 h-100 justify-center"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() =>{
              fileInputRef.current?.click()
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {isUploading ? "Chargement..." : "Parcourir"}
          </button>

          {/* CREATE ACTIONS */}
          <br/>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Créer
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePostModal;