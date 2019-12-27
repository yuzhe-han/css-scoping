import React from 'react';
import styles from './accordion-demo.module.css';
import Accordion from "./components/accordion";
import AccordionSection from "./components/accordion-section";
import Textbox from "./components/textbox";


function AccordionDemo() {
  return (
      <div id="accordion-demo">
          <h2 className={styles.title}>React w/ CSS Module - Accordion Demo</h2>
          <section className={styles.content}>
              <p>
                  This demo is build with React along with CSS Module. The main purpose is to explorer CSS scoping capabilities of CSS in JS techniques.
                  It uses an Accordion component which uses generic css class selector
                  for, <code>.title</code>, <code>.content</code>. But they don't interfere
                  with same selectors on the page.
              </p>

              <pre>
               Ex: <br/>
                  &nbsp;&nbsp; page style                                     <span style={{color:"#3c4043"}}>.content</span> (color: #3c4043;) <br/>
                  &nbsp;&nbsp; accordion style                                <span style={{color:"red"}}>.content</span> (color: red;) <br/>
                  &nbsp;&nbsp; embedded component &lt;textbox&gt; style             <span style={{color:"darkblue"}}>.content</span> (color: darkblue;)
              </pre>

              Styles in component are encapsulated, they don't leak out onto the page and don't penetrate into the inner
              components.
              <br/> <br/>
              The page is can only style Accordion if it exposes the styles to be stylable.
              It demonstrates the behavior with the following use cases:
              <ol>
                  <li>Accordion styles don't leak out into the page, don't bleed into inner components.</li>
                  <li>Page can style components's content.</li>
                  <li>Page styles its content and insert it into Accordion.</li>
                  <li>Component styles can be combined into single stylesheet.</li>
                  <li>Content and Styles are separate.</li>
              </ol>
              <p>The demo uses the two following CSS properties in the Accordion header to highlight the behavior:</p>
              <ul>
                  <li>background-color</li>
                  <li>color</li>
              </ul>
          </section>

          <h4>Demo:</h4>
          <div>
              <ul>
                  <li>Accordion content is directly added by Accordion component <br/>
                      <div
                          style={{color: 'red',
                                  backgroundColor: 'lightblue',
                                  border: '1px solid red',
                                  width: '9em',
                                  padding: '.5em'}}> Accordion content
                      </div>
                  </li>
                  <li>Page content is added by the page. <br/>
                      <Textbox>Page content</Textbox>
                  </li>
              </ul>
          </div>

          <div className={styles.demoBlock}>
              <div className={styles.demo}>
                  <Accordion>
                      <AccordionSection title="Accordion styles don't leak out into the page, don't bleed into inner components" isExpanded={true}>
                          <Textbox> Page content</Textbox>
                          <div className={styles.description}> Page,  Accordion, and Textbox
                              all use <code>.content</code> class selector. <br/> <br/>Their styles don't interfere. Accordion
                              styles are encapsulated inside the component.
                          </div>
                      </AccordionSection>
                      <AccordionSection className="stylingAccordion" title="Page styles component's content">
                          <div className={styles.description}>Page can create a style with higher
                              specificity and style Accordion content. text color is <span
                                  style={{color:'green'}}>green</span></div>
                      </AccordionSection>
                      <AccordionSection title="Page styles its content inserted into Accordion" includeAccordionContent={false}>
                          <Textbox style={{backgroundColor: 'lightgray'}}>
                              <span style={{color: 'green'}}> Page content </span>
                          </Textbox>
                          <div className={styles.description}>Page content is inserted in Accordion but the
                              page has full control in styling its appearance. <br/> <span
                                  style={{color:'green'}}>color</span> and <span
                                  style={{backgroundColor: 'lightgray'}}>background-color</span> changed.
                          </div>
                      </AccordionSection>
                      <AccordionSection title="Component styles can be combined into single stylesheet" includeAccordionContent={false}>
                          <div className={styles.description}>Yes. Component styles are scoped to component
                              where they were created. <br/> It's achieved through a compile step. <br/><br/>

                              the original HTML and style <br/>
                                HTML:    &lt;section class="content"&gt; <br/>
                                CSS:     .content &#123;...&#125;

                                <br/> <br/>
                              <span style={{color:'#e8bf6a'}}>&lt;section </span><span style={{color:'gray'}}> class</span><span
                                  style={{color:'#a5c261'}}>="accordion-demo_content__1RUQm"</span><span
                                  style={{color:'#e8bf6a'}}>&gt;</span>
                              <br/>
                              <br/>
                              <span
                                  style={{color:'#a5c261'}}>.accordion-demo_content__1RUQm &#123; color:#3c4043; &#125;</span>
                          </div>
                      </AccordionSection>
                      <AccordionSection title="Content and Style are separate" includeAccordionContent={true}>
                          <div className="description">Vue supports separation of content and style
                              by enabling the use of &lt;styles&gt; tag for CSS and &lt;template&gt; tag for HTML.
                          </div>
                      </AccordionSection>
                  </Accordion>
              </div>
          </div>

          <br/><br/><br/>
      </div>
  );
}
export default AccordionDemo;
