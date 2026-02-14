import { useEffect, useState } from "react";
import { LuCloudUpload } from "react-icons/lu";

export default function ProductCreat(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileArray = Array.from(e.target.files);
    setFiles(fileArray);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Crear previews y limpiar memory leaks
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <div className="lg:col-span-9 col-span-1">
      <div className="card">
        <div className="card-body">
          <h6 className="mb-4 card-title">Create Product</h6>

          {/* --- Información básica --- */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
            <div>
              <label
                htmlFor="productNameInput"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Product Title
              </label>
              <input
                id="productNameInput"
                type="text"
                className="form-input"
                placeholder="Product Title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="productCodeInput"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Product Code
              </label>
              <input
                id="productCodeInput"
                type="text"
                className="form-input"
                value="TWT145015"
                disabled
              />
            </div>
          </div>

          {/* --- Upload --- */}
          <div className="grid grid-cols-1 mb-5">
            <h6 className="mb-2 font-semibold text-sm text-default-800">
              Product Images
            </h6>

            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center bg-transparent border border-dashed rounded-md cursor-pointer border-default-300 p-6 hover:bg-default-100 transition"
            >
              <LuCloudUpload className="size-12 text-default-500 mb-2" />
              <h5 className="mb-0 font-normal text-base text-default-500">
                Drag and drop your files or{" "}
                <span className="text-primary underline">browse</span>
              </h5>

              <input
                id="fileUpload"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            <ul className="flex flex-wrap gap-5 mt-5">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="border rounded border-default-200 p-3 w-32 text-center"
                >
                  <div className="p-2 mx-auto rounded-md size-20 bg-default-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={previewUrls[index]}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="pt-2">
                    <h5 className="text-xs truncate">{file.name}</h5>
                    <p className="text-xs text-default-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="mt-2 px-2 py-1 text-xs text-white bg-danger rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Description --- */}
          <div className="grid grid-cols-1 gap-2 mb-5">
            <h6 className="font-semibold text-default-800 text-sm">
              Description
            </h6>
            <textarea
              className="form-input"
              placeholder="Enter Description"
              rows={5}
            />
          </div>

          {/* --- Footer Buttons --- */}
          <div className="mt-4 flex gap-2 md:justify-end">
            <button
              type="button"
              className="bg-transparent text-danger btn border-0 hover:bg-danger/15"
            >
              Reset
            </button>

            <button type="submit" className="text-white btn bg-primary">
              Create Product
            </button>

            <button
              type="button"
              className="bg-teal-600 text-white btn hover:bg-teal-700"
            >
              Draft & Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
