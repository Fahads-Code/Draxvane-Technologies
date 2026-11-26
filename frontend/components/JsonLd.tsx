export default function JsonLd({ data }: { data: object }) {
  /* Escaping "<" keeps the inline script safe even if schema text ever comes
     from a CMS instead of these static constants. */
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
