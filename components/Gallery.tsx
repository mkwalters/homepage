export function Gallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 39 }, (_, index) => (
        <div key={index}>
          <img
            className="w-full max-w-full rounded-lg object-cover object-center"
            src={`/photos/${index}.jpg`} // Ensure data[index] exists before accessing imageLink
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  );
}
