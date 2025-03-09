import DynamicImage from "@/components/DynamicImage";
export default function Card({
  id,
  image_src,
  title,
  vendor,
  tags,
  slug,
  published,
  url,
  option_value,
  sku,
  price,
  subscription_discount,
  subscription,
}) {
  return (
    <div key={id} className="p-4 border-gray-400 border-b-2">
      <DynamicImage src={image_src} alt={title} width={400} height={400} />
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Vendor:</strong> {vendor}
      </p>
      <p>
        <strong>Tags:</strong> {tags.join(", ")}
      </p>
      <p>
        <strong>Published:</strong> {published ? "Yes" : "No"}
      </p>
      <p>
        <strong>URL:</strong>{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
      <p>
        <strong>Option Value:</strong> {option_value}
      </p>
      <p>
        <strong>SKU:</strong> {sku}
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <p>
        <strong>Subscription Discount:</strong> {subscription_discount}%
      </p>
      <p>
        <strong>Subscription:</strong> {subscription ? "Yes" : "No"}
      </p>
    </div>
  );
}
