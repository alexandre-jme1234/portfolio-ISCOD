/** Spinner de chargement — anneau vert accent sur fond noir. */
export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#171c21]">
      <div className="w-12 h-12 border-4 border-[#cdfb7c] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
