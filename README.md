# @mdnzyzy/react-mixpanel-component 

[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://github.com/jestir1234/react-mixpanel-component)
[![npm (scoped)](https://img.shields.io/npm/v/@mdnzyzy/react-mixpanel-component.svg)](https://github.com/jestir1234/react-mixpanel-component)

# Install

`npm install @mdnzyzy/react-mixedpanel-component`

# Usage

Import `MixPanelProvider` and wrap your root component with it.

```jsx
import MixPanelProvider from '@mdnzyzy/react-mixpanel-component';

class App extends React.Component {
    render(){
        return(
            <MixPanelProvider>
                <div>
                    My Wrapped App with MixPanel!
                </div>
            </MixPanelProvider>
        )
    }
}

```

Import the MixPanel component and give it a `render` prop with where you want to trigger `mixpanel.track()`. Provide it with an `event` prop that is an object with a `name` property and optional `customProperties` property.

```javascript
import { MixPanel } from '@mdnzyzy/react-mixpanel-component';

const clickHandler = () => console.log("I am being clicked!");

const myButton = () => (
    /* setEvent takes a function callback that is triggered along with a supplied mixpanel event once the script has loaded */
   <MixPanel event={{name: "Click My Button", customProperties: {
       foo: 'bar',
       bar: 'foo'
   }}} render={(setEvent) => (
       <Button onClick={() => setEvent(clickHandler)}>
            Click me
       </Button>
   )}/>
)
```

Additionally, for pageload events you can provide a `callbacks` prop which takes an array of objects or functions. For objects, it will call `mixpanel.track()` using the supplied `event` object, while functions will simply be called.

```javascript
    import { MixPanel } from '@mdnzyzy/react-mixpanel-component';

    const HomePageLoadEvent = {
        event: {
            name: 'Homepage loaded',
            customProperties: {
                foo: 'bar',
                bar: 'foo'
            }
        }
    };

    const announcePageLoad = () => console.log("The Page has loaded!");
    const announceButtonClick = () => console.log("Click me was clicked!");

    const HomePage = () => {
        return (
            <MixPanel callbacks={[announcePageLoad, HomePageLoadEvent]} event={{name: 'Click me was clicked'}} render={(setEvent) => (
                <div>
                    <h1>This is the Homepage</h1>
                    <Button onClick={() => setEvent(announceButtonClick)}>
                         Click Me!
                    </Button>
                </div>
            )}/>

        )
    }
```


# @TODO
Add ability to track multiple scripts and when they have loaded.