"use client";
import { orderFormSchema, orderFormSchemaType } from "@/schema/formSchema";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { useForm, useWatch } from "react-hook-form";
import Typography from "@/components/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";
import { PlacesInput } from "@/components/placesInput";
import { calculateTotalCost } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const pageData = {
  title: "Book your Delivery with Forun",
  description: "switch to a healthier lifestyle with ",
  text: "coming soon.",
};

const hero: CarouselItem = {
  titleBottom: "empowering small businesses with COD",
  imageTop: "/images/logo.png",
  imageTopStyles: "relative sm:top-[30px]",
  imageCenter: "/images/carousel-2-center.png",
  width: 400,
  height: 500,
  image: "/images/carousel-2.png",
};
export default function FormPage() {
  const [loading, setLoading] = useState(false);
  const formHook = useForm<orderFormSchemaType>({
    resolver: zodResolver(orderFormSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formHook;
  const pickupLocation = useWatch({ control, name: "pickup.landmark" });
  const dropoffLocation = useWatch({ control, name: "dropoff.landmark" });
  const [totalCost, setTotalCost] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      (async () => {
        try {
          setLoading(true);
          const totalCost = await calculateTotalCost({
            pickupLocation,
            dropoffLocation,
          });
          formHook.setValue("total_delivery_cost", totalCost?.toString() || "");
          setTotalCost("Rs " + totalCost?.toString());
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [pickupLocation, dropoffLocation]);
  const onSubmit = async (data: orderFormSchemaType) => {
    try {
      setLoading(true);
      const response = await fetch("/api/book-a-delivery", {
        method: "POST",
        body: JSON.stringify({
          pickup: data.pickup,
          dropoff: data.dropoff,
          total_delivery_cost: data.total_delivery_cost,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Delivery booked successfully");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="max-w-full h-full  mx-auto bg-primary ">
        <div className="flex mx-auto max-w-7xl flex-col-reverse gap-[2rem] md:flex-row md:gap-[8rem] h-full p-4 sm:p-6 lg:p-8 ">
          <div className="flex items-center md:w-[50%]">
            <div className="text-white w-full flex flex-col max-sm:items-center sm:gap-2">
              <Image
                src={hero.imageTop}
                alt={hero.titleTop || "heroImage"}
                width={120}
                height={120}
                className={hero.imageTopStyles}
                objectFit="contain"
                priority
              />
              {hero.titleTop && (
                <Typography
                  as={"h1"}
                  className={`text-4xl font-bold my-4 font-handyRegular max-sm:text-center ${hero.titleTopStyle}`}
                >
                  {hero.titleTop}
                </Typography>
              )}
              {hero.imageCenter && (
                <Image
                  src={hero.imageCenter}
                  alt={hero.titleTop || "heroImage"}
                  width={400}
                  height={160}
                  className="max-sm:max-w-[170px] max-w-[300px] my-2"
                  objectFit="contain"
                  priority
                />
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={hero.image}
              alt={hero.titleTop || "heroImage"}
              width={hero.width}
              height={hero.height}
              className="sm:max-h-[300px] max-w-[300px] max-h-[250px] max-sm:w-auto"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-12 max-md:gap-6 max-w-7xl mx-auto  p-4 sm:p-6 lg:p-8 max-md:flex-col max-md:items-center max-md:justify-center">
        <div className="flex flex-col gap-6 justify-center md:w-[40%]">
          <Typography as={"h1"} className="font-handyRegular font-bold">
            {pageData.title}
          </Typography>
          <Typography
            as={"h2"}
            className="text-md  max-md:text-lg font-handyRegular font-bold mb-4 max-md:hidden"
          >
            {pageData.description}
            <Link href={"https://www.forun.store/"} className="text-gray-500">
              forun.store
            </Link>
          </Typography>
          <Typography
            as={"h4"}
            className="text-lg font-handyRegular font-bold mb-4 max-md:hidden"
          >
            {pageData.text}
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 max-sm:w-full "
        >
          <div className="flex gap-10 w-full h-full max-sm:flex-col ">
            <div className="flex flex-col gap-12 w-full ">
              <Typography
                as={"h2"}
                className="font-handyRegular font-bold md:mb-4"
              >
                Pick Up
              </Typography>
              {/** Pickup Fields */}
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="pickupName"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  className={`w-full ${errors.pickup?.name && styles.error}`}
                  placeholder="Enter name"
                  {...register("pickup.name")}
                />
                {errors.pickup?.name && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.pickup.name.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="pickupPhoneNumber"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Input
                  className={`w-full ${errors.pickup?.phone_number && styles.error}`}
                  placeholder="Enter phone number"
                  {...register("pickup.phone_number")}
                />
                {errors.pickup?.phone_number && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.pickup.phone_number.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="pickupLocationPin"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Landmark
                </label>
                <PlacesInput
                  className={`w-full ${errors.pickup?.landmark && styles.error}`}
                  placeholder="Enter landmark"
                  onChange={(e) => {
                    formHook.setValue("pickup.landmark", e);
                  }}
                />

                {errors.pickup?.landmark && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.pickup.landmark.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="pickupSectorArea"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Address
                </label>
                <Input
                  className={`w-full ${errors.pickup?.address && styles.error}`}
                  placeholder="Enter address"
                  {...register("pickup.address")}
                />
                {errors.pickup?.address && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.pickup.address.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-12 w-full">
              <Typography
                as={"h2"}
                className="font-handyRegular font-bold md:mb-4"
              >
                Drop Off
              </Typography>
              {/** Dropoff Fields */}
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="dropoffName"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  className={`w-full ${errors.dropoff?.name && styles.error}`}
                  placeholder="Enter name"
                  {...register("dropoff.name")}
                />
                {errors.dropoff?.name && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.dropoff.name.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="dropoffPhoneNumber"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Input
                  className={`w-full ${errors.dropoff?.phone_number && styles.error}`}
                  placeholder="Enter phone number"
                  {...register("dropoff.phone_number")}
                />
                {errors.dropoff?.phone_number && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.dropoff.phone_number.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="dropoffLocationPin"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Landmark
                </label>
                <PlacesInput
                  className={`w-full ${errors.dropoff?.landmark && styles.error}`}
                  placeholder="Enter landmark"
                  onChange={(e) => {
                    formHook.setValue("dropoff.landmark", e);
                  }}
                />
                {errors.dropoff?.landmark && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.dropoff.landmark.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="dropoffSectorArea"
                  className="text-lg font-handyRegular font-medium text-gray-700"
                >
                  Address
                </label>
                <Input
                  className={`w-full ${errors.dropoff?.address && styles.error}`}
                  placeholder="Enter address"
                  {...register("dropoff.address")}
                />
                {errors.dropoff?.address && (
                  <span className="absolute bottom-[-20px] text-xs text-red-500">
                    {errors.dropoff.address.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="totalDeliveryCost"
                  className="text-2xl font-handyRegular font-medium text-gray-700"
                >
                  Total Delivery Cost
                </label>
                <Typography as={"h4"} className="font-handyRegular font-bold">
                  {totalCost || "-"}
                </Typography>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="ml-auto w-min p-6"
            disabled={loading}
          >
            <Typography as={"h4"} className="font-handyRegular font-bold">
              Book Delivery
            </Typography>
          </Button>
        </form>
      </div>
    </div>
  );
}
