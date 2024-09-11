import { Flex } from "@mantine/core";
import MapMain from "../../components/features/map/MapMain";
import MapSideBar from "../../components/features/map/MapSideBar";
import hotelDetails1 from "../../assets/hotelDetails1.jpg";
import { useState, useRef, useEffect } from "react";
import { useMemo } from "react";
import { useSearchHotelsQuery } from "../../Store/Slices/hotelSlice";
import { useSearchParams } from "react-router-dom";

function Map() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const sidebarRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || null);
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") || null,
  );
  const [guest, setGuest] = useState(searchParams.get("guest") || "");
  const queryArgs = useMemo(
    () => ({
      locationName: location,
      name: "",
      minRating: "",
      minPrice: "",
      maxPrice: "",
    }),
    [],
  );
  const { data = [] } = useSearchHotelsQuery(queryArgs, {});
  const hotels = [
    {
      id: 1,
      name: "Hotel Norrebro",
      distance: "0.4 km from city centre",
      cancellationPolicy: "Free cancellation",
      rating: "Excellent",
      reviews: "1000 reviews",
      score: 9.6,
      description:
        "A modern hotel with a vibrant atmosphere, offering comfortable accommodations and excellent service.",
      amenities: ["Free Wi-Fi", "Complimentary breakfast", "Fitness center"],
      price: "£180 per night",
      hashtags: ["#HotelDeal", "#Popular"],
      image: hotelDetails1,
      location: {
        lat: 51.5155,
        lng: -0.1418,
      },
    },
    {
      id: 2,
      name: "The Grand Hotel",
      distance: "1.2 km from city centre",
      cancellationPolicy: "Free cancellation",
      rating: "Very Good",
      reviews: "850 reviews",
      score: 8.9,
      description:
        "Luxury stay in the heart of the city, with stunning views and world-class amenities.",
      amenities: ["Free Wi-Fi", "Spa", "Swimming pool", "Restaurant"],
      price: "£250 per night",
      hashtags: ["#Luxury", "#CityCenter"],
      image: hotelDetails1,
      location: {
        lat: 51.5074,
        lng: -0.1278,
      },
    },
    {
      id: 3,
      name: "Cozy Cabin Retreat",
      distance: "15 km from city centre",
      cancellationPolicy: "No cancellation",
      rating: "Excellent",
      reviews: "600 reviews",
      score: 9.2,
      description:
        "A secluded cabin in the woods, perfect for a peaceful getaway and reconnecting with nature.",
      amenities: ["Free Wi-Fi", "Fireplace", "Pet-friendly"],
      price: "£120 per night",
      hashtags: ["#Cabin", "#NatureEscape"],
      image: hotelDetails1,
      location: {
        lat: 51.6573,
        lng: -0.0837,
      },
    },
    {
      id: 4,
      name: "City View Suites",
      distance: "0.8 km from city centre",
      cancellationPolicy: "24-hour cancellation policy",
      rating: "Good",
      reviews: "400 reviews",
      score: 7.8,
      description:
        "Modern suites with panoramic city views, ideal for business travelers and city explorers.",
      amenities: ["Free Wi-Fi", "Business center", "City views"],
      price: "£160 per night",
      hashtags: ["#CityViews", "#Business"],
      image: hotelDetails1,
      location: {
        lat: 51.5079,
        lng: -0.0877,
      },
    },
    {
      id: 5,
      name: "Seaside Resort",
      distance: "5 km from city centre",
      cancellationPolicy: "Refundable up to 48 hours",
      rating: "Very Good",
      reviews: "750 reviews",
      score: 8.7,
      description:
        "A beachfront resort offering a relaxing escape with stunning sea views and a variety of water sports.",
      amenities: ["Free Wi-Fi", "Beach access", "Water sports"],
      price: "£220 per night",
      hashtags: ["#Beachfront", "#Relaxation"],
      image: hotelDetails1,
      location: {
        lat: 50.8198,
        lng: -0.1365,
      },
    },
    // Add additional hotel entries below:
    {
      id: 6,
      name: "Mountain Lodge",
      distance: "20 km from city centre",
      cancellationPolicy: "Free cancellation",
      rating: "Excellent",
      reviews: "400 reviews",
      score: 9.4,
      description:
        "A lodge offering breathtaking mountain views, perfect for adventure seekers and nature lovers.",
      amenities: ["Free Wi-Fi", "Hiking trails", "Mountain views"],
      price: "£150 per night",
      hashtags: ["#MountainLodge", "#Adventure"],
      image: hotelDetails1,
      location: {
        lat: 51.595,
        lng: -0.0994,
      },
    },
    {
      id: 7,
      name: "Urban Chic Hotel",
      distance: "0.6 km from city centre",
      cancellationPolicy: "Non-refundable",
      rating: "Very Good",
      reviews: "950 reviews",
      score: 8.8,
      description:
        "A stylish hotel with modern amenities, located in the heart of the city.",
      amenities: ["Free Wi-Fi", "Rooftop bar", "Stylish interiors"],
      price: "£200 per night",
      hashtags: ["#UrbanChic", "#Modern"],
      image: hotelDetails1,
      location: {
        lat: 51.508,
        lng: -0.13,
      },
    },
    {
      id: 8,
      name: "Country Inn",
      distance: "30 km from city centre",
      cancellationPolicy: "Refundable up to 24 hours",
      rating: "Good",
      reviews: "300 reviews",
      score: 7.5,
      description:
        "A charming inn offering a cozy and rustic stay in the countryside.",
      amenities: ["Free Wi-Fi", "Country breakfast", "Pet-friendly"],
      price: "£100 per night",
      hashtags: ["#CountryInn", "#Rustic"],
      image: hotelDetails1,
      location: {
        lat: 51.641,
        lng: -0.081,
      },
    },
    {
      id: 9,
      name: "Royal Palace Hotel",
      distance: "0.3 km from city centre",
      cancellationPolicy: "Free cancellation",
      rating: "Excellent",
      reviews: "1200 reviews",
      score: 9.7,
      description:
        "A luxurious hotel with opulent rooms and top-notch services, located near major attractions.",
      amenities: ["Free Wi-Fi", "Luxury spa", "Fine dining"],
      price: "£300 per night",
      hashtags: ["#RoyalPalace", "#Luxury"],
      image: hotelDetails1,
      location: {
        lat: 51.51,
        lng: -0.13,
      },
    },
    {
      id: 10,
      name: "Budget Stay Inn",
      distance: "2 km from city centre",
      cancellationPolicy: "Non-refundable",
      rating: "Fair",
      reviews: "250 reviews",
      score: 6.9,
      description:
        "An affordable hotel offering basic amenities for travelers on a budget.",
      amenities: ["Free Wi-Fi", "Basic breakfast"],
      price: "£70 per night",
      hashtags: ["#BudgetStay", "#Affordable"],
      image: hotelDetails1,
      location: {
        lat: 51.5105,
        lng: -0.135,
      },
    },
    {
      id: 11,
      name: "Elegant Suites",
      distance: "0.5 km from city centre",
      cancellationPolicy: "Free cancellation",
      rating: "Very Good",
      reviews: "800 reviews",
      score: 8.6,
      description:
        "Sophisticated suites with elegant decor, perfect for a luxurious stay in the city.",
      amenities: ["Free Wi-Fi", "Elegant decor", "In-room dining"],
      price: "£220 per night",
      hashtags: ["#ElegantSuites", "#Luxury"],
      image: hotelDetails1,
      location: {
        lat: 51.5108,
        lng: -0.14,
      },
    },
    {
      id: 12,
      name: "Historic Hotel",
      distance: "1 km from city centre",
      cancellationPolicy: "Refundable up to 48 hours",
      rating: "Good",
      reviews: "500 reviews",
      score: 7.9,
      description:
        "A historic hotel with vintage charm and modern amenities, situated close to historical sites.",
      amenities: ["Free Wi-Fi", "Historical charm", "Restaurant"],
      price: "£140 per night",
      hashtags: ["#HistoricHotel", "#Vintage"],
      image: hotelDetails1,
      location: {
        lat: 51.515,
        lng: -0.13,
      },
    },
    {
      id: 13,
      name: "Beachfront Villa",
      distance: "10 km from city centre",
      cancellationPolicy: "Free cancellation",
      rating: "Excellent",
      reviews: "700 reviews",
      score: 9.3,
      description:
        "A luxurious villa with beachfront access and exclusive amenities for a perfect seaside getaway.",
      amenities: ["Free Wi-Fi", "Private beach", "Luxury amenities"],
      price: "£350 per night",
      hashtags: ["#BeachfrontVilla", "#Luxury"],
      image: hotelDetails1,
      location: {
        lat: 50.815,
        lng: -0.135,
      },
    },
    {
      id: 14,
      name: "Eco-Friendly Lodge",
      distance: "25 km from city centre",
      cancellationPolicy: "Refundable up to 24 hours",
      rating: "Very Good",
      reviews: "450 reviews",
      score: 8.4,
      description:
        "An eco-friendly lodge with sustainable practices and a focus on nature conservation.",
      amenities: ["Free Wi-Fi", "Eco-friendly practices", "Nature trails"],
      price: "£130 per night",
      hashtags: ["#EcoFriendly", "#Sustainable"],
      image: hotelDetails1,
      location: {
        lat: 51.6,
        lng: -0.085,
      },
    },
    {
      id: 15,
      name: "Luxury Urban Retreat",
      distance: "0.7 km from city centre",
      cancellationPolicy: "Non-refundable",
      rating: "Excellent",
      reviews: "900 reviews",
      score: 9.5,
      description:
        "A luxurious urban retreat with top-notch amenities and exceptional service.",
      amenities: ["Free Wi-Fi", "Luxury spa", "Rooftop terrace"],
      price: "£280 per night",
      hashtags: ["#UrbanRetreat", "#Luxury"],
      image: hotelDetails1,
      location: {
        lat: 51.515,
        lng: -0.14,
      },
    },
  ];

  useEffect(() => {
    if (selectedHotel && sidebarRef.current) {
      sidebarRef.current.scrollToHotel(selectedHotel);
    }
  }, [selectedHotel]);

  const handleHotelClick = (hotel) => {
    console.log("Hotel clicked:", hotel);
    setSelectedHotel(hotel);
  };

  const handleMarkerClick = (hotel) => {
    console.log("Hotel Marker clicked:", hotel);
    setSelectedHotel(hotel);
  };
  console.log("selected ID:", selectedHotel);

  return (
    <Flex
      direction={{ base: "column-reverse", md: "row" }}
      w={"100%"}
      h={"100vh"}
      gap={20}
      style={{
        overflow: "hidden",
      }}
      mb={{ base: 10, md: 80 }}>
      <MapSideBar
        hotels={data}
        onHotelClick={handleHotelClick}
        ref={sidebarRef}
      />
      <MapMain
        hotels={data}
        centerCoords={selectedHotel?.location}
        onMarkerClick={handleMarkerClick}
        selectedHotel={selectedHotel}
      />
    </Flex>
  );
}

export default Map;
