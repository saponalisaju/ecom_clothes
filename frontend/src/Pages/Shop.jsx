import React from "react";
import Hero from "../Components/Hero/Hero";
import Women from "../Components/Popular/Women";
import Men from "../Components/Popular/Men";
import Kid from "../Components/Popular/Kid";
import { Offers } from "../Components/Offers/Offers";

import NewsLetter from "../Components/NewsLetter/NewsLetter";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import NewCollectionsWomen from "../Components/NewCollections/NewCollectionWomen";
import NewCollectionsMen from "../Components/NewCollections/NewCollectionMen";
import NewCollectionsKid from "../Components/NewCollections/NewCollectionKid";
import TopNavbar from "../Components/NavbarItems/TopNavbar";
import BottomNavbar from "../Components/NavbarItems/BottomNavbar";

const Shop = () => {
  return (
    <>
      <TopNavbar />
      <BottomNavbar />
      <Hero />

      <Women />
      <NewCollectionsWomen />

      <Men />
      <NewCollectionsMen />

      <Kid />
      <NewCollectionsKid />

      <RelatedProducts />

      <Offers />
      <NewsLetter />
    </>
  );
};

export default Shop;
