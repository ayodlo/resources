/*Fix Padding / Margin Error On App*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This happens because chrome by default adds some padding to your page
    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
/*Inspiration and Start*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//www.pinterest.com
//www.dribble.com
/*Responsive BG Images*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Original image has dimensions of 2400x1008
//Aspect ratio as a percentage = 42%.
//1008 (height) / 2400 (width = .42 === 42%)
//the percentage value of padding is based on the parent elements width
//because our element has width of 100% of parent the padding top will always be 42% of our elements width
//padding top or bottom will add to the height of our element which is what we want
//this trick utilizes the box models behavior  to create a responsive height for our element using padding
//html
<body>
  <main class="container">
    <div class="bg-image"></div>
  </main>
</body>
//css
.container {
  max-width: 960px;
  margin: 0 auto;
}
.bg-image {
  width: 100%;
  padding-top: 42%;
  background: url('cat-CopyDataProperties.jpg') no-repeat center;
  background-size: contain;
}
/*Design Inspiration*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Find apps and websites for category of the potential application via Dribble and Pinterest
//Organize inspiration in folders base on layout, font and colors
//Start with mobile layouts and then scale to desktop layouts
//Select your layout, colors, and fonts and start to mock up a design via XD
//Use empty image slots and then find images to fill your place holders
/*Stylesheet Organization*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Global Styles
//Typography
//Sections
//Components
/*Reset Everything for an Element*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the all: unset property un-sets all the default properties on whatever element it is placed on
//does not reset it to the default properties, it removes everything and ALSO sets the display property to inline
//unset is either going to set the property to initial or inherit of the property depending on the default so for font-size its inherit so its inheriting from the parent which is the body so tis inheriting the font size as its default 
.button {
    all: unset;
    display: inline-BlockList;
    padding: .5rem 1.25rem;
    background: steelblue;
    color: white;
    box-shadow: 0 12px 12px -6px rgba(black, .5);
    transform: scale(1);
    transition: transform ease-in-out 300ms, box-shadow ease-in-out 250ms;
}
.button:hover {
    transform: scale(1.125);
    box-shadow: 0 12px 18px -10px rgba(black, .5);
}
/*BEM - Block Element Module*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Block - layout - should only act as a container or layout
//Element - element holding content - __ should be created for every nested element
//Modified - modifying original css
//B class=".card"
//E class=".card__image"
//M class="card--light"
<div class='card card--light'></div>;
/*Repnosive Layout 101*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Reset 
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
}
/*Flexbox Design Patterns*/
//Even columns that stay the same no matter the width of the content
.coulmns {
    display: flex;
}
.columns > * {
    flex-basis: 100%;
}
_ _ _
//Event gridh-ish type layout where the bottom will grow to the size of the top columns if it has to wrap
.grid-ish {
    display: flex;
    flex-wrap: wrap;
}
//Use an exact number not a percentage (try percentage and see the difference)
.gridh-ish > * {
    f;ex: 1 1 10em;
}
_ _ _
_____
//Create a standard main content area with a sidebar, with the added bonus of not requiring media queries!
//The classes can be placed on the children.
.content-sidebar {
    display: flex;
    flex-wrap: wrap
}
.content-sidebar > *:nth-child(1) {
    flex: 1 1 10%;
    min-width: 25ch;
}
.content-siedbar > *:nth-child(2) {
    flex: 1 1 30%;
    min-width: 15ch;
}
___ _
/*Base 16*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Units*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Font Size: Rem - Relative to the font size of the root element which is the HTML element which defaults to 16px
//Using PX will over ride things
//Width: Percentage W/ Max-Width | Viewport Width might be okay to use but they can cause issues
//Width: CH can be good because its the width of a character - use it as a maxwidth you don't want to go above 75 characters per line (55-65 ideally start with 60ch).
//Height: should not really be setting a height: use min-height instead. Be careful with viewport heights.
//Padding or Margin: em or rem: do you want the padding or margin to be consistent despite the element your setting it on or if you want it to adjust based on that elements font size
//Padding for buttons - em works great
//EM Great for padding since it depends on font size (scales proportionally)
//REM Great for margin if you want your margins to be consistent and the same
//Em Margin and Padding ad Everything except font size - Em will look at the elements font size vs the parent elements font size as the "em size"
//e.g. em for padding on buttons that way if you set font size on the button the padding will grow with that font size
//e.g. the flow of the document - you can give all text elements margin top of 1 rem and it will all be consistent, but if you give it 1em you'll have larger spaces for headings which can look nice
//Media Queries: EM can be consistent across all browsers
//Em vs Rem: all font sizes in em will relate to its parent
////1 Em generally falls to 16px - whatever the font size of the element will apply to any other em measurement for that particular elements (e.g. padding margin) can be an issue with compounding
////Rem looks at the html font size default 16px
/*Custom Properties*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Always Use Class Unless*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Don't use compound selectors unless the style only needs to be applied once
//Don't use utility classes unless the style will need to be applied multiple times
//Don't use ids unless its for form submissions
/*Emotion*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Use the css property
/**@jsx jsx*/
import { jsx } from '@emotion/core';
import * as React from 'react';
function SomeComponent() {
    return (<div css=({
        backgroundColor: 'pink',
        '&hover': {color: 'white',},
    })Okay</div>)}
//Use Styled Components
import styled from '@emotion/styles/macro'
import { wrap } from 'module';
import _, { unset } from 'lodash';
import { BlockList } from 'net';
import { steelblue, white } from 'color-name';
import { REGEX_BACKSLASH } from 'picomatch/lib/constants';
import CopyDataProperties from 'es-abstract/2018/copydataproperties';
import { commentRegex } from 'convert-source-map';
const Box = styled.div(props => {
    return {height: props.varient === 'tall ? 150 : 80'}
})
const Button = styled.Button({
    color: 'turquoise'
})
//Animations
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '110%': { transform: 'rotate(360deg)' },
});
const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = { 'aria=label': 'loading' };
/*Grid*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Impoertant terminology
//Grid Container - The element on which grid is applied (i.e. display: grid)
//Grid Item - Direct descendants of the grid container
//Grid Line - The dividing lines that make up the structure of the grid - they can be vertical or horizontal
//Grid Cell - The space between two adjacent tow and two adjacent column grid lines - a single unit of the grid
//Grid Track - The space between two adjacent grid lines - think of them as the columns or rows of the grid
//Grid Area - The total space surrounded by the four grid lines - may be composed of any number of grid cells
/*Styled Components*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//install with npm install --save styled-components
//styled-components utilises tagged template literals to style your components.

/////////////Creating basic styled components////////////
// Create a Title component that'll render an <h1> tag with some styles
import styled from 'styled-components';
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
// Use Title and Wrapper like any other React component – except they're styled!
render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
);
/////////////Passing props to components////////////
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
////////////Extending Styles////////////
//To make a new component that inherits the styling of another, just wrap it in the styled() constructor.
// The Button from the last section without the interpolations
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);
////////////Changing Tag or Component the Styled Component Renders////////////
//This is common when building a navigation bar for example, where there are a mix of anchor links and buttons but they should be styled identically.
//Use the "as" polymorphic prop to dynamically swap out the element that receives the styles you wrote:
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="#">Link with Button styles</Button>
    <TomatoButton as="a" href="#">Link with Tomato Button styles</TomatoButton>
  </div>
);
////////////Pseudoelements, pseudoselectors, and nesting////////////
//The preprocessor we use, stylis, supports scss-like syntax for automatically nesting styles.
//The ampersand (&) can be used to refer back to the main component.
//Here are some more examples of its potential usage:
const Thing = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: blue;

  &:hover {
    color: red; // <Thing> when hovered
  }

  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`

render(
  <React.Fragment>
    <Thing>Hello world!</Thing>
    <Thing>How ya doing?</Thing>
    <Thing className="something">The sun is shining...</Thing>
    <div>Pretty nice day today.</div>
    <Thing>Don't you think?</Thing>
    <div className="something-else">
      <Thing>Splendid.</Thing>
    </div>
  </React.Fragment>
)
//If you put selectors in without the ampersand, they will refer to children of the component.
const Thing = styled.div`
  color: blue;

  .something {
    border: 1px solid; // an element labeled ".something" inside <Thing>
    display: block;
  }
`

render(
  <Thing>
    <label htmlFor="foo-button" className="something">Mystery button</label>
    <button id="foo-button">What do I do?</button>
  </Thing>
)
//Finally, the ampersand can be used to increase the specificity of rules on the component.
//This can be useful if you are dealing with a mixed styled-components and vanilla CSS environment where there might be conflicting styles:
const Thing = styled.div`
  && {
    color: blue;
  }
`

const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`

render(
  <React.Fragment>
    <GlobalStyle />
    <Thing>
      I'm blue, da ba dee da ba daa
    </Thing>
  </React.Fragment>
)
////////////Passing Props////////////
//If the styled target is a simple element (e.g. styled.div), styled-components passes through any known HTML attribute to the DOM.
//If it is a custom React component (e.g. styled(MyComponent)), styled-components passes through all props.
//This example shows how all props of the Input component are passed on to the DOM node that is mounted, as with React elements.
//Note how the inputColor prop is not passed to the DOM, but type and defaultValue are.
//That is styled-components being smart enough to filter non-standard attributes automatically for you.
// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
// Render a styled text input with the standard input color, and one with a custom input color
render(
  <div>
    <Input defaultValue="@probablyup" type="text" />
    <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
  </div>
);
////////////Animations////////////
//CSS animations with @keyframes aren't scoped to a single component but you still don't want them to be global to avoid name collisions.
//This is why we export a keyframes helper which will generate a unique instance that you can use throughout your app:
// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
render(
  <Rotate>&lt; 💅🏾 &gt;</Rotate>
);
////////////Define Styled Components outside of the render method////////////
//It is important to define your styled components outside of the render method, otherwise it will be recreated on every single render pass.
//Defining a styled component within the render method will thwart caching and drastically slow down rendering speed, and should be avoided.
//Write your styled components the recommended way:
const StyledWrapper = styled.div`
  /* ... */
`

const Wrapper = ({ message }) => {
  return <StyledWrapper>{message}</StyledWrapper>
}