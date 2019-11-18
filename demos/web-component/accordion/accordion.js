class Accordion extends HTMLElement {
    constructor() {
        super();

        const styles = `
            :host { margin: 0; padding: 0; border: 2px solid #D1D1D1; border-radius: 7px; display: block; width: 30em;}
        `;

        const style = document.createElement('style');
        style.textContent = styles;
        const slot = document.createElement('slot');

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.appendChild(style);
        shadowRoot.appendChild(slot);
    }
}

class AccordionSection extends HTMLElement {
    constructor() {
        super();

        const styles = `
        button { border-style: solid none none none; }
        .trigger, .panel { border-top: 1px solid #D1D1D1; }
        .trigger { background: #E1EDFE; display: block; font-size: 1rem; font-weight: normal; margin: 0; padding: 1em 1.5em; position: relative; text-align: left; width: 100%; outline: none; }
        .trigger:focus, .button:hover { background: #a9c8f5; }
        .trigger:focus .title { border-color: #79ADFB; }
        .title { color: #9c27b0; display: block; pointer-events: none; border: transparent 2px solid; border-radius: 5px; padding: 0.25em 2em 0.25em 0.25em; outline: none;}
        .icon {border: solid #9E9E9E; border-width: 0 2px 2px 0; height: 0.5rem; pointer-events: none; position: absolute; right: 2em; top: 50%; transform: translateY(-60%) rotate(45deg); width: 0.5rem;}
        .trigger:focus .icon, .button:hover .icon { border-color: #79ADFB; }
        .trigger[aria-expanded="true"] .icon { transform: translateY(-50%) rotate(-135deg); }
        .panel { margin: 0; padding: .5em 2em; line-height: 1;}
        
        /* same selector name as the containing page */
        .panel-content { color: red; border: 1px solid red; width: 9em; padding: .5em; background-color: lightblue;   }
        
        /* using var for overriding*/
        :host(.section) .panel-content { color: var(--accordion-section-content-color); background-color: var(--accordion-section-content-bg-color); };
        `;

        const template = `
            <button class='trigger' aria-expanded="true">
                <span class="title">
                  <slot name="section-title">section title missing</slot>
                  <span class="icon"></span>
                </span>
            </button>
            <div id="sect" class="panel">
                <div class="panel-content"> Accordion Content</div>
                <br />
                <slot name="section-panel">section panel missing</slot>
                <slot name="section-description">section description is missing</slot>
            </div>`;

        const style = document.createElement('style');
        style.textContent = styles;

        const div = document.createElement('div');
        div.innerHTML = template;

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.appendChild(style);
        shadowRoot.appendChild(div);

        this._trigger = this.shadowRoot.querySelector('.trigger');
        this._panel = this.shadowRoot.querySelector('.panel');

    }

    connectedCallback() {
        this._trigger.addEventListener('click', (event) => {
            var target = event.target;

            var isExpanded = target.getAttribute('aria-expanded') == 'true';
            if (!isExpanded) {
                target.setAttribute('aria-expanded', 'true');
                this._panel.removeAttribute('hidden');
            }
            else {
                target.setAttribute('aria-expanded', 'false');
                this._panel.setAttribute('hidden', '');
            }
        });
    }

}

// Define the new element
customElements.define('accordion-wc', Accordion);
customElements.define('accordion-section', AccordionSection);
