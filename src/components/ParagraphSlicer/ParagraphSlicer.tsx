export default function ParagraphSlicer({
  paragraph,
  slice,
}: {
  paragraph: string;
  slice: number;
}) {
  const handleSlice = (paragraph: string, slice: number) => {
    if (paragraph && paragraph.length > slice) {
      return `${paragraph?.slice(0, slice)}...`;
    }
    return paragraph;
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {handleSlice(paragraph, slice)}
    </div>
  );
}
