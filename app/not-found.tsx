"use client";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen ">
      <Image src="images/logo.svg" alt={APP_NAME} width={50} height={50} />
      <div className="w-1/3 rounded-lg shadow-md text-center">
        <p className="font-bold text-3xl my-4">NOT FOUND</p>
        <p className="text-destructive">This page is not valid please return</p>
        <Button className="my-4" onClick={() => (window.location.href = "/")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
