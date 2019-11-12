# CSS Scoping Explained

## What’s All This About?
Styling is essential for web applications. Therefore, ensuring that styles are easily managed and applied is critical to the success of a web application. CSS scoping is a method of targeting a set of CSS rules to only a section of the DOM. Currently, CSS is globally scoped, and many techniques have been created to address this issue. This document discusses CSS scoping, its design, and usage. The result will be a feature that solves a major pain point for styling web pages. 

CSS scoping will address the following issues:
   * Style rules scoped to a subtree of DOM guarantee them to apply to that subtree without the need of namespacing selectors. 
CSS scoping works for light DOM and shadow DOM.
   * Global styles can override scoped CSS based on specificity, allowing hosting applications to style components created by third parties.
   * Eliminate the need to generate long selector names in order to prevent selector naming collision.
   * Enable the interoperability of components from different design systems via scoping their styles to themselves.

## Current Techniques: 
**Manually:** CSS rules are localized by adopting a consistent CSS selector naming scheme. Block, Element, and Modifier (BEM) is a common technique used. However, the management of the naming convention can be a challenge as the project grows. Also,  selector names can get very long, and bloat both stylesheet and HTML. 

**CSS preprocessor:** SASS, LESS, and other tools are commonly used to enhance the functionality of CSS. They add a compilation step that can automate the scoping of CSS by defining scoped variables and attaching styles to those variables. While these tools make CSS scoping less manual work, they can create large stylesheets with long selector nesting. When CSS scoping is supported natively, these tools can leverage it to optimize the outputted CSS rules.   

**JS Frameworks:** Frameworks like Vue and Angular have built-in support for CSS scoping. Essentially, they run a CSS preprocessor that generates a unique component hash and append it to the component style rules.  

**Web Components:** Web component has native CSS scoping support. Styles defined within the shadow DOM are scoped only to the component.  It frees developers from following a complex selector naming convention to prevent conflicts. However, styling web components from the host application requires coordination between styles exposed by web components and style rules set by the host application. Often, there is a mismatch that prevents the web component from being styled as the host application desires. 

Excluding Web components, all other methods of CSS scoping are workarounds because CSS is globally scoped. The many techniques created show a real need for scoping styles to a specific component or section of the DOM. Supporting scoped CSS natively will reduce the cognitive overhead required for managing a broad set of CSS styles in the global scope, increase interoperability between components, and boost performance via fewer nodes to traverse during style recalcs.  

##Purposed Design:
Scoped CSS should be performant, easy to use, and works with all existing CSS tools. It should not force a rigid way of usage. Quite the opposite, it should promote sound design principles like separation of content from presentation. 

1. New at-rule: **@scoped [selector]** { // scoped rules }

   Add a new at-rule **@scoped** to the stylesheet. **@scoped** takes an optional selector that matches parts of the DOM. All CSS rules that are surrounded by the curly braces are scoped styles that only apply to part of the DOM that matches the selector. 

   When **@scoped** selector is not present, where rules apply is context-sensitive. When the scoped blocked in the `<head>` element, rules take on the global scope. It is a no-op. However, if used inside a `<style>` tag embedded in HTML, the scoped rules apply to all the children nodes of `<style>` parent node. 

   The following lists specificity of the scoped styles in the order of importance:
      * user-agent styles
      * global styles
      * scoped styles
      * inline styles

2. Add `<slot>` element to light DOM.  
   Scoped styles don't propagate up to the global scope. However, there are use cases where scoped styles need to be limited to a section of the subtree and not propagate down to specific children of the subtree. Examples are tab and accordion components where they take content from the page. To limit the style propagation downward, we need a way in DOM to indicate the boundary. This capability is available in web components through the `<slot>` element. 
   
   The proposal is to bring this element to the light DOM. Component creators can add this element to their HTML that would limit the effects of scoped rules.
   
3.  Enhance `Element.attachShadow(mode)` API to allow scoped rules to apply to shadow DOM.
   Currently, there are a couple of ways to style shadow DOM by the hosting application: `CSS var() and :part()`. These solutions require web components to expose aspects of web components to enable styling. However, this puts a lot of burden on the web components creator to foresee future styling needs. 
   
   The proposal is to open up the shadow DOM for scoped styles when mode == open. When **@scoped** selector in a stylesheet matches the hosting element of a web component, the scoped styles are injected into the shadow root and applies to it's children.  
   
## Sample Usage:
##### Stylesheet
```
my-page.css
    @scoped .my-component-a {}
    @scoped .my-component-b {}

my-page.html
    <div class=’my-component-a’>...</div>
    <div class='my-component-b'>...<div>
```

##### HTML: `<style>` tag
```
my-page.html
	<div class=‘my-component’>
        <style>
            @scoped {}
        </style>
        <div><input /></div>  /** scoped styles applies **/
        <div><button /></div> /** scoped styles applies **/
    </div>
```

##### Template:
```
my-page.html
    <template> 
        <style>
            /** template styles only. **/ 
            @scoped { }
        </style>
        <div>
            <span class=’selector’> </span>
        </div>
    </template> 
```
Scoped style applies the same way when the template contents are inserted either in light DOM or shadow DOM. However, if template is used inside shadow dom, the scoped essentially is an no-op. Since these styles are already scoped. 

##### Web Component, shadow dom:
```
my-page.css
    @scoped my-component {}

my-page.html
    <my-component>
        #shadow-root
            <div>
                <slot>
                </slot>
            </div>
    </my-component>
```
When shadow DOM is added using `Element.attachShadow('open')`, it is styleable by scoped styles when **@scoped** selector matches the hosting element. This frees the web components creator from having to expose all the possible styles on how the component can be styled.

##### Open Questions
This document is a work in progress!
