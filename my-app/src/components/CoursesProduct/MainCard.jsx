import StarRating from "../StarRating";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const MainCard = ({ courses }) => {
  const navigate = useNavigate();
  return (
    // <div className='bg-white drop-shadow-md lg:max-w-[300px] md:max-w-[280px] max-w-[270px] overflow-hidden rounded-2xl mr-2 my-4 box-content'>
    //     <img src={courses.image}
    //         className='h-40 w-full object-cover'
    //     />
    //     <div className='p-5 border border-b'>
    //         <h1 className='py-2 truncate'>{courses.course}</h1>
    //         <StarRating rating={courses.rating} />
    //     </div>
    //     <div className='flex items-center justify-between pr-6'>
    //         <h3 className='p-5 text-xl'>₹{courses.price}</h3>
    //         <button onClick={()=>{
    //             navigate(`/user/watch/${courses._id}`)
    //             console.log("iunini");
    //         }} className='w-[100px] text-[#F0FBF7] text-xl  h-[40px] bg-teal-500 rounded '>Buy</button>
    //     </div>
    //     <div className='absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
    //         {courses.category}
    //     </div>
    // </div>
    <Card
      className="w-80 my-4 bg-white text-black"
    >
      <div className="absolute top-0 bg-gray-300 z-10 m-6 px-2 py-[2.5px] rounded text-black font-bold">
        {courses.category}
      </div>

      <CardHeader shadow={false} floated={false} className="h-48">
        <img
          src={courses.image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="pb-2">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="black" className="font-medium truncate">
          {courses.course}
          </Typography>
        </div>
        {/* <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
            >
                {course.category}
            </Typography> */}
        <div className="flex items-center mt-2">
          <Rating value={courses.rating} readonly />
          {/* <p className="ml-2 text-white">({course.review}) </p> */}
        </div>
      </CardBody>
      <hr />
      <CardFooter className="pt-2">
        <Typography color="black" className="font-large font-bold p-1">
          Rs. {courses.price}
        </Typography>

        <Button
          onClick={() => {
            navigate(`/user/watch/${courses._id}`);
            console.log("iunini");
          }}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MainCard;
