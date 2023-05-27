import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/shopSearch?query=${searchValue}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box className="search-bar" borderRadius={"md"} pos="relative">
      <InputGroup className="input-group">
        <InputLeftElement children={<BsSearch color="gray.300" />} />
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