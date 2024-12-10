import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Welcome to the Category Page</h1>
      <p>This is the category page of your application.</p>
      <p>The category id is {id}</p>
    </div>
  );
};

export default Category;