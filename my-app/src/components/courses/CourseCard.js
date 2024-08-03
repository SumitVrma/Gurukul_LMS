import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Rating
} from "@material-tailwind/react";
// import { useElementSize, useMouse } from "@mantine/hooks";
import yellowstar from '../../assets/yellow-star.svg';
import { useState } from "react";

export function CourseCard({ course }) {
    // const { ref: circleEL, x, y } = useMouse();
    // const { ref: cardEl, width, height } = useElementSize();


    // const [position, setPosition] = useState({ left: -1000, top: -1000 });
    // const [opacity, setOpacity] = useState(0);



    // function handleMouseMove() {
    //     setOpacity(1);
    //     setPosition({
    //         left: x - width / 2,
    //         top: y - height / 2,
    //     });
    // }
    // function handleMouseLeave(){
    //     setOpacity(0)
    // }

    return (
        <Card 
            className="w-80 my-4 bg-[#080310]"
            // ref={cardEl}
            // onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
        >


            <div className="absolute top-0 bg-gray-300 z-10 m-6 px-2 py-[2.5px] rounded text-black font-bold">
                {course.category}
            </div>
            {/* <div ref={circleEL}
                    style={{
                        top: position.top,
                        left: position.left,
                        opacity
                    }}
                    className='bg-purple-700 absolute scale-[1.5] blur-3xl w-40 h-40 rounded-full z-10 transition-opacity duration-300 hidden md:block  '>

                </div> */}

            <CardHeader 
             shadow={false} floated={false} className="h-48">


                <img
                    src={course.linkImg}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
                
            </CardHeader>
            <CardBody className="pb-2">

                <div className="mb-2 flex items-center justify-between">
                    <Typography color="white" className="font-medium truncate">
                        {course.title}
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
                    <Rating value={5} readonly />
                    <p className="ml-2 text-white">({course.review}) </p>
                </div>
            </CardBody>
            <hr />
            <CardFooter className="pt-2">

                <Typography color="white" className="font-large font-bold p-1">
                    {course.price}
                </Typography>

                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}