const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="bg-transparent text-white text-3xl">
        🔍
      </button>
    </form>
  );
};
export default SearchInput;
