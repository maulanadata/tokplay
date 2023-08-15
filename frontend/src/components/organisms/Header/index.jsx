import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const Header = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		onSearch(searchQuery);
		navigate(`/search?q=${searchQuery}`);
	};

	return (
		<div className="p-4 flex items-center">
			<form onSubmit={handleSearchSubmit} className="mx-[280px] flex">
				<Input
					type="text"
					placeholder="Cari video..."
					value={searchQuery}
					onChange={handleSearchChange}
				/>
				<Button type="submit">Cari</Button>
			</form>
		</div>
	);
};

export default Header;
