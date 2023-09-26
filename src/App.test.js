/**
 * @jest-environment jsdom
 */

/*
Pseudocode :
 
1. Import the screen, render, fireEvent from testing library/react
2. Import the required components (App.jsx)

Test Case 1: displays the details of a featured puppy when clicked
      1. By using render component from testing library render the entire <App/> component.
      2. To get the targeted puppy name use getByText( "Sir Waggington") query.
      3. To simulate a click event use fireEvent.click(puppyName) by passing the parameter puppyName.
      4. Next step is to check the assertion, Once click event happened it should show up featured puppy details on the div.
          i) use getByRole("heading",{name:/Sir Waggington/i}) query
          ii)Finally check the assertion that featuredPuppyName displayed in the document or not.
          iii) In the same way check the assertion for featuredPuppyAge and featuredPuppyEmail in the document or not.

Test Case 2: does not display the details of a featured puppy initially
      1.Render the App component.
      2.In this case the click event is not going to happen. 
      So we need to check the empty div is displaying in the Dom or not.
      3.By using getByTestId("puppy") query get the div element and check the div is empty or not
      by toBeEmptyDOmElement().
      
Test Case 3: does not change the featured puppy when the same puppy is clicked twice"
     1. This test case follow the same steps in the test case 1 for first time click event.
     2. to make another click event use fireEvent.Click() function and
     check the assertions as same in the step 1.

Test Case 4:displays the details of a featured puppy when clicked
      1.Render the App component.
      2.By using getByText("Miss Furbulous") get the puppy name.
      3.Make a Click event using fireEvent.click(puppyName) function .
      4.By using getByRole Query get the featuredPuppyName and check the featuredpuppyName with puppyName in the document.
      5.By using getByText(Age:) query get the age value from the document and check with featuresPuppyAge variable.
      6.By using getByText(Email:) query get the email value from the document and check with the featuredPuppyEmail variable.

*/




import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("App component", () => {
  test("displays the details of a featured puppy when clicked", () => {
    render(<App />);

    // Find the puppy with name "Sir Waggington"
    const puppyName = screen.getByText("Sir Waggington");

    // Simulate a click on the puppy
    fireEvent.click(puppyName);

    // Assert that the featured puppy's name is displayed
    const featuredPuppyName = screen.getByRole("heading", {
      name: /Sir Waggington/i,
    });
    expect(featuredPuppyName).toBeInTheDocument();

    // Assert that the featured puppy's age is displayed
    const featuredPuppyAge = screen.getByText(/Age: \d+/);
    expect(featuredPuppyAge).toBeInTheDocument();

    // Assert that the featured puppy's email is displayed
    const featuredPuppyEmail = screen.getByText(/Email: \S+/);
    expect(featuredPuppyEmail).toBeInTheDocument();
  });

  test("does not display the details of a featured puppy initially", () => {
    render(<App />);

    const puppyDiv = screen.getByTestId("puppy");
    expect(puppyDiv).toBeEmptyDOMElement();

   
  });

  
  test("does not change the featured puppy when the same puppy is clicked twice", () => {
    // Render the App component
    render(<App />);
    // Find the puppy with name "Sir Waggington"
    const puppyName = screen.getByText("Sir Waggington");
    // Simulate a click on the puppy
    fireEvent.click(puppyName);

    // Assert that the initial featured puppy's name is displayed
    const featuredPuppyName = screen.getByRole("heading", {
      name: /Sir Waggington/i,
    });
    expect(featuredPuppyName).toBeInTheDocument();
    // Simulate another click on the same puppy
    fireEvent.click(puppyName);
    // Assert that the featured puppy's name is still displayed and is the same as the initial featured puppy
    expect(featuredPuppyName).toBeInTheDocument();
  });

  
  test("displays the details of a featured puppy when clicked", () => {
    // Render the App component
    render(<App />);
    // Find the puppy with name "Miss Furbulous"
    const puppyName = screen.getByText("Miss Furbulous");
    // Simulate a click on the puppy
    fireEvent.click(puppyName);
    // Assert that the featured puppy's name is displayed
    const featuredPuppyName = screen.getByRole("heading", {
      name: /Miss Furbulous/i,
    });
    expect(featuredPuppyName).toBeInTheDocument();
    // Assert that the featured puppy's age is displayed
    const featuredPuppyAge = screen.getByText(/Age/);
    expect(featuredPuppyAge).toBeInTheDocument();
    // Assert that the featured puppy's email is displayed
    const featuredPuppyEmail = screen.getByText(/Email/);
    expect(featuredPuppyEmail).toBeInTheDocument();
  });
});
