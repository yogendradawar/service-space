
function ShowCard({topic}) {
  return (
    <div className="p-4 flex gap-3 w-[10rem] h-[4rem] justify-center items-center border rounded-lg shadow-lg ">
      <img className="rounded-lg w-[30%]" src={topic.image} alt="image" />
      <h1>{topic.name}</h1>
    </div>
  );
}
export default ShowCard;