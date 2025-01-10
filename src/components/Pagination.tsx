const Pagination = () => {
    return (
      <div className="p-4 flex items-center justify-between ">
        <button
          disabled
          className="py-2 px-4 rounded-md text-white bg-meta-3 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div className="flex items-center gap-2 text-sm text-black dark:text-white">
          <button className="px-2 rounded-sm bg-meta-3 text-white">1</button>
          <button className="px-2 rounded-sm ">2</button>
          <button className="px-2 rounded-sm ">3</button>
          ...
          <button className="px-2 rounded-sm ">10</button>
        </div>
        <button className="py-2 px-4 rounded-md bg-meta-3 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  