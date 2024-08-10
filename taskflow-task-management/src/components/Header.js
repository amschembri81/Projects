import React from 'react';
import styled from 'styled-components';

// Styled-component for header container.
const HeaderContainer = styled.div`
  width: 100%; // Full width of the screen.
  padding: 20px 0; // Vertical padding of 20px.
  text-align: center; // Center the text horizontally.
  background-color: #e8f0fe; // Light blue background color.
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Slight shadow to give the header a lifted look.
  margin-bottom: 20px; // Add some space below the header.
`;

// Styled-component for header title.
const HeaderTitle = styled.h1`
  font-size: 36px; // Large font size for the title.
  color: darkblue; // Dark blue color for the title text.
  font-family: 'Playfair Display', serif; // Serif font family for an elegant look.
  margin: 0; // Remove default margin.
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* Display title of the application */}
      <HeaderTitle>TaskFlow</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;