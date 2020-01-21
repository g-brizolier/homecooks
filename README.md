# Homecooks WebApp

## Installation
````
git clone https://github.com/chaoticdenim/Homecooks
cd Homecooks
npm install
npm start
````

## Quick explanation
- Reusable components have been created in `src/components`
- The "main" file exectued with **npm start** is `src/index.js`

In react, everything is a component, even pages. To add a new page, simply create a new component following these steps. For this explanation, we'll create a page component called `MyCoolPage`. If you want to create a component that is not a page, follow the exact same steps but please instead create it in `src/components/`

# **VERY IMPORTANT**

When you are working, **NEVER** edit directly on the master branch. Instead, do this:
````
git branch <name of your branch>
git checkout <name of your branch>
````

That way, in case anything goes wrong, you can easily go back to the working version in the master branch using 
````
git fetch
git reset --hard origin/master
````
---

1. Create `src/views/MyCoolPage.js`
2. Add the following to `src/views/MyCoolPage.js`:
    ````JavaScript
    import React from "react";
    import Header from "components/Header/Header.js";
    import Footer from "components/Footer/Footer.js";
    import HeaderLinks from "components/Header/HeaderLinks.js";

    export default function HomePage(props) {
    const { ...rest } = props;
    return (
        <div>
            <Header
                brand="Homecooks"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
            />
            <p>Hello World</p>
            <Footer />
        </div>
    );
    }
    ````
1. Add the following to index.js:
    ````Javascript
    ...

    import MyCoolPage from "views/MyCoolPage.js";

    ...

    ReactDOM.render(
    <Router history={hist}>
        <Switch>
            ...
        <Route path="/MyCoolPage" component={MyCoolPage} />
            ...
        </Switch>
    </Router>,
    document.getElementById("root")
    ````

Now, if you navigate to `localhost:3000/MyCoolPage`, you should be able to see your newly created page. You can now start adding components from `src/components`!

### Additional info
- First and foremost: Google your question
- If google can't answer, shoot me (Guillaume) a message and I'll do my best to answer it 🙂