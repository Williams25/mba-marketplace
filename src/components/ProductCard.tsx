import {
  DefaultStatusColor,
  IProduct,
  IProductTranslate
} from "@/types/products";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent
} from "./ui/card";
import { currencyMask } from "@/utils/masks";

export const ProductCard = ({
  attachments,
  description,
  title,
  priceInCents,
  category,
  status
}: IProduct) => {
  return (
    <Card className="w-80">
      <CardHeader className="p-2 relative">
        <div className="absolute top-6 right-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${DefaultStatusColor[status] || "bg-gray-800 text-gray-200"}`}
          >
            {IProductTranslate[status]}
          </span>
          <span className="px-3 py-1 bg-gray-800 text-gray-200  rounded-full text-sm font-semibold">
            {category.title}
          </span>
        </div>
        <img
          src={attachments[0].url}
          alt={description}
          className="w-80 h-36 rounded-md object-cover"
        />

        <CardTitle className="flex justify-between items-end px-4 pt-3 font-semibold text-lg text-gray-800">
          {title}{" "}
          <span className="flex gap-3">
            <small>R$</small> {currencyMask(priceInCents / 100)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="font-medium text-gray-500 text-base leading-5">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
