"use client";

import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from 'next/navigation';

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      router.push(`/search/${searchValue}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      e.target.value = "";
      setSearchValue(e.target.value);
    }
  };

  return (
    <Box borderRadius={"md"} pos="relative">
      <InputGroup className="input-group">
      <InputLeftElement>
        <BsSearch color="gray.300" />
      </InputLeftElement>
        <Input
          type="text"
          outline="none"
          placeholder="Qué prenda buscás?"
          backgroundColor={"#ffffff"}
          _focus={{
            boxShadow: "none",
            border: "1px solid #f89f17",
            outline: "none",
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </InputGroup>
    </Box>
  );
}

export default SearchBar;