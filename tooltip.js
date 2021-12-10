const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="/tooltip.css">

<div class="tooltip-container">
<svg class="alert" viewBox="-2 -1.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin"><path d='M10 20.393c-5.523 0-10-4.477-10-10 0-5.522 4.477-10 10-10s10 4.478 10 10c0 5.523-4.477 10-10 10zm0-15a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' /></svg>
<?xml version="1.0" encoding="iso-8859-1"?>
<svg class="close" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
<g id="XMLID_28_">
	<path id="XMLID_29_" d="M165,0C120.926,0,79.492,17.163,48.328,48.327c-64.334,64.333-64.334,169.011-0.002,233.345
		C79.49,312.837,120.926,330,165,330c44.072,0,85.508-17.163,116.672-48.328c64.334-64.334,64.334-169.012,0-233.345
		C250.508,17.163,209.072,0,165,0z M239.246,239.245c-2.93,2.929-6.768,4.394-10.607,4.394c-3.838,0-7.678-1.465-10.605-4.394
		L165,186.213l-53.033,53.033c-2.93,2.929-6.768,4.394-10.607,4.394c-3.838,0-7.678-1.465-10.605-4.394
		c-5.859-5.857-5.859-15.355,0-21.213L143.787,165l-53.033-53.033c-5.859-5.857-5.859-15.355,0-21.213
		c5.857-5.857,15.355-5.857,21.213,0L165,143.787l53.031-53.033c5.857-5.857,15.355-5.857,21.213,0
		c5.859,5.857,5.859,15.355,0,21.213L186.213,165l53.033,53.032C245.104,223.89,245.104,233.388,239.246,239.245z"/>
</g></svg>
<div class="info-container">
    <slot name="message" />
</div>
</div>
`;

class Tooltip extends HTMLElement {
    alertIcon = null;
    closeIcon = null;
    tooltipContainer = null;
    infoContainer = null;
    expandState = false;

    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    infoContainerShow(){
            this.tooltipContainer.classList.add('active');
            this.expandState = true;
    }

    infoContainerHide(){
        this.tooltipContainer.classList.remove('active');
        this.expandState = false;
    }

    toggleInfoContainer(){
         this.expandState ? this.infoContainerHide() : this.infoContainerShow()
    }

    addInfoContainerStyles(optionsObj){
        this.infoContainer = this.shadowRoot.querySelector('.info-container');
        for(let option in optionsObj){
            let property = option;
            let value = optionsObj[option];

            value ? (this.infoContainer.style[property] = value) : null;
        }
    }

    static get observedAttributes() { return ['info-background']; }

    attributeChangedCallback(name, oldValue, newValue) {
        let infoContainerStyleOptions = {
            backgroundColor:this.getAttribute('info-background'),
            color:this.getAttribute('info-color'),
        }
        this.addInfoContainerStyles(infoContainerStyleOptions)
    }

    connectedCallback(){
      this.alertIcon = this.shadowRoot.querySelector('.alert');
      this.closeIcon = this.shadowRoot.querySelector('.close');
      this.infoContainer = this.shadowRoot.querySelector('.info-container');
      this.tooltipContainer = this.shadowRoot.querySelector('.tooltip-container');

      this.alertIcon.addEventListener('click' , () => this.toggleInfoContainer());
      this.closeIcon.addEventListener('click' , () => this.toggleInfoContainer());
    }
}

window.customElements.define('cool-tooltip',Tooltip);