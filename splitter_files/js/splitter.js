class Splitter {
  constructor(arg) {
    this.panes = [];
  
    this.isDragging = false;
    this.startX = 0; 
    this.startY = 0;
    this.shiftX = 0;
    this.shiftY = 0;

    this.#getDom(arg).addEventListener('mousedown', this.startDrag);

  }

  #getDom(arg) {
    const element = arg instanceof HTMLElement ? arg : document.getElementById(arg)
    if(element == null) console.log('No element${arg} found method: #getdom()');

    // console.log('Element${arg} found method: #getdom()');
    return element;
  }

  addPane = (arg, kx, ky) => {
    this.panes.push(new ResizePane(this.#getDom(arg), kx, ky));
    console.log('Num of panes: ', this.panes.length);
  }


  
  startDrag = (event) => {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;

    console.log(this.panes.length);
    for (key in this.panes) {
      this.panes[key].saveInitSize();
      }

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  handleDrag(event) {
    if (! this.isDragging) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    this.shiftX = currentX -  this.startX;
    this.shiftY = currentY -  this.startY;

    // console.log('Horizontal shift:', shiftX, 'Vertical shift:', shiftY);
 

    // You can perform further actions here based on the shift
    // For example, update the position of an element
    console.log('panes num ',this.panes.lenght);
    for (key in this.panes) {
      this.panes[key].updateSize( this.shiftX,  this.shiftY);
      
      console.log('key ${key}');
      }



  }

  stopDrag() {
    if (! this.isDragging) return;

    this.isDragging = false;
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.stopDrag);

    // Example: Reset shift values after drag
    this.shiftX = 0;
    this.shiftY = 0;
  }



}








class ResizePane {
  constructor(pane, kx, ky) {
    this.pane = pane;
    this.kx = kx;
    this.ky = ky;
    this.initWidth = 0;
    this.initHeight = 0;
    this.saveInitSize ();
  }

  saveInitSize(){
    this.initWidth = this.pane.offsetWidth;
    this.initHeight = this.pane.offsetHeight;

    console.log('saveInitSize size');
  }
  updateSize(deltaX, deltaY){
    var newWidth  = this.initWidth  + deltaX * this.kx;
    var newHeight = this.initHeight + deltaY * this.ky;

    this.pane.style.width = newWidth + "px";
    this.pane.style.height = newHeight + "px";

    console.log('update size');
  }


}

