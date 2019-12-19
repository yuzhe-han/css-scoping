<style>
  /*Page Styles*/
  html {color: #3c4043; background-color: #eeeeee; font-size: 18px; font-family: Arial; line-height: 1.6;}
  body { margin: 0 auto; width: 1000px; }
  h2, h4 { border-bottom: 1px solid #AAAAAA; }
  code { color: blue; }
  .title { color: darkblue;}
  .demo { margin-left: 50px; }
  .description { padding: 1em 0;}
  .feature-table { border: 2px solid #D1D1D1; border-radius: 7px; border-collapse: collapse;}
  .feature-table td, .feature-table th { border: 1px solid #D1D1D1; padding: 5px; }

  /* style properties used in the demo  */
  .content {color: #3c4043;}

  .styling-accordion .panel .content {
    color:green;
  }
</style>

<template>

  <div id="accordion-demo">
    <h2 class="title">Vue Accordion Demo</h2>
    <section class="content">
      <p>
        This demo is build with Vue framework. It uses an Accordion component to showcase Vue's CSS scoping and it's usage of <code> &lt;slot&gt; </code> tag.
        The Accordion component uses generic css class selector names, <code>.title</code>, <code>.content</code>. But they don't interfere
        with same selectors on the page.
      </p>

      <pre>
        Ex:
           page style                           <span style="color:#3c4043">.content</span> { color: #3c4043;}
           accordion style                      <span style="color:red">.content</span> { color: red;}
           embedded component &lt;textbox&gt; style   <span style="color:darkblue">.content</span> { color: darkblue;}
        </pre>

        Styles in component are encapsulated, they don't leak out onto the page and don't penetrate into the inner components.
        <br /> <br />
        The page is can only style Accordion if it exposes the styles to be stylable.
        It demonstrates the behavior with the following use cases:
        <ol>
          <li>Accordion styles don't leak out into the page, don't bleed into inner components.</li>
          <li>Page can style components </li>
          <li>Page styles its content that is inserted into Accordion via <code> &lt;slot&gt; </code></li>
          <li>Component styles can be combined into single stylesheet to reduce network download time.</li>
          <li>Content and Styles are separate.</li>
        </ol>
      <p>The demo uses the two following CSS properties in the Accordion header to highlight the behavior:</p>
      <ul>
        <li>background-color</li>
        <li>color</li>
      </ul>
    </section>

    <h4>Demo:</h4>
    <div class="demo-legend">
      <ul>
        <li>Accordion content is directly added by Accordion component <br /> <div style="color: red; background-color: lightblue; border: 1px solid red; width: 9em; padding: .5em;"> Accordion content</div> </li>
        <li>Page content is added by the page. <br />     <textbox> Page content </textbox> </li>
      </ul>
    </div>

    <div class="demo-block">
      <div class="demo">
          <accordion>
            <accordion-section>
              <span slot="title">Accordion styles don't leak out into the page, <br/> don't bleed into inner components</span>
              <textbox slot="content"> Page content</textbox>
              <div class="description" slot="description"> Page, Accordion, Textbox use <code>.content</code> selector. <br/> <br/>Their styles don't interfere. Accordion styles are encapsulated inside the component. </div>
            </accordion-section>
            <accordion-section v-bind:include-slot-content="false" class="styling-accordion">
              <span slot="title">Page styles component's content</span>
              <div class="description" slot="description">Page can create a style with higher specificity and style Accordion content.  text color is <span style="color:green">green</span></div>
            </accordion-section>
            <accordion-section v-bind:include-accordion-content="false">
              <span slot="title">Page styles its content inserted into Accordion </span>
              <textbox style="background-color: lightgray" slot="content"><span style="color: green;"> Page content </span></textbox>
              <div class="description" slot="description">Page content is inserted in Accordion but the page has full control in styling its appearance. <br/> <span style="color:green">color</span> and <span style="background-color: lightgray">background-color</span> changed.</div>
            </accordion-section>
            <accordion-section v-bind:include-accordion-content="false" v-bind:include-slot-content="false">
              <span slot="title">Component styles can be combined into single stylesheet</span>
              <div class="description"  slot="description">Yes. Component styles are scoped to component where they were created. <br/> It's achieved through a compile step. <br/><br/>
                <span style="color:#e8bf6a;">&lt;div </span><span style="color:gray;">data-v-1b572100  class</span><span style="color:#a5c261;">="content"</span><span style="color:#e8bf6a;">&gt; </span>...<span style="color:#e8bf6a;">&lt;/div&gt; </span>
                <br/>
                <br/>
                <span style="color:gray;">.content[data-v-1b572100] {color: red; background-color: lightblue;}</span>
              </div>
            </accordion-section>
            <accordion-section v-bind:include-accordion-content="false" v-bind:include-slot-content="false">
              <span slot="title">Content and Style are separate</span>
              <div class="description" slot="description">Vue supports separation of content and style by enabling the use of &lt;styles&gt; tag for CSS and &lt;template&gt; tag for HTML. </div>
            </accordion-section>
          </accordion>
      </div>
    </div>

    <br/><br/><br/>

  </div>
</template>

<script>
  import Accordion from "./components/accordion";
  import AccordionSection from "./components/accordion-section";
  import Textbox from "./components/textbox";

  export default {
    name: "Accordion-Demo",
    components: {
      Accordion,
      AccordionSection,
      Textbox
    }
  };
</script>

