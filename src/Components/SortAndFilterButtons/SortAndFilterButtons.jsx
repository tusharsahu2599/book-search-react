export const SortAndFilterButtons = ({ handleSort }) => {
  return (
    <div className="sortButtons">

      <button className ="sortByTitleAsc" onClick={()=>{handleSort("title",1)}}>sortByTitleAsc</button>
      <button className ="sortByTitleDesc" onClick={()=>{handleSort("title",-1)}}> sortByTitleDesc</button>

      <button className ="sortByPriceAsc" onClick={()=>{handleSort("price",1)}}>sortByPriceAsc</button>
      <button className ="sortByPriceDesc" onClick={()=>{handleSort("price",-1)}}>sortByPriceDesc</button>
    </div>
  );
};

